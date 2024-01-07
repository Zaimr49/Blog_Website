const mongoose = require("mongoose");
const blogmodel = require("../models/blogmodel");


const commentSchema = new mongoose.Schema({
    commenterName: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    blog: {
        type: mongoose.Schema.Types.ObjectId,
        ref: blogmodel,
        required: true
    }
});

const commentmodel = mongoose.model("blogcomment", commentSchema);

module.exports = commentmodel;
