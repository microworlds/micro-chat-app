var express = require('express');
var router = express.Router();

var mongojs = require('mongojs');
var db_url = MONGODB_URI = "mongodb://127.0.0.1/mobile-chat-app"
var db = mongojs(db_url, ['users']);


router.get('/allUsers', function(req, res){
	db.users.find({}).toArray(function(err, data){
		if (err) console.log(err);
		res.json(data);
	});
});










module.exports = router;