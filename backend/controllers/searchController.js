const Order = require('../models/orderModel');
const LicenseSchema = require('../models/licenseModel');

// Search for books by bundle name
const searchByBundleName = async (req, res) => {
  const { bundle_name } = req.body;

  try {
    const result = await Order.findOne({ bundle_name: bundle_name }); // Ensure this query is correct
    
    if (result) {
      const books = result.books.map(book => ({
        book_name: book.book_name,
        concurrency: book.is_premium ? 1 : 0,
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

// Create a new license
const createLicense = async (req, res) => {
  const { licenseName, orderNumber, books } = req.body;
  console.log(books);
  try {
    const newLicense = await LicenseSchema.create({
      licenseName,
      orderNumber,
      books // Use the correct field name
    });

    await newLicense.save();
    res.status(201).json({ message: "License created successfully!", license: newLicense });
  } catch (error) {
    console.error("Error creating license:", error);
    res.status(500).json({ message: "Failed to create license." });
  }
};

// Add this function to your existing searchController.js
const getLicenses = async (req, res) => {
  try {
    const licenses = await LicenseSchema.find(); // Fetch all licenses
    res.status(200).json(licenses);
  } catch (error) {
    console.error("Error fetching licenses:", error);
    res.status(500).json({ message: "Failed to fetch licenses." });
  }
};

// Suggest bundles based on query
const suggestByBundleName = async (req, res) => {
    const { query } = req.query; // Get the query from the request
    if (!query) {
      return res.status(400).json({ error: 'Query parameter is required' });
    }
    try {
      const bundles = await Order.find({
        bundle_name: { $regex: query, $options: 'i' } // Case-insensitive search
      });
  
      res.status(200).json(bundles); // Send bundles with a 200 status
    } catch (error) {
      console.error("Error fetching bundles:", error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };
  
  module.exports = { searchByBundleName, suggestByBundleName, createLicense, getLicenses};
