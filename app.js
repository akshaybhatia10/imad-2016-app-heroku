var express       = require("express"),
    mongoose      = require("mongoose"),
    flash         = require("connect-flash"),
    methodOverride= require("method-override"), 
    bodyParser    = require("body-parser"),
    app           = express(),
    passport      = require("passport"),
    LocalStrategy = require("passport-local"),
    User          = require("./models/user");

var travelgroundRoutes = require("./routes/travelgrounds"),    
    commentRoutes = require("./routes/comments"),
    indexRoutes = require("./routes/index")

//Promise to make mongoose non-depriciated    
mongoose.Promise = global.Promise;

//Setting templating engine as EJS
app.set("view engine", "ejs");

//Path for /public CSS files
app.use(express.static(__dirname + "/public"));

//Using method-override for PUT and DELETE requests
app.use(methodOverride("_method"));

//Using connect-flash for user messages
app.use(flash());

//Local Mongo DB
//mongoose.connect("mongodb://localhost/travelground");

//Connecting to mLAB : Cloud hosted mongoDB
mongoose.connect("mongodb://travelgrounds:travelgrounds@ds011893.mlab.com:11893/travelgrounds");

//Using body-parser to get form values
app.use(bodyParser.urlencoded({
    extended: true
}));

//PassportJS Authentication

//Creating a session Token
app.use(require("express-session")({
    secret:"Yo This is Travel Camp",
    resave:false,
    saveUninitialized: false
}));

//PassportJS Confi Setup
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//Passing 3 variables to every template
app.use(function(req,res,next){
    res.locals.currentUser = req.user;
    res.locals.error     = req.flash("error");
    res.locals.success     = req.flash("success");
    next();
});

//Using all the routes
app.use(travelgroundRoutes);
app.use(commentRoutes);
app.use(indexRoutes);


app.listen(process.env.PORT, process.env.IP);