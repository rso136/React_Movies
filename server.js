var express = require('express');
var bodyParser = require('body-parser');
var logger = require('morgan');
var mongoose = require('mongoose');

var Review = require('./server/model.js');

var app = express();
var PORT = process.env.PORT || 3000;

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.text());
app.use(bodyParser.json({type:'application/vnd.api+json'}));

app.use(express.static('./public'));

mongoose.connect('mongodb://heroku_0nr1bsj4:4eegk8mdbgaajo6jg67bsq4bla@ds137197.mlab.com:37197/heroku_0nr1bsj4');
//mongoose.connect('mongodb://localhost/movies');
var db = mongoose.connection;

db.on('error', function (err) {
	console.log('Mongoose Error: ', err);
});

db.once('open', function () {
	console.log('Mongoose connection successful.');
});

app.get('/', function(req, res){
	res.sendFile('./public/index.html');
})

app.post('/api/saved', function(req, res){

	Review.create({"title": req.body.title, "date": Date.now(), "rating": req.body.rating, "comment": req.body.comment, "poster": req.body.poster, "tomatoRev": req.body.tomatoRev, "tomatoRating": req.body.tomatoRating, "tomatoURL": req.body.tomatoURL}, function(err, review) {
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

app.delete('/api/saved', function(req, res){

	var id = req.param("id");

	Review.find({"_id": id}).remove().exec(function(err, data){
		if(err){
			console.log(err);
		}
		else {
			res.send("Deleted");
		}
	})


})

app.listen(PORT, function() {
	console.log("App listening on PORT: " + PORT);
});