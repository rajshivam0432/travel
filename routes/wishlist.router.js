const express = require('express');
const router = express.Router();
const Wishlist = require('../Model/wishlist.model');// Assuming this is your Mongoose model

router.route("/").post(async(req,res)=>{
    const newishlist= new Wishlist(req.body);
    
    try{
        const savedwishlist=await newishlist.save();
        res.json(savedwishlist);

    }catch(err){
console.log(err);
res.status(500).json({message:"failed to createct wishlist"})
    }
})
router.route("/:id").delete(async(req,res)=>{
   try {const wlsit=await Wishlist.findOneAndDelete(req.params.id)
    res.json({message:"deleted form wishlist"})}
    catch(err){
        console.log(err);
        res.status(500).json({message:"failed to create wishlist"})
            }
})
router.route("/")
.get(async(req,res)=>{
    try{
const findwishlist=await Wishlist.find({});
if (!findwishlist || findwishlist.length === 0) {
    return res.status(404).json({ message: "No findwishlist  found" });
  }
  res.json(findwishlist)
    }catch(err){
console.log(err);
res.status(500).json({ message: "An error occurred while fetching hotel categories" });

    }
})
module.exports = router;
