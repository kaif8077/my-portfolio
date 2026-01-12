const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

dotenv.config();

const app = express();

// CORS Configuration for both local and production
const allowedOrigins = [
  'http://localhost:5173', // Local development
  'https://my-portfolio-ten-wheat-68.vercel.app', // Vercel frontend
  'https://my-portfolio-git-main-kaif8077.vercel.app', // Alternative Vercel URL
  'https://*.vercel.app' // All Vercel subdomains
];

app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    
    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      // Check if it's a Vercel preview URL
      if (origin.includes('.vercel.app')) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: [
    'Content-Type', 
    'Authorization', 
    'x-auth-token',  // ✅ ADDED THIS - FOR YOUR CUSTOM HEADER
    'X-Requested-With'
  ],
  exposedHeaders: ['x-auth-token'] // ✅ ADD THIS TOO
}));

// Handle preflight requests
app.options('*', cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Request logging middleware
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.url} - Origin: ${req.headers.origin}`);
  console.log('Headers:', JSON.stringify(req.headers));
  next();
});

// Test endpoint
app.get('/api/test', (req, res) => {
  res.json({ 
    message: 'API is working!',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV,
    frontendUrl: process.env.FRONTEND_URL,
    backendUrl: process.env.BACKEND_URL,
    corsHeaders: {
      allowedHeaders: ['Content-Type', 'Authorization', 'x-auth-token', 'X-Requested-With'],
      allowedOrigins: allowedOrigins
    }
  });
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'healthy',
    environment: process.env.NODE_ENV || 'development',
    serverTime: new Date().toISOString(),
    uptime: process.uptime(),
    memoryUsage: process.memoryUsage(),
    headersReceived: req.headers
  });
});

// Root endpoint
app.get('/', (req, res) => {
  res.json({
    message: 'Portfolio Backend API',
    version: '1.0.0',
    status: 'running',
    endpoints: {
      contact: '/api/contact/submit (POST)',
      contactAll: '/api/contact/all (GET - Admin)',
      health: '/api/health (GET)',
      test: '/api/test (GET)',
      auth: {
        login: '/api/auth/login (POST)',
        create: '/api/auth/create (POST)'
      }
    },
    environment: process.env.NODE_ENV || 'development',
    cors: {
      allowedOrigins: allowedOrigins,
      allowedHeaders: ['Content-Type', 'Authorization', 'x-auth-token', 'X-Requested-With']
    }
  });
});

// Add a CORS test endpoint
app.get('/api/cors-test', (req, res) => {
  res.json({
    success: true,
    message: 'CORS test successful',
    headers: req.headers,
    allowedOrigins: allowedOrigins,
    allowedHeaders: ['Content-Type', 'Authorization', 'x-auth-token', 'X-Requested-With']
  });
});

// Add OPTIONS handler for preflight
app.options('/api/*', (req, res) => {
  res.header('Access-Control-Allow-Origin', req.headers.origin || '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, x-auth-token, X-Requested-With');
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Max-Age', '86400'); // 24 hours
  res.sendStatus(200);
});

const startServer = async () => {
  try {
    console.log('🌍 Environment:', process.env.NODE_ENV || 'development');
    console.log('🔗 Connecting to MongoDB...');
    
    const isConnected = await connectDB();
    
    if (isConnected) {
      console.log('✅ Database connected, loading routes...');
      
      try {
        // Try to load route files
        const contactRoutes = require('./routes/contactRoutes');
        const authRoutes = require('./routes/authRoutes');
        
        app.use('/api/contact', contactRoutes);
        app.use('/api/auth', authRoutes);
        
        console.log('✅ Routes loaded from route files');
      } catch (routeError) {
        console.log('⚠️ Route files not found, loading directly...');
        console.log('Route error:', routeError.message);
        
        // Load controllers directly
        const contactController = require('./controllers/contactController');
        const authController = require('./controllers/authController');
        const authMiddleware = require('./middleware/authMiddleware');
        
        // Public routes
        app.post('/api/contact/submit', contactController.submitContact);
        
        // Protected routes (require token)
        app.get('/api/contact/all', authMiddleware, contactController.getAllContacts);
        app.delete('/api/contact/:id', authMiddleware, contactController.deleteContact);
        
        // Auth routes
        app.post('/api/auth/login', authController.adminLogin);
        app.post('/api/auth/create', authController.createAdmin);
        
        console.log('✅ Controllers loaded directly');
      }
      
    } else {
      console.log('⚠️ Database not connected, using mock routes');
      setupMockRoutes();
    }
    
    const PORT = process.env.PORT || 5000;
    
    app.listen(PORT, '0.0.0.0', () => {
      console.log('\n' + '='.repeat(50));
      console.log(`🚀 Server running on port ${PORT}`);
      console.log(`🌍 Environment: ${process.env.NODE_ENV || 'development'}`);
      console.log(`📧 SendGrid Email: ${process.env.SENDGRID_API_KEY ? '✅ Configured' : '❌ Not configured'}`);
      console.log(`🔐 JWT Secret: ${process.env.JWT_SECRET ? '✅ Configured' : '❌ Not configured'}`);
      console.log('\n🌐 CORS Configuration:');
      console.log(`   Allowed Origins: ${allowedOrigins.join(', ')}`);
      console.log(`   Allowed Headers: Content-Type, Authorization, x-auth-token, X-Requested-With`);
      console.log('\n🔗 URLs:');
      console.log(`   Backend URL: ${process.env.BACKEND_URL || `http://localhost:${PORT}`}`);
      console.log(`   Frontend URL: ${process.env.FRONTEND_URL || 'http://localhost:5173'}`);
      console.log(`   API Base: ${process.env.BACKEND_URL || `http://localhost:${PORT}`}/api`);
      console.log('\n📊 Test Endpoints:');
      console.log(`   Health: ${process.env.BACKEND_URL || `http://localhost:${PORT}`}/api/health`);
      console.log(`   CORS Test: ${process.env.BACKEND_URL || `http://localhost:${PORT}`}/api/cors-test`);
      console.log(`   Contact Form: ${process.env.BACKEND_URL || `http://localhost:${PORT}`}/api/contact/submit`);
      console.log('='.repeat(50) + '\n');
    });
    
  } catch (error) {
    console.error('❌ Server startup error:', error.message);
    console.error('Stack:', error.stack);
    
    setupMockRoutes();
    
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, '0.0.0.0', () => {
      console.log(`⚠️ Server running in MOCK MODE on port ${PORT}`);
    });
  }
};

function setupMockRoutes() {
  console.log('⚠️ Using mock routes (database not available)');
  
  app.post('/api/contact/submit', (req, res) => {
    console.log('📨 Contact Form (Mock):', req.body);
    res.json({
      success: true,
      message: 'Message received (mock mode - database not connected)',
      data: {
        id: 'mock_id_' + Date.now(),
        source: req.body.source || 'home',
        createdAt: new Date().toISOString()
      }
    });
  });
  
  app.get('/api/contact/all', (req, res) => {
    console.log('Get contacts (Mock) - Headers:', req.headers);
    
    // Check for token in mock mode
    const token = req.headers['x-auth-token'];
    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'No token, authorization denied (mock mode)'
      });
    }
    
    res.json({
      success: true,
      data: [],
      message: 'Mock mode - database not connected'
    });
  });
  
  app.delete('/api/contact/:id', (req, res) => {
    res.json({
      success: true,
      message: 'Contact deleted (mock mode)'
    });
  });
  
  app.post('/api/auth/login', (req, res) => {
    const { email, password } = req.body;
    console.log('Login attempt (Mock):', { email });
    
    if (email === 'admin@portfolio.com' && password === 'Admin@123') {
      res.json({
        success: true,
        token: 'mock_jwt_token_' + Date.now(),
        admin: {
          id: 'mock_admin_id',
          email: 'admin@portfolio.com'
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

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('❌ Server error:', err.message);
  
  if (err.message === 'Not allowed by CORS') {
    return res.status(403).json({
      success: false,
      message: 'CORS Error: Origin not allowed',
      allowedOrigins: allowedOrigins,
      yourOrigin: req.headers.origin
    });
  }
  
  res.status(500).json({
    success: false,
    message: 'Internal server error',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    message: 'Endpoint not found',
    path: req.originalUrl,
    method: req.method
  });
});

startServer();

module.exports = app; // For testing