var Travelground = require("../models/travelground");
var Comment = require("../models/comment");

var middlewareObj = {};

//MIDDLEWARE- To verify ownership of travelground
middlewareObj.checkCampgroundOwnership = function(req, res, next) {
 if(req.isAuthenticated()){
        Travelground.findById(req.params.id, function(err, foundTravelground){
           if(err){
               req.flash("error","Travelground not found");
               res.redirect("back");
           }  else {
               // does user own the travelground?
            if(foundTravelground.author.id.equals(req.user._id)) {
                next();
            } else {
                req.flash("error","Sorry! You don't have permission to do that")
                res.redirect("back");
            }
           }
        });
    } else {
        req.flash("error","You need to be Logged in")
        res.redirect("back");
    }
}

//MIDDLEWARE - To verify ownership of comment
middlewareObj.checkCommentOwnership = function(req, res, next) {
 if(req.isAuthenticated()){
        Comment.findById(req.params.comment_id, function(err, foundComment){
           if(err){
              req.flash("error","Comment not found");
              res.redirect("back");
           }  else {
               // does user own the comment?
            if(foundComment.author.id.equals(req.user._id)) {
                next();
            } else {
                req.flash("error","Sorry! You don't have permission to do that")
                res.redirect("back");
            }
           }
        });
    } else {
        req.flash("error","You need to be Logged in")
        res.redirect("back");
    }
}

//MIDDLEWARE- To verify if user is logged in or not
middlewareObj.isLoggedin = function(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    req.flash("error","You need to be Logged in")
    res.redirect("/login");
}

module.exports = middlewareObj;