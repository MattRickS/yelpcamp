const mongoose = require("mongoose"),
	  Campground = require("./models/campground"),
	  Comment = require("./models/comment");


var seedCampgrounds = [
    {
        name: "Cloud's Rest",
        image: "https://farm4.staticflickr.com/3795/10131087094_c1c0a1c859.jpg",
        description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum"
    },
    {
        name: "Desert Mesa",
        image: "https://farm6.staticflickr.com/5487/11519019346_f66401b6c1.jpg",
        description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum"
    },
    {
        name: "Canyon Floor",
        image: "https://farm1.staticflickr.com/189/493046463_841a18169e.jpg",
        description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum"
    }
]


// function seedDB() {
// 	Campground.remove({}, function(err) {
// 		if (err) {
// 			console.log(err);
// 		} else {
// 			console.log("Removed all campgrounds");
// 		}
// 		seedCampgrounds.forEach(function(seed) {
// 			Campground.create(seed, function(err, campground) {
// 				if (err) {
// 					console.log(err);
// 				} else {
// 					console.log("Added a campground");
// 					Comment.create({
// 						text: "This place is great, but I wish there was internet",
// 						author: "Homer"
// 					}, function(err, comment) {
// 						if (err) {
// 							console.log(err);
// 						} else {
// 							campground.comments.push(comment);
// 							campground.save(function(err) {
// 								if (err) {
// 									console.log(err);
// 								}
// 							});
// 							console.log("Created new comment");
// 						}
// 					})
// 				}
// 			})	
// 		});
// 	});
// }


// More modern syntax using promises
async function seedDB() {
	try {
		await Campground.deleteMany({})
		console.log("Removed all campgrounds");
		await Comment.deleteMany({});
		console.log("Removed all comments");
		// for (const seed of seedCampgrounds) {
		// 	let campground = await Campground.create(seed);
		// 	let comment = await Comment.create({
		// 		text: "This place is great, but I wish there was internet",
		// 		author: "Homer"
		// 	});
		// 	campground.comments.push(comment);
		// 	campground.save();
		// 	console.log("Created campground with comment");
		// }
	} catch (err) {
		console.log(err);
	}
}

module.exports = seedDB;
