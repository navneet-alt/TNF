// /routes/searchRoutes.js
const express = require('express');
const { searchByBundleName } = require('../controllers/searchController');
const {suggestByBundleName} = require('../controllers/searchController')

const router = express.Router();

// POST request to search by bundle name
router.post('/search-bundle', searchByBundleName);
router.get('/suggest-bundles', suggestByBundleName);

module.exports = router;
