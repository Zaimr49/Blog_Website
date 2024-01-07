// post save blog
//post save comment
//post save user

const express = require("express");
const mongoose = require("mongoose");
const routes = express.Router();
const bodyParser = require("body-parser");
const usermodel = require("../models/usermodel");
const blogmodel = require("../models/blogmodel");
const app = express();
const path = require("path");
const commentmodel = require("../models/commentmodel");

var jsonParser = bodyParser.json();
var urlencodedParser = bodyParser.urlencoded({ extended: true });

routes.get("/", (req, res) => {
  res.render("signin");
});

routes.get("/signup", (req, res) => {
  res.render("signup");
});

routes.get("/home", (req, res) => {
  // Check if user is logged in
  // Render home page
  // res.render("home");
  blogmodel
    .find({})
    .populate('comments')
    .then((blogs) => {
      res.render("home", { blogs: blogs });
    })
    .catch((err) => {
      res.status(500).send("Error retrieving blogs: " + err);
    });
});







//Save User / Sign Up
routes.post("/saveuser", urlencodedParser, (req, res) => {
  const newuser = usermodel(req.body);
  console.log(req.body);

  newuser
    .save()
    .then((data) => {
      console.log(data);
      console.log("New User Saved...");
    })
    .catch((error) => {
      console.log("New User Not Saved, Error:" + error);
    });

  //   res.send(req.body);
  res.redirect("/home");
});

// Check or Validate User / Sign In
routes.post("/checkuser", urlencodedParser, (req, res) => {
  usermodel
    .find({ username: req.body.username, userpassword: req.body.userpassword })
    .then((data) => {
      if (data.length == 0) {
        // User not found, show warning
        res.send('User not found. <a href="/">Try again</a>');
      } else {
        // User found, redirect to home page
        res.redirect("/home");
      }
    })
    .catch((err) => {
      res.status(500).send(err);
    });
});

// Save Blog Post
routes.post("/addblog", urlencodedParser, (req, res) => {
  // Create a new blog post using the request body data
  const newBlogPost = new blogmodel({
    blogname: req.body.blogname,
    blogauthor: req.body.blogauthor,
    blogcontent: req.body.blogcontent,
  });

  // Save the blog post
  newBlogPost
    .save()
    .then((data) => {
      console.log(data);
      console.log("Blog Post Saved Successfully");
      res.redirect("/home"); // Redirect to the home page after saving
    })
    .catch((error) => {
      console.error("Error Saving Blog Post:", error);
      res.status(500).send("Error saving blog post");
    });
});

// Save Comment
routes.post("/addcomment", urlencodedParser, (req, res) => {
  const newComment = new commentmodel(req.body);
  newComment
    .save()
    .then((data) => {
      console.log(data);
      console.log("Comment Saved Successfully");
      res.redirect("/home"); // Redirect to the home page after saving
    })
    .catch((error) => {
      console.error("Error Saving Comment:", error);
      res.status(500).send("Error saving comment");
    });
});

// //Get Comment according to the ID
// routes.post("/getComment", urlencodedParser,(req,res)=>{
//   commentmodel.find(req.body).then().c

// })

module.exports = routes;
