const express = require("express");
const app = express();
const mongoose = require("mongoose");

const dotenv = require("dotenv").config();

var connectionFlag = mongoose.connect(process.env.MONGO_URI);
console.log("connectionFlag", connectionFlag);

console.log("here10");

connectionFlag
.then((data) => {
  // console.log(data)
  console.log("Database Connected");
})
.catch((error) => {
  console.log("Error:", error);
});

console.log("here20");