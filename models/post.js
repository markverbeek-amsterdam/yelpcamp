var mongoose = require("mongoose");

//USER - email, name

const { Mongoose } = require("mongoose");

var userSchema = new Mongoose.Schema({
    title: String,
    content: String
});

module.exports = mongoose.model("Post", postSchema);
