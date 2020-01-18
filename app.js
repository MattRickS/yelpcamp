const express = require("express"),
	  request = require("request"),
	  bodyParser = require("body-parser"),
	  mongoose = require("mongoose"),
	  app = express();

// TODO: Watch https://www.youtube.com/watch?v=NHHh0sj1uKY to update
// from bootstrap 3.3 to 4


mongoose.set("useNewUrlParser", true);
mongoose.set("useFindAndModify", false);
mongoose.set("useCreateIndex", true);
mongoose.set("useUnifiedTopology", true);
mongoose.connect("mongodb://localhost/yelp_camp");
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

// Schema
var campgroundSchema = new mongoose.Schema({
	name: String,
	image: String,
	description: String,
});
var Campground = mongoose.model("Campground", campgroundSchema);


app.get("/", function(req, res) {
	res.render("landing");
});

// INDEX
app.get("/campgrounds", function(req, res) {
	Campground.find({}, function(err, campgrounds) {
		if (err) {
			console.log(err);
		} else {
			res.render("index", {campgrounds: campgrounds});
		}
	})
});
// CREATE
app.post("/campgrounds", function(req, res) {
	var name = req.body.name;
	var image = req.body.image;
	var description = req.body.description;
	var campground = {name: name, image: image, description: description};
	Campground.create(campground, function(err, campground) {
		if (err) {
			console.log(err);
		} else {
			res.redirect("/campgrounds");
		}
	});
});
// NEW
app.get("/campgrounds/new", function(req, res) {
	res.render("new");
});
// SHOW
app.get("/campgrounds/:id", function(req, res) {
	Campground.findById(req.params.id, function(err, campground) {
		if (err || !campground) {
			res.send("Failed to retrieve campground for this id!");
		} else {
			res.render("show", {campground: campground});
		}
	});
});

app.listen(3000, function() {
	console.log("The YelpCamp server has started");
});
