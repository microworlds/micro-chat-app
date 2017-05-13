var http = require('http');
var express = require('express');
var path = require('path');
var logger = require('morgan');
var bodyParser = require('body-parser');

var app = express();
var port = process.env.PORT || 3000;

var server = http.createServer(app).listen(port);
var io = require('socket.io').listen(server);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));


app.get('/', function(req, res){
	res.render('index', {title: "Microworlds Chat"});
});

var usernames = [];
io.sockets.on('connection', function(socket){
	console.log("User has connected");
	
	socket.on('new-user', function(data){
		console.log(data);
		if (usernames.indexOf(data) != -1) {
			return false;
		}
		socket.username = data;
		usernames.push(socket.username);
		updateUsernames();
	});

	function updateUsernames(){
		io.sockets.emit('usernames', usernames);
	}


	socket.on('send-message', function(data){
		console.log(data);
		io.sockets.emit('new-message', {msg : data, user : socket.username});
	});

	socket.on('disconnect', function(data){
		if (!socket.username) {
			return;
		} else {
			usernames.splice(usernames.indexOf(socket.username), 1);
			updateUsernames();
		}
	});

});

