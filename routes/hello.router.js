const express=require("express");
const hello=require("../Model/hello.model")
const router=express.Router();
router.route("/").post(async(req,res)=>{
    const hellos=new hello(req.body);
    try{
        const savedhello=hellos.save();
        res.json(savedhello);
    }
    catch(err){
        console.log(err)
    }
})
module.exports=router;