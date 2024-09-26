// /routes/searchRoutes.js
const express = require('express');
const { searchByBundleName } = require('../controllers/searchController');
const {suggestByBundleName} = require('../controllers/searchController')
const {createLicense} = require('../controllers/searchController')
const {getLicenses} = require('../controllers/searchController');

const router = express.Router();

// POST request to search by bundle name
router.post('/search-bundle',  searchByBundleName);
router.get('/suggest-bundles',  suggestByBundleName);
router.post('/create-license',  createLicense);
router.get('/licenses', getLicenses);

module.exports = router;
