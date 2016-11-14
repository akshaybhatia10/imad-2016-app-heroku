//DB for users defined 
var mongoose = require("mongoose");
//Local Signup
var passportLocalMongoose = require("passport-local-mongoose");

var userSchema = new mongoose.Schema({
    username: String,
    password: String
});

userSchema.plugin(passportLocalMongoose);
//DB Model
module.exports = mongoose.model("User", userSchema);