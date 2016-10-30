var React = require('react');
var Router = require('react-router');

var helpers = require('../utils/helpers');

var Reviews = React.createClass({

	getInitialState: function(){
		return {
			reviews: ""
		}
	},

	componentDidMount: function(){

		helpers.getReviews()
			.then(function(reviewData){
				this.setState({
					reviews: reviewData.data
				});
				console.log("saved reviews", reviewData.data);
			}.bind(this))
	},

	render: function() {

		if (this.state.reviews == "") {
			return(

				<div className="row">
					<div className="col-xs-8 col-xs-offset-4 col-md-6 col-md-offset-5" id="noReviews">
						<h4>No Reviews Submitted</h4>
					</div>
				</div>	
			)

		}
		else {

			var reviews = this.state.reviews.map(function(review, index){

				return (

					<div key={index}>
						<div className="row">
							<div className="reviewBoxes col-xs-10 col-xs-offset-1 col-md-8 col-md-offset-2">
								<img className="reviewPosters" src={review.poster} height="100" width="75"></img>
								<h4><li>{review.title}</li></h4>
								<h5>User Review: <i>"{review.comment}"</i></h5>
								<h5>Rating: {review.rating} stars</h5>
							</div>
						</div>
					</div>
				)
			}.bind(this))
		}

		return (

			<div className="main-container">
				<div className="row">
					<div className="col-xs-10 col-xs-offset-1 col-md-8 col-md-offset-2">
						<h3 id="reviewHeading"><b>TOP REVIEWS</b></h3>
						<br></br>
					</div>
				</div>
				<div id="listContainer">	
					<ol>
						{reviews}
					</ol>
				</div>	
			</div>	

		)
	}
})

module.exports = Reviews;