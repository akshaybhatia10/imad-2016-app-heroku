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

app.listen(process.env.PORT, process.env.IP);