const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

// MIDDLEWARE
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(express.static('public'));

MongoClient.connect('mongodb://crud_db:minhluan@ds045882.mlab.com:45882/crud_db', (err, database) => {

	// Return err and stop server
	if(err) return console.log(err);
	
	db = database;
	const PORT = process.env.PORT || 3000;
	app.listen(PORT, () => {
		console.log('listening on 3000');
	});
	
	// POST /quotes
	app.get('/', (req, res) => {
		var cursor = db.collection('quotes').find();
		cursor.toArray((err, result) => {
			if(err) return console.log(err);
			// Render index.ejs
			res.render('index', {quotes: result});
		});
	});
	
	// GET /quotes	
	app.post('/quotes', (req, res) => {
		db.collection('quotes').save(req.body, (err, result) => {
			if(err) return console.log(err);
			
			console.log('saved to database');
			
			res.redirect('/');
			
		});
		
	});

	// PUT /quotes
	app.put('/quotes', (req, res) => {

		db.collection('quotes').findOneAndUpdate({
			name: 'Cao Cao'
		}, {
			$set: {
				name: req.body.name,
				quote: req.body.quote
			}
		}, {
			sort: {
				_id: -1
			},
			upsert: true
		}, (err, result) => {
			if(err) return res.send(err);
			res.send(result);
		});
	});
	
	// DELETE /quotes
	app.delete('/quotes', (req, res) => {
		db.collection('quotes').findOneAndDelete({
		"_id": new mongodb.ObjectId(req.body.id)
		}, (err, result) => {
			if(err) return res.send(500, err);
			res.send(result);
		});
	});
	
});


