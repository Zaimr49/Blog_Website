const mongoose = require("mongoose");

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
        ref: 'blog',
        required: true
    }
});

const commentmodel = mongoose.model("blogcomment", commentSchema);

module.exports = commentmodel;
