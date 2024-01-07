const mongoose = require("mongoose");

const userSchema=new mongoose.Schema(
    {
      username:String,
      userpassword:String,
    }
  )
  
  const usermodel=mongoose.model('usermaster',userSchema);

  module.exports=usermodel;
  