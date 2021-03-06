var express = require("express"),
  app = express(),
  bodyParser = require("body-parser"),
  mongoose = require("mongoose"),
  flash = require("connect-flash"),
  passport = require("passport"),
  LocalStrategy = require("passport-local"),
  methodOverride = require("method-override"),
  Campground = require("./models/campground"),
  Comment = require("./models/comment"),
  User = require("./models/user"),
  seedDB = require("./seeds")


//requiring routes

var commentRoutes = require("./routes/comments"),
  campgroundRoutes = require("./routes/campgrounds"),
  indexRoutes = require("./routes/index")


mongoose.connect("mongodb://localhost:27017/yelp_camp", { useNewUrlParser: true, useUnifiedTopology: true })
// mongoose.connect("mongodb+srv://markverbeek:kkMONGOOL3@cluster0.yclok.azure.mongodb.net/yelpcamp?retryWrites=true&w=majority", { useNewUrlParser: true, useUnifiedTopology: true })
// mongodb+srv://markverbeek:kkMONGOOL3@cluster0.yclok.azure.mongodb.net/yelpcamp?retryWrites=true&w=majority
// ploinkploink
// yelpcamp
mongoose.set('useFindAndModify', false);
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
app.use(flash())

//seed the database
// seedDB();

// PASSPORT CONFIGURATION
app.use(require("express-session")({
  secret: "Once again, Rusty wins",
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function (req, res, next) {
  res.locals.currentUser = req.user;
  next();
});



app.use("/", indexRoutes);
app.use("/campgrounds", campgroundRoutes);
app.use("/campgrounds/:id/comments", commentRoutes);






let port = process.env.PORT;
if (port == null || port == "") {
  port = 8000;
}
app.listen(port, function () {
  console.log("The YelpCamp Server has started")
});


// app.listen(8000, function () {
//   console.log("The YelpCamp Server has started");
// });
