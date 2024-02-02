const express = require('express');
const dotenv = require('dotenv').config();
const connectDB = require('./config/dbConfig');
const colors = require('colors');

connectDB();

const app = express();
const PORT = process.env.PORT || 8070;

//Read Json
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api/cart', require('./routes/cartRoutes'));

app.listen(PORT, () => {
  console.log('Port Connected ' + PORT);
});
