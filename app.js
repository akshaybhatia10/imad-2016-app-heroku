var express       = require("express"),
    mongoose      = require("mongoose"),
    flash         = require("connect-flash"),
    methodOverride= require("method-override"), 
    bodyParser    = require("body-parser"),
    app           = express(),
    passport      = require("passport"),
    LocalStrategy = require("passport-local"),
    FacebookStrategy = require("passport-facebook"),
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
mongoose.connect("mongodb://localhost/travelground");

//Connecting to mLAB : Cloud hosted mongoDB
//mongodb://travelgrounds:travelgrounds@ds011893.mlab.com:11893/travelgrounds
//mongoose.connect(process.env.DATABASEURL);

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

passport.use(new FacebookStrategy({  
    clientID: "1702599460057899",
    clientSecret: "85d214c5485ef07a5b44e6285d80b8a4",
    callbackURL: "https://akshaybhatia10.herokuapp.com/auth/facebook/callback",
    profileFields: ['id', 'email', 'first_name', 'last_name'],
  },
  function(token, refreshToken, profile, done) {
    process.nextTick(function() {
      User.findOne({ 'facebook.id': profile.id }, function(err, user) {
        if (err)
          return done(err);
        if (user) {
          return done(null, user);
        } else {
          var newUser = new User();
          newUser.facebook.id = profile.id;
          newUser.facebook.token = token;

          newUser.save(function(err) {
            if (err)
              throw err;
            return done(null, newUser);
          });
        }
      });
    });
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

app.get('/auth/facebook', passport.authenticate('facebook', { scope: 'email' }));

app.get('/auth/facebook/callback', passport.authenticate('facebook', {  
  successRedirect: '/travelgrounds',
  failureRedirect: '/',
}));

app.listen(process.env.PORT, process.env.IP);