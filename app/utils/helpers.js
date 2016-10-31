var axios = require('axios');

var helpers = {

	runQuery: function(term) {

		var term = term.trim();

		return axios.get('http://www.omdbapi.com/?t=' + term +'&y=&plot=short&tomatoes=true&r=json')
			.then(function(results){
				console.log('Axios results', results);

				return results.data

			})
	},

	postReview: function(title, rating, comment, poster, tomatoRev, tomatoRating, tomatoURL) {

		var newReview = {title: title, rating: rating, comment: comment, poster: poster, tomatoRev: tomatoRev, tomatoRating: tomatoRating, tomatoURL: tomatoURL};
		return axios.post('/api/saved', newReview)
			.then(function(results){
				console.log(results);
			})
	},

	getReviews: function() {

		return axios.get('/api/saved')
			.then(function(results){
				console.log('axios results', results);
				return results;
			})
	},

	deleteReview: function(id){

		return axios.delete('/api/saved', {
			params: {
				'id': id
			}
		})
		.then(function(results){
			console.log('axios delete results', results);
			return results;
		})
	}
}

module.exports = helpers;