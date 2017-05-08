/*var app = angular.module('app', [])

app.controller('mainCtrl', function($scope, $http){
	console.log("Main controller");
});

*/

$(document).ready(function(){
	console.log("I am loaded");

	var socket = io.connect();
	var send = $('#send');
	var input = $('#input');
	var box = $('#box');

	send.submit(function(e){
		e.preventDefault();
		socket.emit('send-message', input.val());
		input.val('');
	});

	socket.on('new-message', function(data){
		box.append("<div class='box'>" + data.msg + "</div>" + "<br>");
		box.scrollTop(1000000);
	});



});