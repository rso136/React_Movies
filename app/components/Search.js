
// Include React and React-Router dependencies
var React = require('react');
var Router = require('react-router');

// Include the Query and Results componens
var Query = require('./Search/Query');
var Results = require('./Search/Results');

// Include the Helper (for the query)
var helpers = require('../utils/helpers');

var Search = React.createClass({

	getInitialState: function(){
		return {
			term: "",
			results: {}
		}
	},

	componentDidUpdate: function(prevProps, prevState){
		console.log('Component Updated');
		console.log(this.state.term);

		console.log("Previous State", prevState);
	
		if (this.state.term != "" && prevState.term != this.state.term) {

			helpers.runQuery(this.state.term)
				.then(function(data){
					if (data != this.state.results) 
					{
						this.setState({
							results: data
						})
						console.log('New state: ' + this.state.results);
					}
				}.bind(this))
		}
	},

	setQuery: function(newTerm) {

		this.setState({
			term: newTerm
		})
	},

	render: function(){
		console.log("Render results", this.state.results)

		return (

			<div className="main-container">

				<Query updateSearch={this.setQuery} />

				<Results results={this.state.results} />


			</div>

		)
	}

})

module.exports = Search;

