
const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect('mongodb+srv://navneetsneh:Navneet%402002@cluster0.uxgkc.mongodb.net/Aggregated_Data');
    console.log('MongoDB connection successful');
  } catch (error) {
    console.error('MongoDB connection failed:', error.message);
    process.exit(1);
  }
};

module.exports = connectDB;
