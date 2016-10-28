// Include Server Dependencies
var express = require('express');
var bodyParser = require('body-parser');
var logger = require('morgan');
var mongoose = require('mongoose');

var Review = require('./server/model.js');

var app = express();
var PORT = process.env.PORT || 3000;

// Run Morgan for Logging
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.text());
app.use(bodyParser.json({type:'application/vnd.api+json'}));

app.use(express.static('./public'));

// MongoDB Configuration configuration
mongoose.connect('mongodb://localhost/movies');
var db = mongoose.connection;

db.on('error', function (err) {
	console.log('Mongoose Error: ', err);
});

db.once('open', function () {
	console.log('Mongoose connection successful.');
});

//app.get('*', function (request, response){
  //response.sendFile(path.resolve(__dirname, 'public', 'index.html'))
//})

app.get('/', function(req, res){
	res.sendFile('./public/index.html');
})

app.post('/api/saved', function(req, res){

	Review.create({"title": req.body.title, "date": Date.now(), "rating": req.body.rating, "comment": req.body.comment, "poster": req.body.poster}, function(err, review) {
		if(err){
			console.log(err);
		}
		else{
			console.log(review);
		}
	})
});

app.get('/api/saved', function(req, res) {
	Review.find({})
		.sort({ rating: -1 })
		.limit(10)
		.exec(function(err, doc){
			if(err) {
				console.log(err);
			}
			else {
				res.json(doc);
			}
		})
});

app.listen(PORT, function() {
	console.log("App listening on PORT: " + PORT);
});