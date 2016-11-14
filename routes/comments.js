var express = require("express");
var app = express.Router();
var Travelground = require("../models/travelground"),
    Comment    = require("../models/comment");


//COMMENT ROUTES

//NEW - FORM TO ADD A NEW COMMENT
app.get("/travelgrounds/:id/comments/new",function(req, res) {
    Travelground.findById(req.params.id,function(err,travelground){
       if(err){
           console.log(err);
       } else{
            res.render("comments/new",{travelground:travelground}); 
       }

    });    
});

//CREATE - ADD THE COMMENT TO DB
app.post("/travelgrounds/:id/comments",function(req, res) {
   Travelground.findById(req.params.id,function(err,travelground){
       if(err){
           console.log(err);
           res.redirect("/travelgrounds");
              } else{
           Comment.create(req.body.comment,function(err,comment){
               if(err){
                   console.log(err);
               }else
                 {
                //add username and id to comment     
                comment.author.id = req.user.id ;
                comment.author.username = req.user.username;
                
                //save the comment and the push to campground     
                comment.save();         
                travelground.comments.push(comment);
                travelground.save();
                res.redirect("/travelgrounds/" + travelground._id);
                 }
               
           });
       }
    }); 
});

// COMMENT EDIT ROUTE
app.get("/travelgrounds/:id/comments/:comment_id/edit", function(req, res){
   Comment.findById(req.params.comment_id, function(err, comment){
      if(err){
          res.redirect("back");
      } else {
        res.render("comments/edit", {travelground_id: req.params.id, comment: comment});
      }
   });
});

// COMMENT UPDATE
app.put("/campgrounds/:id/comments/:comment_id",function(req, res){
   Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, updatedComment){
      if(err){
          res.redirect("back");
      } else {
          res.redirect("/travelgrounds/" + req.params.id );
      }
   });
});

// COMMENT DESTROY ROUTE
app.delete("/travelgrounds/:id/comments/:comment_id",function(req, res){
    Comment.findByIdAndRemove(req.params.comment_id, function(err){
       if(err){
           res.redirect("back");
       } else {
           res.redirect("/travelgrounds/" + req.params.id);
       }
    });
});

module.exports = app;