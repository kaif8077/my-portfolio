const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

dotenv.config();

const app = express();

app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
  next();
});

app.get('/api/test', (req, res) => {
  res.json({ 
    message: 'API is working!',
    timestamp: new Date().toISOString()
  });
});

app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'healthy',
    serverTime: new Date().toISOString()
  });
});

const startServer = async () => {
  try {
    console.log('Connecting to MongoDB...');
    const isConnected = await connectDB();
    
    if (isConnected) {
      console.log('Database connected, loading routes...');
      
      // Use route files if they exist
      try {
        const contactRoutes = require('./routes/contactRoutes');
        const authRoutes = require('./routes/authRoutes');
        
        app.use('/api/contact', contactRoutes);
        app.use('/api/auth', authRoutes);
        
        console.log('✅ Routes loaded from route files');
      } catch (routeError) {
        console.log('Route files not found, loading directly...');
        
        // Load controllers directly
        const contactController = require('./controllers/contactController');
        const authController = require('./controllers/authController');
        const authMiddleware = require('./middleware/authMiddleware');
        
        app.post('/api/contact/submit', contactController.submitContact);
        app.get('/api/contact/all', authMiddleware, contactController.getAllContacts);
        app.delete('/api/contact/:id', authMiddleware, contactController.deleteContact);
        
        app.post('/api/auth/login', authController.adminLogin);
        app.post('/api/auth/create', authController.createAdmin);
        
        console.log('✅ Controllers loaded directly');
      }
      
    } else {
      console.log('Database not connected, using mock routes');
      setupMockRoutes();
    }
    
    const PORT = process.env.PORT || 5000;
    
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
      console.log(`📧 SendGrid Email: ${process.env.SENDGRID_API_KEY ? '✅ Configured' : '❌ Not configured'}`);
    });
    
  } catch (error) {
    console.error('Server startup error:', error.message);
    
    setupMockRoutes();
    
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      console.log(`⚠️ Server running in MOCK MODE on port ${PORT}`);
    });
  }
};

function setupMockRoutes() {
  app.post('/api/contact/submit', (req, res) => {
    console.log('📨 Contact Form (Mock):', req.body);
    res.json({
      success: true,
      message: 'Message received (mock mode)'
    });
  });
  
  app.get('/api/contact/all', (req, res) => {
    console.log('Get contacts (Mock)');
    res.json({
      success: true,
      data: [],
      message: 'Mock mode - no data'
    });
  });
  
  app.delete('/api/contact/:id', (req, res) => {
    console.log('Delete contact (Mock):', req.params.id);
    res.json({
      success: true,
      message: 'Contact deleted (mock mode)'
    });
  });
  
  app.post('/api/auth/login', (req, res) => {
    const { email, password } = req.body;
    console.log('Login attempt (Mock):', { email });
    
    if (email === 'admin@example.com' && password === 'admin123') {
      res.json({
        success: true,
        token: 'mock_jwt_token_' + Date.now(),
        admin: {
          id: 'mock_admin_id',
          email: 'admin@example.com'
        }
      });
    } else {
      res.status(401).json({
        success: false,
        message: 'Invalid credentials'
      });
    }
  });
  
  app.post('/api/auth/create', (req, res) => {
    console.log('Create admin (Mock):', req.body);
    res.json({
      success: true,
      message: 'Admin created (mock mode)'
    });
  });
}

startServer();