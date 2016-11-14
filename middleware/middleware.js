var Travelground = require("../models/travelground");
var Comment = require("../models/comment");


//MIDDLEWARE- To verify if user if loggedin or not
function isLoggedin(req,res,next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}