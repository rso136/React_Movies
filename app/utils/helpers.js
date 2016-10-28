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

	postReview: function(title, rating, comment, poster) {

		var newReview = {title: title, rating: rating, comment: comment, poster: poster};
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
	}
}

module.exports = helpers;