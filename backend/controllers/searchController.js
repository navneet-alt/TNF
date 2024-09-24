const Order = require('../models/orderModel');
const Bundle = require('../models/Bundle');

// Search for books by bundle name
const searchByBundleName = async (req, res) => {
  const { bundle_name } = req.body;

  try {
    const result = await Order.findOne({ bundle_name: bundle_name }); // Ensure this query is correct
    
    if (result) {
      const books = result.books.map(book => ({
        book_name: book.book_name,
        concurrency: book.is_premium ? 1 : 'N/A',
        is_premium: book.is_premium,
        bundle_name: bundle_name
      }));

      res.status(200).json(books);
    } else {
      res.status(404).json({ message: 'No books found for the specified bundle' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error searching for bundle', error });
  }
};

// Suggest bundles based on query
const suggestByBundleName = async (req, res) => {
    const { query } = req.query; // Get the query from the request
    if (!query) {
      return res.status(400).json({ error: 'Query parameter is required' });
    }
  
    try {
      const bundles = await Bundle.find({
        bundle_name: { $regex: query, $options: 'i' } // Case-insensitive search
      });
  
      res.status(200).json(bundles); // Send bundles with a 200 status
    } catch (error) {
      console.error("Error fetching bundles:", error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };
  
  module.exports = { searchByBundleName, suggestByBundleName };
