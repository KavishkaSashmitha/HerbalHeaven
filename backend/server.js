const express = require('express');
require('dotenv').config();
const connectDB = require('./config/dbConfig');
const colors = require('colors');
const { errorHandler } = require('./middleware/errorMiddleware');

connectDB();

const app = express();
const PORT = process.env.PORT || 8070;

//Read Json
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api/cart', require('./routes/cartRoutes'));
app.use('/api/user', require('./routes/userRoutes'));
app.use(errorHandler);
app.listen(PORT, () => {
  console.log('Port Connected ' + PORT);
});
