var http = require('http');
var express = require('express');
var path = require('path');
var logger = require('morgan');
var bodyParser = require('body-parser');

var app = express();

var server = http.createServer(app).listen(3000);
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


io.sockets.on('connection', function(socket){
	socket.on('send-message', function(data){
		io.sockets.emit('new-message', {msg : data});
	});
});