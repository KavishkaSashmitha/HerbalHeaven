<<<<<<< Updated upstream
const express = require('express');
require('dotenv').config();
const connectDB = require('./config/dbConfig');
const colors = require('colors');
const cors = require('cors');
const { errorHandler } = require('./middleware/errorMiddleware');
=======
const express = require("express");
require("dotenv").config();
const connectDB = require("./config/dbConfig");
const colors = require("colors");
const cors = require("cors");
const Cardrouter = require("./routes/PaymnetRoutes");
const { errorHandler } = require("./middleware/errorMiddleware");
>>>>>>> Stashed changes

connectDB();

const app = express();
const PORT = process.env.PORT || 8070;

//Read Json
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

<<<<<<< Updated upstream
app.use('/api/user/cart', require('./routes/cartRoutes'));
app.use('/api/user', require('./routes/userRoutes'));
app.use('/api/products', require('./routes/productRoutes'));
app.use(errorHandler);
app.listen(PORT, () => {
  console.log('Port Connected ' + PORT);
=======
app.use("/api/user/cart", require("./routes/cartRoutes"));
app.use("/api/user", require("./routes/userRoutes"));
app.use("/api/products", require("./routes/productRoutes"));
app.use("/api/posts", require("./routes/posts"));
app.use("/sup", require("./routes/empRouter"));
app.use("/", Cardrouter);


app.use(errorHandler);
app.listen(PORT, () => {
  console.log("Port Connected " + PORT);
  console.log("Connect To Mongo db");
>>>>>>> Stashed changes
});
