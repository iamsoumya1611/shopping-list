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

app.use(cors(
    {origin: '*',
    }
));

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

app.listen(port, '0.0.0.0', () => console.log(`Server started on port ${port}`));

module.exports = app;