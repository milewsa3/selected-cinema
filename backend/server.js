const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const userRoutes = require('./routes/userRoutes');

// To be enable to have config file
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

// Middlewares
app.use(express.json());
app.use(morgan('dev'));

// Configure mongoDB
const dbURI = process.env.ATLAS_URI;
mongoose.connect(dbURI, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true });
const connection = mongoose.connection;
connection.once('open', () => {
    console.log('MongoDB connection established successfully');
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

// routes
app.use('/users', userRoutes);