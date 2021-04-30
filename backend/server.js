const express = require('express');
const morgan = require('morgan');
const cookieParser = require('cookie-parser')
const mongoose = require('mongoose');
const userRoutes = require('./routes/userRoutes');
const screeningRoutes = require('./routes/screeningRoutes');
const movieRoutes = require('./routes/movieRoutes');
const reservationRoutes = require('./routes/reservationRoutes');
const authRoutes = require('./routes/authRoutes');
const cors = require('cors')
const {handleCors} = require("./middleware/corsMiddleware");

// To be enable to have config file
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

// Middlewares
app.use(express.json())
app.use(morgan('dev'))
app.use(handleCors)
app.use(cookieParser())

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
app.use('/screenings', screeningRoutes);
app.use('/movies', movieRoutes);
app.use('/reservations', reservationRoutes);
app.use('/auth', authRoutes)

app.use((req, res) => {
    res.status(404).json({message: "Ooops... something went wrong"})
})