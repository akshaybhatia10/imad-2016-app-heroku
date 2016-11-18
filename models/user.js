//DB for users defined 
var mongoose = require("mongoose");
//Local Signup
var passportLocalMongoose = require("passport-local-mongoose");

var userSchema = new mongoose.Schema({
    username: String,
    password: String,
    facebook:{
    id: String,
    token: String,
    username: String
    }
});

userSchema.plugin(passportLocalMongoose);
//DB Model
module.exports = mongoose.model("User", userSchema);