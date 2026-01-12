const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    console.log('🔗 Connecting to MongoDB Atlas...');
    
    // Simple connection without error handling
    await mongoose.connect('mongodb+srv://ermohammadkaif_db_user:kaif%40123@elderlycare-cluster.c6bxes6.mongodb.net/portfolio');
    
    console.log('✅ MongoDB Atlas Connected');
    return true;
    
  } catch (error) {
    console.error('❌ MongoDB Connection Error:', error.message);
    
    // Don't throw error, let server continue without DB
    console.log('⚠️  Continuing without database connection');
    return false;
  }
};

module.exports = connectDB;