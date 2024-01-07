const mongoose = require("mongoose");

const blogschema = new mongoose.Schema({
    blogname:String,
    blogauthor:String,
    blogcontent:String,
    comments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'blogcomment'
      }],
});

const blogmodel = mongoose.model("blog", blogschema);

module.exports = blogmodel;
