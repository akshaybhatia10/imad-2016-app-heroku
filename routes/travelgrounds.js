var express = require("express");
var app = express.Router();
var Travelground = require("../models/travelground");
var middleware = require("../middleware");


//TRAVELGROUND Routes

//INDEX - SHOW ALL POSTS
app.get("/travelgrounds",function(req,res){
    Travelground.find({},function(err,travelgrounds){
        if(err){
            console.log(err);
        }else{
            res.render("travelgrounds/travelgrounds",{travelgrounds : travelgrounds });
        }
    });
});

//NEW - SHOW FORM TO ADD A NEW TRAVELGROUND
app.get("/travelgrounds/new",middleware.isLoggedin,function(req, res) {
    res.render("travelgrounds/new");
});

//CREATE - ADD THE TRAVELGROUND TO DB
app.post("/travelgrounds",middleware.isLoggedin, function(req, res) {
            var name = req.body.name;
            var image = req.body.image;
            var description = req.body.description;
            var author = {
              id : req.user._id,
              username : req.user.username
            };
            
            var newTravelground = {
                name: name,
                image: image, 
                description:description,
                author:author
            };
             Travelground.create(newTravelground, function(err, travelgrounds) {
                if (err) {
                    console.log("Error");
                    }
                else {
                res.redirect("/travelgrounds");
                    }
            });
        });

//SHOW - VIEW MORE INFO ABOUT THE TRAVELGROUND
app.get("/travelgrounds/:id",function(req, res) {
    
   Travelground.findById(req.params.id).populate("comments").exec(function(err,newTravelground){
       if(err){
           console.log("Error");
       }
       else{
             res.render("travelgrounds/show",{ travelground : newTravelground });
       }
   });
});

//EDIT - EDIT A TRAVELGROUND
app.get("/travelgrounds/:id/edit",middleware.checkCampgroundOwnership,function(req, res){
    Travelground.findById(req.params.id, function(err, travelground){
        res.render("travelgrounds/edit", {travelground: travelground});
        
    });
});

// UPDATE TRAVELGROUND ROUTE
app.put("/travelgrounds/:id",middleware.checkCampgroundOwnership,function(req, res){
    // find and update the correct travelground
    Travelground.findByIdAndUpdate(req.params.id, req.body.travelground, function(err, updatedTravelground){
       if(err){
           res.redirect("/travelgrounds");
       } else {
           //redirect somewhere(show page)
           res.redirect("/travelgrounds/" + req.params.id);
       }
    });
});

// DESTROY TRAVELGROUND ROUTE
app.delete("/travelgrounds/:id",middleware.checkCampgroundOwnership,function(req, res){
   Travelground.findByIdAndRemove(req.params.id, function(err){
      if(err){
          res.redirect("/travelgrounds");
      } else {
          res.redirect("/travelgrounds");
      }
   });
});

module.exports = app;