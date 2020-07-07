var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose")

mongoose.connect("mongodb://localhost/yelp_camp")

app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");

//SCHEMA SETUP

var campgroundSchema = new mongoose.Schema({
  name: String,
  image: String
});

var Campground = mongoose.model("Campground", campgroundSchema)

// Campground.create(
//   {
//     name: "Granite Hill",
//     image: "https://images.pexels.com/photos/2398220/pexels-photo-2398220.jpeg?auto=compress&cs=tinysrgb&h=350"
//   }, function (err, campground) {
//     if (err) {
//       console.log(err);
//     } else {
//       console.log("NEWLY CREATED CAMPGROUND:");
//       console.log(campground);
//     }
//   });



app.get("/", function (req, res) {
  res.render("landing");
});

app.get("/campgrounds", function (req, res) {
  Campground.find({}, function (err, allCampgrounds) {
    if (err) {
      console.log(err);
    } else {
      res.render("campgrounds", { campgrounds: allCampgrounds });
    }
  })

});

app.post("/campgrounds", function (req, res) {
  var name = req.body.name;
  var image = req.body.image;
  var newCampground = { name: name, image: image };
  //Create a new campground and save to DB
  Campground.create(newCampground, function (err, newlyCreated) {
    if (err) {
      console.log(err);
    } else {
      res.redirect("/campgrounds");
    }
  })
});

app.get("/campgrounds/new", function (req, res) {
  res.render("new.ejs");
});

app.listen(8000, function () {
  console.log("The YelpCamp Server has started");
});
