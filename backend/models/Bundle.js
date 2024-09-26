// models/Bundle.js
const mongoose = require('mongoose');

const bundleSchema = new mongoose.Schema({
  bundle_name: { type: String, required: true },
  
});

const Bundle = mongoose.model('Bundle', bundleSchema, 'test');

module.exports = Bundle;
