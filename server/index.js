const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const items = require('./routes/items');
// const path = require('path');
const dotenv = require('dotenv');
dotenv.config();
let isConnected = false;
const port = process.env.PORT || 8080;

const app = express();

// Bodyparser Middleware
app.use(bodyParser.json());

// CORS Middleware with specific configuration for deployment
const corsOptions = {
    origin: function (origin, callback) {
        // Allow requests with no origin (like mobile apps or curl requests)
        if (!origin) return callback(null, true);
        
        // List of allowed origins (add your frontend domain here)
        const allowedOrigins = [
            'http://localhost:3000',
            'http://localhost:8080',
            'https://shopping-list-c4tv.vercel.app', // Your frontend domain
            // Add other allowed origins as needed
        ];
        
        if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true,
    optionsSuccessStatus: 200
};

app.use(cors(corsOptions));

// Add logging middleware for debugging
app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.path}`);
    console.log('Origin:', req.headers.origin);
    next();
});

// DB Config
const db = require('./config/keys').mongoURI;

// console.log('Attempting to connect to MongoDB with URI:', db);

// Connect to MongoDB
mongoose
    .connect(db, {
        // useNewUrlParser: true,
        // useUnifiedTopology: true,
    })
    .then(() => {
        console.log('MongoDB Connected successfully');

        isConnected = true;

    })
    .catch(err => {
        console.log('MongoDB Connection Error:', err);
    });

// IMPORTANT: API routes must be defined BEFORE static file serving
app.use('/api/items', items);

// Add a health check endpoint
app.get('/health', (req, res) => {
    res.status(200).json({ 
        status: 'OK', 
        timestamp: new Date().toISOString(),
        mongodb: isConnected ? 'Connected' : 'Disconnected'
    });
});

// Error handling middleware for CORS
app.use((err, req, res, next) => {
    if (err.message === 'Not allowed by CORS') {
        res.status(403).json({ error: 'CORS not allowed' });
    } else {
        next(err);
    }
});

// app.listen(port, '0.0.0.0', () => console.log(`Server started on port ${port}`));

module.exports = app;