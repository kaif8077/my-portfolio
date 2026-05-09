const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
require('dotenv').config();

async function createAdmin() {
  try {
    console.log('🔗 Connecting to MongoDB...');
    
    const mongoURI = process.env.MONGODB_URI || 'mongodb+srv://ermohammadkaif_db_user:kaif%40123@elderlycare-cluster.c6bxes6.mongodb.net/portfolio';
    
    await mongoose.connect(mongoURI);
    console.log('✅ MongoDB Connected');
    
    // Check if Admin model already exists
    let Admin;
    if (mongoose.models.Admin) {
      Admin = mongoose.model('Admin');
    } else {
      // Simple schema without middleware
      const adminSchema = new mongoose.Schema({
        email: { 
          type: String, 
          required: true, 
          unique: true,
          lowercase: true,
          trim: true
        },
        password: { type: String, required: true },
        createdAt: { type: Date, default: Date.now }
      });
      
      Admin = mongoose.model('Admin', adminSchema);
    }
    
    // Check if admin exists
    console.log('🔍 Checking for existing admin...');
    const existingAdmin = await Admin.findOne({ email: 'kaif@gmail.com' });
    
    if (existingAdmin) {
      console.log('✅ Admin already exists');
      console.log('📧 Email:', existingAdmin.email);
      console.log('🆔 ID:', existingAdmin._id);
    } else {
      console.log('👤 Creating new admin...');
      
      // Hash password manually
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash('kaif123', salt);
      
      // Create admin with hashed password
      const admin = new Admin({
        email: 'kaif@gmail.com',
        password: hashedPassword
      });
      
      await admin.save();
      console.log('✅ Admin created successfully!');
      console.log('📧 Email: kaif@gmail.com');
      console.log('🔑 Password: kaif123');
      console.log('🆔 ID:', admin._id);
    }
    
    // List all admins
    const allAdmins = await Admin.find({}, 'email createdAt');
    console.log('\n📋 All admins in database:');
    allAdmins.forEach(admin => {
      console.log(`   - ${admin.email} (created: ${admin.createdAt.toLocaleDateString()})`);
    });
    
    await mongoose.disconnect();
    console.log('\n✅ Script completed successfully!');
    
  } catch (error) {
    console.error('❌ Error:', error.message);
    console.error('🔧 Stack:', error.stack);
    process.exit(1);
  }
}

createAdmin();