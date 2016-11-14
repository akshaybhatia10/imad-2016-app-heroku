var express = require("express");
var app = express.Router();
var passport = require("passport");
var User = require("../models/user");


//LANDING Page
app.get("/",function(req,res){
    res.render("index");
});  

//AUTHENTICATION Routes -

//SIGNUP Route -
app.get("/signup",function(req, res) {
   res.render("signup"); 
});

app.post("/signup",function(req, res) {
   var newUser = new User( { username : req.body.username } );
   var password = req.body.password ;
   User.register(newUser,password,function(err,user){
       if(err){
           console.log(err);
           return res.render("signup");
       }
       passport.authenticate("local")(req,res,function(){
           req.flash("success","Welcome To TravelCamp  " + user.username );
           res.redirect("/travelgrounds");
       });
   }); 
});

//LOGIN Route
app.get("/login",function(req,res){
   res.render("login"); 
});

app.post("/login",passport.authenticate("local" ,
    {
        successRedirect : "/travelgrounds",
        failureRedirect : "/login",
        failureFlash: true

    
    }),function(req, res) {
   
});

//LOGOUT Route
app.get("/logout",function(req, res) {
   req.logout();
   req.flash("success","Logged you out successfully");
   res.redirect("/travelgrounds")
});

module.exports = app;