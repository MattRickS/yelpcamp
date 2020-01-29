const express = require("express"),
	  request = require("request"),
	  bodyParser = require("body-parser"),
	  mongoose = require("mongoose"),
	  passport = require("passport"),
	  LocalStrategy = require("passport-local"),
	  app = express(),
	  expressSession = require("express-session"),
      Campground = require("./models/campground"),
      Comment = require("./models/comment"),
      User = require("./models/user"),
      seedDB = require("./seeds");

// TODO: Watch https://www.youtube.com/watch?v=NHHh0sj1uKY to update
// from bootstrap 3.3 to 4


mongoose.set("useNewUrlParser", true);
mongoose.set("useFindAndModify", false);
mongoose.set("useCreateIndex", true);
mongoose.set("useUnifiedTopology", true);
mongoose.connect("mongodb://localhost/yelp_camp");
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + "/public"));
app.set("view engine", "ejs");

// PASSPORT SETUP
app.use(expressSession({
	secret: "Secured by a super safe secret",
	resave: false,
	saveUninitialized: false,
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next) {
	res.locals.currentUser = req.user;
	next();
});

function isLoggedIn(req, res, next) {
	if (req.isAuthenticated()) {
		return next();
	} else {
		res.redirect("/login");
	}
}

// seedDB();

app.get("/", function(req, res) {
	res.render("landing");
});

// INDEX
app.get("/campgrounds", function(req, res) {
	Campground.find({}, function(err, campgrounds) {
		if (err) {
			console.log(err);
		} else {
			res.render("campgrounds/index", {campgrounds: campgrounds});
		}
	});
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
	res.render("campgrounds/new");
});
// SHOW
app.get("/campgrounds/:id", function(req, res) {
	Campground.findById(req.params.id).populate("comments").exec(function(err, campground) {
		if (err || !campground) {
			res.send("Failed to retrieve campground for this id!");
		} else {
			res.render("campgrounds/show", {campground: campground});
		}
	});
});

// =============================================================================
// COMMENTS
// =============================================================================

// NEW
app.get("/campgrounds/:id/comments/new", isLoggedIn, function(req, res) {
	Campground.findById(req.params.id, function(err, campground) {
		if (err) {
			console.log(err);
		} else {
			res.render("comments/new", {campground: campground});
		}
	})
});
app.post("/campgrounds/:id/comments", isLoggedIn, function(req, res) {
	Campground.findById(req.params.id, function(err, campground) {
		if (err) {
			console.log(err);
		} else {
			Comment.create(req.body.comment, function(err, comment) {
				if (err) {
					console.log(err);
				} else {
					campground.comments.push(comment);
					campground.save(function(err, camp) {
						if (err) {
							console.log(err);
						}
					});
					res.redirect(`/campgrounds/${campground._id}`);
				}
			});
		}
	});
});


// =============================================================================
// AUTH ROUTES
// =============================================================================

app.get("/register", function(req, res) {
	res.render("register");
});
app.post("/register", function(req, res) {
	User.register(
		new User({username: req.body.username}),
		req.body.password,
		function(err, user) {
			if (err) {
				console.log(err);
				return res.render("register");
			}
			passport.authenticate("local")(req, res, function(){
				res.redirect("/campgrounds");
			});
		}
	);
});
app.get("/login", function(req, res) {
	res.render("login");
});
app.post("/login", passport.authenticate("local", {
	successRedirect: "/campgrounds",
	failureRedirect: "/login",
}));
app.get("/logout", function(req, res) {
	req.logout();
	res.redirect("/campgrounds");
});


app.listen(3000, function() {
	console.log("The YelpCamp server has started");
});
