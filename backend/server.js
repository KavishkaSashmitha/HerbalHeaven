const express = require('express');
require('dotenv').config();
const connectDB = require('./config/dbConfig');
const Cardrouter = require('./routes/PaymnetRoutes');
const CashRouter = require('./routes/CashRoutes');

const colors = require('colors');
const cors = require('cors');
const { errorHandler } = require('./middleware/errorMiddleware');

connectDB();
 
const path = require('path');

const bodyParser = require('body-parser');
 
const app = express();
const PORT = process.env.PORT || 8070;     

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json({ limit: '5mb' }));
app.use(express.urlencoded({ extended: false }));

// Routes

app.use('/api/user/cart', require('./routes/cartRoutes'));
app.use('/api/user', require('./routes/userRoutes'));
app.use('/api/products', require('./routes/productRoutes'));
app.use('/api/directorders', require('./routes/directOrderRoute'));
app.use('/api/posts', require('./routes/posts'));

app.use('/sup', require('./routes/supplierRouter'));

app.use('/', require('./routes/PaymnetRoutes'));
app.use('/api/transports', require('./routes/transports'));
app.use('/', Cardrouter);
app.use('/cash', CashRouter);

app.use(bodyParser.json());

// Use routes

app.use('/api', require('./routes/otpRoutes'));
app.use('/api/orders', require('./routes/orders'));

app.use('/api', require('./routes/otpRoutes'));

//app.use('/emp', require('./routes/empRouter'));
app.use('/inventory', require('./routes/inventoryRoutes'));

app.use(
  '/img/inventory',
  express.static(path.join(__dirname, 'img', 'inventory'))
);

app.use('/backend/img/inventory', express.static('backend/img/inventory'));

// Error handler middleware
app.use(errorHandler);

// Start server
app.listen(PORT, () => {
  console.log('Port Connected ' + PORT);
  console.log('Connect To Mongo db');

  console.log(`Server is running on port ${PORT}`.yellow.bold);
});
