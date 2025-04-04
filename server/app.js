const dotenv = require('dotenv');
dotenv.config();

const express = require('express');
const cors = require('cors');
const connectToDb = require('./db/dbConnection');
const userRouter = require('./routes/userRoutes');

const app = express();

// Connect to database
connectToDb();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.get('/', (req, res) => {
    res.send("Hello world");
});

app.use('/users', userRouter);

module.exports = app;
