const express = require("express");
require("dotenv").config();
const connectDB = require("./config/dbConfig");
const colors = require("colors");
const cors = require("cors");
const { errorHandler } = require("./middleware/errorMiddleware");

connectDB();

const app = express();
const PORT = process.env.PORT || 8070;

//Read Json
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/user/cart", require("./routes/cartRoutes"));
app.use("/api/user", require("./routes/userRoutes"));
app.use("/api/products", require("./routes/productRoutes"));

app.use("/api/posts", require("./routes/posts"));

app.use("/emp", require("./routes/empRouter"));


app.use(errorHandler);
app.listen(PORT, () => {
  console.log("Port Connected " + PORT);
});
