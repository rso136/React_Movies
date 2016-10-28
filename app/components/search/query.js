var React = require('react');

var Query = React.createClass({

	getInitialState: function() {
		return {
			search: ""
		}

	},

	handleChange: function(event) {

		var newState = {};
		newState[event.target.id] = event.target.value;
    	this.setState(newState);
	},

	handleSubmit: function(){
		console.log("Click");
		this.props.updateSearch(this.state.search);
		return false;

	},

	render: function() {

		return (
			<div className="main-container">

				<div className="row">
					<div className="col-md-6 col-md-offset-3">
						<form>
							<div className="form-group">
								<input type="text" value={this.state.value} className="form-control" id="search" placeholder="Search for a movie" onChange= {this.handleChange} required />
							</div>
							<button type="button" className="btn btn-custom" onClick={this.handleSubmit}>FIND</button>
						</form>	
					</div>
				</div>

			</div>

		)

	}

});

module.exports = Query;