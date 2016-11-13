//DB Schema for comments defined
var mongoose = require("mongoose");
var commentSchema = new mongoose.Schema({
    text: String,
    author: String
});
//DB Model
module.exports = mongoose.model("Comment",commentSchema);