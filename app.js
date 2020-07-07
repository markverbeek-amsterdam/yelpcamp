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

var campgrounds = [
  {
    name: "Salmon Creek",
    image:
      "https://images.pexels.com/photos/696941/pexels-photo-696941.jpeg?auto=compress&cs=tinysrgb&h=350",
  },
  {
    name: "Granite Hill",
    image:
      "https://images.pexels.com/photos/2398220/pexels-photo-2398220.jpeg?auto=compress&cs=tinysrgb&h=350",
  },
  {
    name: "Mountain Goat's Rest",
    image:
      "https://images.pexels.com/photos/1687845/pexels-photo-1687845.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
  },
  {
    name: "Salmon Creek",
    image:
      "https://images.pexels.com/photos/696941/pexels-photo-696941.jpeg?auto=compress&cs=tinysrgb&h=350",
  },
  {
    name: "Granite Hill",
    image:
      "https://images.pexels.com/photos/2398220/pexels-photo-2398220.jpeg?auto=compress&cs=tinysrgb&h=350",
  },
  {
    name: "Mountain Goat's Rest",
    image:
      "https://images.pexels.com/photos/1687845/pexels-photo-1687845.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
  },
  {
    name: "Salmon Creek",
    image:
      "https://images.pexels.com/photos/696941/pexels-photo-696941.jpeg?auto=compress&cs=tinysrgb&h=350",
  },
  {
    name: "Granite Hill",
    image:
      "https://images.pexels.com/photos/2398220/pexels-photo-2398220.jpeg?auto=compress&cs=tinysrgb&h=350",
  },
  {
    name: "Mountain Goat's Rest",
    image:
      "https://images.pexels.com/photos/1687845/pexels-photo-1687845.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
  },
];

app.get("/", function (req, res) {
  res.render("landing");
});

app.get("/campgrounds", function (req, res) {
  res.render("campgrounds", { campgrounds: campgrounds });
});

app.post("/campgrounds", function (req, res) {
  var name = req.body.name;
  var image = req.body.image;
  var newCampground = { name: name, image: image };
  campgrounds.push(newCampground);
  res.redirect("/campgrounds");
});

app.get("/campgrounds/new", function (req, res) {
  res.render("new.ejs");
});

app.listen(8000, function () {
  console.log("The YelpCamp Server has started");
});
