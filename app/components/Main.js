var React = require('react');
var Router = require('react-router');

var Main = React.createClass({

	render: function() {

		return (
			<div className="main-container">
				<nav className="navbar navbar-inverse" id="navBar">
  					<div className="container-fluid">
  						<ul className="list-unstyled">
  							<li className="navbar-text navbar-right" id="menuItem1">
  							<h4><a href="#/search" className="navbar-link">Search</a></h4></li>
  							<li className="navbar-text navbar-right" id="menuItem2">
                    		<h4><a href="#/reviews" className="navbar-link">Reviews</a></h4></li>
  						</ul>
    					<div className="navbar-header">

     					
    					</div>
  					</div>
				</nav>	
				<div className="jumbotron">	
					<div className="description">
						<div className="night-hotel">MOVIE - ME</div>
					</div>
				</div>
				<div className="container">

					{this.props.children}
			
				</div>
				<div className="row">
					<div className="col-md-12" id="bottomRow">
					</div>
				</div>

			</div>

		)
	}

})

module.exports = Main;