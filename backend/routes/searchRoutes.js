const express = require('express');
const { searchByBundleName, suggestByBundleName, updateConcurrency } = require('../controllers/searchController');

const router = express.Router();

// POST request to search by bundle name
router.post('/search-bundle', searchByBundleName);
router.get('/suggest-bundles', suggestByBundleName);
router.post('/update-concurrency', updateConcurrency); // Add this line for updating concurrency

module.exports = router;
