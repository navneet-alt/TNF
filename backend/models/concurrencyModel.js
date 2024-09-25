// models/concurrencyModel.js
const mongoose = require('mongoose');

const concurrencySchema = new mongoose.Schema({
  book_id: String,
  book_name: String,
  is_premium: Boolean,
  concurrency: { type: Number, default: 1 },
  bundle_name: String,
});

const Concurrency = mongoose.model('Concurrency', concurrencySchema);
module.exports = Concurrency;
