var React = require('react');
var Router = require('react-router');

var helpers = require('../../utils/helpers');

var Results = React.createClass({

	getInitialState: function(){
		return {
			rating: "",
			comment: "",
		}

	},

	handleChange: function(event) {

		var newState = {};
    	newState[event.target.id] = event.target.value;
    	this.setState(newState);

	},

	handleSubmit: function() {
		console.log("CLICK");
		console.log(this.state.rating);
		console.log(this.state.comment);

		var userRating = this.state.rating;
		var userComment = this.state.comment;
		var title = this.props.results.Title;
		var poster = this.props.results.Poster;

		helpers.postReview(title, userRating, userComment, poster)
			.then(function(data){
				console.log(data);
			}.bind(this))
	},

	render: function() {

		if (!this.props.results.hasOwnProperty('Title')) {

			return (

				<div className="row">
					<div className="col-md-6 col-md-offset-3" id="noResult">
						<h4>No Current Results</h4>
					</div>
				</div>
			)
		}
		else {

		var moviePoster = this.props.results.Poster	
		var movieTitle = this.props.results.Title
		var moviePlot = this.props.results.Plot
		var movieActors = this.props.results.Actors
		var movieYear = this.props.results.Year
		var movieRated = this.props.results.Rated
		console.log('Movie info: ' + this.props.results.Title);

			return (
				<div className="row">
					<div className="col-md-6 col-md-offset-3" id="resultBox">
					<br></br>
					<form id="movieForm">
					<div className="form-group">
						<img className="poster img-rounded" src={moviePoster} height="300" width="200"></img> 	
						<h3><b>{movieTitle}</b></h3>
						<hr></hr>
						<h5><b>Summary:</b> <i>{moviePlot}</i></h5>
						<h5><b>Actors:</b> {movieActors}</h5>
						<h5><b>Rated:</b> {movieRated}</h5>
						<h5><b>Release Year:</b> {movieYear}</h5>
						<div className="rateSelect col-xs-3">
							<label>Your Rating:</label>
							<select className="form-control" id="rating" onChange={this.handleChange}>
								<option value="1">1 star</option>
								<option value="2">2 stars</option>
								<option value="3">3 stars</option>
								<option value="4">4 stars</option>
								<option value="5">5 stars</option>
							</select>
						</div>	
						<textarea className="form-control" rows="4" name="review" id="comment" onChange={this.handleChange} placeholder="Submit your own movie review"></textarea>
					</div>
							<button type="submit" className="btn btn-customB" onClick={this.handleSubmit}>SUBMIT</button>
						</form>
					</div>
				</div>
			)		

		}

	}
});

module.exports = Results;