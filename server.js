const express = require("express");
const app = express();
const mongoose = require("mongoose");
const connectDB = require("./config/dbconfig");

const hotelRouter = require("./routes/hotel.router");
const categoryRouter = require("./routes/category.router");
const singlehotelRouter = require("./routes/singlehotel.router");
const authrouter = require("./routes/user.router");
const wishlistrouter = require("./routes/wishlist.router");
const hellorouter = require("./routes/hello.router");

const hoteldataaddedtorouter = require("./routes/dataimport");
const categorydataaddedtorouter = require("./routes/categoryimport");

app.use(express.json());
connectDB();
app.get("/", (req, res) => {
  res.send("hello world");
});




app.use("/api/hoteldata", hoteldataaddedtorouter);
app.use("/api/hotels", hotelRouter);
app.use("/api/category", categoryRouter);
app.use("/api/categorydata",categorydataaddedtorouter);
app.use("/api/hotels",singlehotelRouter);
app.use("/api/auth",authrouter);
app.use("/api/wishlist",wishlistrouter);
app.use("/api/hello",hellorouter);



mongoose.connection.once("open", () => {
  console.log("connected");
  app.listen(3000, () => {
    console.log("running");
  });
});
