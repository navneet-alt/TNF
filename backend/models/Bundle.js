// models/Bundle.js
const mongoose = require('mongoose');

const bundleSchema = new mongoose.Schema({
  bundle_name: { type: String, required: true },
  books: [{ book_id: String, book_name: String, is_premium: Boolean }],
});

const Bundle = mongoose.model('Bundle', bundleSchema);

module.exports = Bundle;
