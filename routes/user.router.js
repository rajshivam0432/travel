const express = require('express');
const router = express.Router();
const Users = require('../Model/user.model');// Assuming this is your Mongoose model
const CryptoJS = require('crypto-js'); // Importing CryptoJS
const jwt = require('jsonwebtoken');

router.route("/register")
  .post(async (req, res) => {
 try {
      const userdata={
        username:req.body.username,
         email:req.body.email,
         password:CryptoJS.AES.encrypt(req.body.password, process.env.PASSWORD_SECRET_KEY).toString(),
         number:req.body.number 

         
      }
      //add object to the data base
      const newuser= new Users(userdata);
      const saveuser=await newuser.save();
      res.status(201).json(saveuser)
    } catch (err) {
        res.status(500).json({message:"error in creating a user"})
     console.log(err)
    }
  })
  router.route ("/login").post( async (req, res) => {
    try {
     
  
      // Find user by mobile number
      const user = await Users.findOne({ number:req.body.number });
  
      if (!user) { // Check if the user is found
        return res.status(404).json({ message: "User not found." }); // Handle user not found
      }
  
      // Decrypt the password
      const decryptedPassword = CryptoJS.AES.decrypt(user.password, process.env.PASSWORD_SECRET_KEY).toString(CryptoJS.enc.Utf8);
   console.log("decrpass",decryptedPassword)
      if (decryptedPassword !== req.body.password) {
        return res.status(401).json({ message: "Incorrect password." }); // Handle incorrect password
      }
  
      // Generate JWT
      const accessToken = jwt.sign({ username: user.username }, process.env.ACCESS_TOKEN);
  
      // Remove the password before sending the user data
      const { password, ...rest } = user._doc;
      res.status(200).json({ ...rest, accessToken });
  
    } catch (err) {
      console.error("Error during login:", err); // Log the error
      res.status(500).json({ message: "An error occurred during login." }); // Return a 500 status
    }
  });
module.exports = router;
