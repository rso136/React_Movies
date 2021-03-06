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

	handleClick: function(item, event){

		helpers.deleteReview(item._id)
			.then(function(data){

			helpers.getReviews()
				.then(function(reviewData){
					this.setState({
						reviews: reviewData.data
					});
					console.log("saved reviews", reviewData.data);
				}.bind(this))
			
			}.bind(this))		

	},

	render: function() {

		if (this.state.reviews == "") {
			return(

				<div className="row">
					<div className="col-xs-12 col-md-6 col-md-offset-5" id="noReviews">
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
							<div className="reviewBoxes col-xs-12 col-xs-offset-0 col-md-8 col-md-offset-2">
								<div className="col-xs-12 col-md-3 reviewPosterButton">			
									<a href={review.tomatoURL} target="_blank"><img className="reviewPosters img-fluid" src={review.poster} height="180" width="140"></img></a>
								<button className="btn btn-customC" type="button" onClick={this.handleClick.bind(this, review)}>Remove Review</button>
								</div>	
								<div className="reviewColumn col-xs-12 col-md-9">
									<h4><b>{review.title}</b></h4>
									<h5><b>User Review:</b> <i>"{review.comment}"</i></h5>
									<h5><b>User Rating:</b> {review.rating} stars</h5>
									<h5><b>Tomato Consensus:</b> <i>"{review.tomatoRev}"</i></h5>
									<h5><b>Tomato Rating:</b> {review.tomatoRating} out of 10</h5>
									<input type="hidden" value={review._id} />
									
								</div>
							</div>
						</div>
					</div>
				)
			}.bind(this))
		}

		return (

			<div className="main-container">
				<div className="row">
					<div className="col-xs-10 col-xs-offset-1 col-md-8 col-md-offset-2" id="reviewHeading">
						<h3><b>TOP REVIEWS</b></h3>
						<br></br>
					</div>
				</div>
				<div id="listContainer">	
					
						{reviews}
					
				</div>	
			</div>	

		)
	}
})

module.exports = Reviews;