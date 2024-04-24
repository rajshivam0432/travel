const  express=require('express');
const app =express();
const mongoose=require('mongoose')
const connectDB=require('./config/dbconfig')
const hotelRouter=require('./routes/hotel.router')
const hoteldataaddedtorouter=require("./routes/dataimport")
app.use(express.json());
connectDB();
app.get("/",(req,res)=>{
    res.send("hello world")

})
app.use("/api/hoteldata",hoteldataaddedtorouter)
app.use("/api/hotels",hotelRouter);
mongoose.connection.once("open",()=>{
    console.log("connected");
    app.listen(3000,()=>{
        console.log("running")
    });
})
