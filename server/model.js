var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ReviewSchema = new Schema({
  title: {
    type: String
  },
  date: {
    type: Date
  },
  rating: {
    type: Number, min:0, max:5
  },
  comment: {
  	type: String
  },
  poster: {
  	type: String
  },
  tomatoRev: {
    type: String
  },
  tomatoRating: {
    type: String
  },
  tomatoURL: {
    type: String
  }
});

var Review = mongoose.model('Review', ReviewSchema);
module.exports = Review;