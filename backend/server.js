const express = require('express');
require('dotenv').config();
const connectDB = require('./config/dbConfig');
const colors = require('colors');
const cors = require('cors');
const { errorHandler } = require('./middleware/errorMiddleware');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 8070;

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes
app.use('/api/user/cart', require('./routes/cartRoutes'));
app.use('/api/user', require('./routes/userRoutes'));
app.use('/api/products', require('./routes/productRoutes'));
app.use('/api/posts', require('./routes/posts'));
app.use('/emp', require('./routes/empRouter'));
app.use('/inventory', require('./routes/inventoryRoutes'));
/*
app.use(
  '/img/inventory',
  express.static(path.join(__dirname, 'inventory', 'img'))
);
*/
app.use(
  '/img/inventory',
  express.static(path.join(__dirname, 'img', 'inventory'))
);

// Error handler middleware
app.use(errorHandler);

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`.yellow.bold);
});

//
