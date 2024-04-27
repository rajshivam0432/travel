const express=require("express")
const router=express.Router();
const hotel=require("../Model/hotel.model");
router.route("/:id")
.get (async (req,res)=>{
   try{
    const {id}=req.params;
 const hotels=await hotel.findById(id)
 res.json(hotels)
   }catch{
    res.status(404).json({message:"hotel not found"});

   }
})
module.exports =router;