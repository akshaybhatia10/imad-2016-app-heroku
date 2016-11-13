var express = require("express"),
    mongoose = require("mongoose"),
    bodyParser = require("body-parser"),
    app     = express();
    
mongoose.Promise = global.Promise;
app.set("view engine", "ejs");
mongoose.connect("mongodb://localhost/travelground");
app.use(bodyParser.urlencoded({
    extended: true
}));

//DB Schema for posts defined
var travelgroundSchema = new mongoose.Schema({
    name: String,
    image: String,
    description:String,
    comments: [
      {
         type: mongoose.Schema.Types.ObjectId,
         ref: "Comment"
      }
   ]

});
//DB Model
var Travelground = mongoose.model("Travelground",travelgroundSchema);

//DB Schema for comments defined
var commentSchema = new mongoose.Schema({
    text: String,
    author: String
});
//DB Model
var Comment = mongoose.model("Comment",commentSchema);


//TRAVELGROUND Routes

//Landing Page
app.get("/",function(req,res){
    res.render("index");
});    

//Posts Page
app.get("/travelgrounds",function(req,res){
    Travelground.find({},function(err,travelgrounds){
        if(err){
            console.log(err);
        }else{
            res.render("travelgrounds/travelgrounds",{travelgrounds : travelgrounds });
        }
    });
});

//NEW Route 
app.get("/travelgrounds/new", function(req, res) {
    res.render("travelgrounds/new");
});

//CREATE Route 
app.post("/travelgrounds", function(req, res) {
            var name = req.body.name;
            var image = req.body.image;
            var description = req.body.description;
            
            var newTravelground = {
                name: name,
                image: image, 
                description:description 
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

//SHOW Route - View individual posts
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

//COMMENT ROUTES

//NEW - comment
app.get("/travelgrounds/:id/comments/new",function(req, res) {
    Travelground.findById(req.params.id,function(err,travelground){
       if(err){
           console.log(err);
       } else{
            res.render("comments/new",{travelground:travelground}); 
       }

    });    
});

//POST - comment
app.post("travelgrounds/:id/comments",function(req, res) {
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
               travelground.comments.push(comment);
               travelground.save();
               res.redirect("/travelgrounds/" + travelground._id);
                 }
               
           });
       }
    }); 
});

app.listen(process.env.PORT, process.env.IP);