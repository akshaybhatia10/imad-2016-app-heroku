var express = require("express"),
    mongoose = require("mongoose"),
    bodyParser = require("body-parser"),
    app     = express();
    
app.set("view engine", "ejs");
mongoose.connect("mongodb://localhost/travelground");
app.use(bodyParser.urlencoded({
    extended: true
}));

var travelgroundSchema = new mongoose.Schema({
    name: String,
    image: String,
    description:String

});

var Travelground = mongoose.model("Travelground",travelgroundSchema);

app.get("/",function(req,res){
    res.render("index");
});    

app.get("/travelgrounds",function(req,res){
    res.redirect("/");
});

app.listen(process.env.PORT, process.env.IP);