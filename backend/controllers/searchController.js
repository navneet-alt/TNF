const Order = require('../models/orderModel');
const Concurrency = require('../models/concurrencyModel'); // Import the new model
const Bundle = require('../models/Bundle')

// Search for books by bundle name
const searchByBundleName = async (req, res) => {
  const { bundle_name } = req.body;

  try {
    const result = await Order.findOne({ bundle_name });
    
    if (result) {
      const books = result.books.map(book => ({
        book_name: book.book_name,
        concurrency: book.is_premium ? 1 : 'N/A',
        is_premium: book.is_premium,
        bundle_name: bundle_name,
        book_id: book.book_id
      }));

      res.status(200).json(books);
    } else {
      res.status(404).json({ message: 'No books found for the specified bundle' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error searching for bundle', error });
  }
};

// Update concurrency for books in a bundle
// controllers/searchController.js

const updateConcurrency = async (req, res) => {
  const { updatedBooks } = req.body; // Expecting an array of updated books

  try {
    const updatePromises = updatedBooks.map(updatedBook => {
      const { book_id, concurrency, book_name, is_premium, bundle_name } = updatedBook;
      return Concurrency.findOneAndUpdate(
        { book_id }, 
        { book_name, is_premium, concurrency, bundle_name }, 
        { new: true, upsert: true } // upsert will create a new document if it does not exist
      );
    });

    await Promise.all(updatePromises); // Wait for all updates to finish
    res.status(200).json({ message: 'All concurrency values updated successfully' });
  } catch (error) {
    console.error('Error updating concurrency:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};


// Suggest bundles based on query
const suggestByBundleName = async (req, res) => {
  const { query } = req.query; 
  if (!query) {
    return res.status(400).json({ error: 'Query parameter is required' });
  }

  try {
    const bundles = await Bundle.find({
      bundle_name: { $regex: query, $options: 'i' }
    });

    res.status(200).json(bundles);
  } catch (error) {
    console.error("Error fetching bundles:", error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = { searchByBundleName, suggestByBundleName, updateConcurrency };
