const express = require('express');
const app = express();
require('dotenv').config();
const db = require('./db'); 
const cors = require('cors');


app.use(cors()); 
app.use(express.json()); 
app.use(express.urlencoded({ extended: true })); 


app.use((req, res, next) => {
    console.log(`[${new Date().toLocaleTimeString()}] ${req.method} ${req.path}`);
    next();
});


const userRoutes = require('./routes/userRoutes');
const sweetsRoutes = require('./routes/sweetsRoutes');


app.use('/api/auth', userRoutes);
app.use('/api/sweets', sweetsRoutes);


app.get('/', (req, res) => {
    res.json({ 
        message: '🍬 Welcome to Sweet Shop API',
        version: '1.0.0',
        endpoints: {
            auth: {
                signup: 'POST /api/auth/signup',
                login: 'POST /api/auth/login',
                profile: 'GET /api/auth/profile'
            },
            sweets: {
                getAll: 'GET /api/sweets',
                search: 'GET /api/sweets/search',
                add: 'POST /api/sweets',
                update: 'PUT /api/sweets/:id',
                delete: 'DELETE /api/sweets/:id',
                purchase: 'POST /api/sweets/:id/purchase',
                restock: 'POST /api/sweets/:id/restock'
            }
        }
    });
});

// Health check endpoint
app.get('/api/health', (req, res) => {
    res.json({ 
        status: 'ok', 
        timestamp: new Date(),
        uptime: process.uptime(),
        environment: process.env.NODE_ENV || 'development'
    });
});


app.use((req, res) => {
    res.status(404).json({ 
        error: 'Route not found',
        path: req.path,
        method: req.method
    });
});


app.use((err, req, res, next) => {
    console.error('❌ Error:', err.message);
    console.error(err.stack);
    
    res.status(err.status || 500).json({ 
        error: err.message || 'Internal Server Error',
        ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
    });
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log('\n' + '='.repeat(50));
    console.log('🚀 Sweet Shop Server Started Successfully!');
    console.log('='.repeat(50));
    console.log(`📍 Server URL: http://localhost:${PORT}`);
    console.log(`🏥 Health Check: http://localhost:${PORT}/api/health`);
    console.log(`📚 API Docs: http://localhost:${PORT}/`);
    console.log('='.repeat(50) + '\n');
});


process.on('SIGTERM', () => {
    console.log('⚠️ SIGTERM received. Shutting down gracefully...');
    process.exit(0);
});

process.on('SIGINT', () => {
    console.log('\n⚠️ SIGINT received. Shutting down gracefully...');
    process.exit(0);
});


process.on('unhandledRejection', (err) => {
    console.error('❌ Unhandled Promise Rejection:', err);
});


process.on('uncaughtException', (err) => {
    console.error('❌ Uncaught Exception:', err);
    process.exit(1);
});