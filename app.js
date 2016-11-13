var express = require("express"),
    mongoose = require("mongoose"),
    bodyParser = require("body-parser"),
    app     = express();
    
app.set("view engine", "ejs");
mongoose.connect("mongodb://localhost/travelground");
app.use(bodyParser.urlencoded({
    extended: true
}));

//DB Schema defined
var travelgroundSchema = new mongoose.Schema({
    name: String,
    image: String,
    description:String

});

//DB Model
var Travelground = mongoose.model("Travelground",travelgroundSchema);

//Landing Page
app.get("/",function(req,res){
    res.render("index");
});    

//Posts Page
app.get("/travelgrounds",function(req,res){
    res.render("travelgrounds");
});

//New Route 
app.get("/travelgrounds/new", function(req, res) {
    res.render("new");
});

//Create Route 

app.post("/campgrounds", function(req, res) {
            var name = req.body.name;
            var image = req.body.image;
            var description = req.body.description;
            
            var newCampground = {
                name: name,
                image: image, 
                description:description 
                
            };
            Travelground.create({ name: name , image: image , description:description }, function(err, campground) {

                if (err) {
                    console.log("Error");
                    }
                else {
                res.redirect("/campgrounds");
                    }
            });
        });

app.listen(process.env.PORT, process.env.IP);