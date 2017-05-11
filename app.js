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

var users = [];
io.sockets.on('connection', function(socket){
	console.log("A user has connected");
	
	var username = "";
	socket.on('request-users', function(){
		socket.emit('users', {users: users});
	});

	socket.on('message', function(data){
		io.emit('message', {username: username, message: data.message});
	});

	socket.on('add-user', function(data){
		if (users.indexOf(data.username) == -1) {
			io.emit('add-user', {username : data.username});
			username = data.username;
			users.push(data.username)
		} else {
			socket.emit('prompt-username', {message : "Username already exists"});
		}
	});

	socket.on('disconnect', function(){
		console.log(username + " has disconnected");
		users.splice(users.indexOf(username), 1);
		io.emit('remove-user', {username : username});
	});


});
