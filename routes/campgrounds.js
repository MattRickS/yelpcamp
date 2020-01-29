const express = require("express"),
	  router = express.Router(),
	  Campground = require("../models/campground");

// middleware
function isLoggedIn(req, res, next) {
	if (req.isAuthenticated()) {
		return next();
	} else {
		res.redirect("/login");
	}
}

// INDEX
router.get("/", function(req, res) {
	Campground.find({}, function(err, campgrounds) {
		if (err) {
			console.log(err);
		} else {
			res.render("campgrounds/index", {campgrounds: campgrounds});
		}
	});
});
// CREATE
router.post("/", function(req, res) {
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
router.get("/new", isLoggedIn, function(req, res) {
	res.render("campgrounds/new");
});
// SHOW
router.get("/:id", function(req, res) {
	Campground.findById(req.params.id).populate("comments").exec(function(err, campground) {
		if (err || !campground) {
			res.send("Failed to retrieve campground for this id!");
		} else {
			res.render("campgrounds/show", {campground: campground});
		}
	});
});

module.exports = router;
