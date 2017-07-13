// Load dependencies
var http = require('http');
var express = require('express');
var path = require('path');
var logger = require('morgan');
var bodyParser = require('body-parser');
var mongojs = require('mongojs');
var db_url = "mongodb:127.0.0.1:27017/mobile-chat-app";
var db = mongojs(db_url, []);



// Instantiate the express module
var app = express();
var api = require('./routes/api');

// Define port
var port = process.env.PORT || 4000;

// Create the server and pass it to the socket
var server = http.createServer(app).listen(port, function(){
	console.log("Server running on port " + port);
});
var io = require('socket.io').listen(server);

// View engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// Handle CORS
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

// Register middlewares 
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

// Let's hit the home page
app.get('/', function(req, res){
	res.render('index', {title: "Microworlds Chat"});
});

// Set up all routes middlewares
app.use('/api', api);








/* Socket Stuff */

// First connection event
io.sockets.on('connection', function(socket){
	console.log("A user has connected!");
	console.log(socket.id);
	
	// Add user to the chat usernames array list
	socket.on('new-user', function(data){
		console.log(data);
		if (usernames.indexOf(data) != -1) {
			return false;
		}
		socket.username = data;
		usernames.push(socket.username);
		updateUsernames();
	});

	// Update the usernames array and send it back to the client
	function updateUsernames(){
		io.sockets.emit('usernames', usernames);
	}

	// Receive and respond to messages 
	socket.on('send-message', function(data){
		//console.log(data);
		io.sockets.emit('new-message', {msg : data, user : socket.username});
	});

	// Disconnect a user and update the usernames array list
	socket.on('disconnect', function(data){
		if (!socket.username) {
			return;
		} else {
			usernames.splice(usernames.indexOf(socket.username), 1);
			updateUsernames();
		}
	});
});

































/*


// Load dependencies
var http = require('http');
var express = require('express');
var path = require('path');
var logger = require('morgan');
var bodyParser = require('body-parser');

// Instantiate the express module
var app = express();

// Define port
var port = process.env.PORT || 89;

// Create the server and pass it to the socket
var server = http.createServer(app).listen(port, function(){
	console.log("Server running on port " + port);
});
var io = require('socket.io').listen(server);

// View engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// Register middlewares 
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

// Let's hit the home page
app.get('/', function(req, res){
	res.render('index', {title: "Microworlds Chat"});
});

/* Socket Stuff */

// All the users on the chat
/*var usernames = [];

// First connection event
io.sockets.on('connection', function(socket){
	console.log("A user has connected!");
	
	// Add user to the chat usernames array list
	socket.on('new-user', function(data){
		console.log(data);
		if (usernames.indexOf(data) != -1) {
			return false;
		}
		socket.username = data;
		usernames.push(socket.username);
		updateUsernames();
	});

	// Update the usernames array and send it back to the client
	function updateUsernames(){
		io.sockets.emit('usernames', usernames);
	}

	// Receive and respond to messages 
	socket.on('send-message', function(data){
		//console.log(data);
		io.sockets.emit('new-message', {msg : data, user : socket.username});
	});

	// Disconnect a user and update the usernames array list
	socket.on('disconnect', function(data){
		if (!socket.username) {
			return;
		} else {
			usernames.splice(usernames.indexOf(socket.username), 1);
			updateUsernames();
		}
	});
});
*/