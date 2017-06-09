$(document).ready(function(){
	console.log("I am loaded");
	
	// Hide chat wrapper and allow user sign in
	$('.chat-wrapper').hide();

	// Toggle to see users online when on small screen
	$('#tog').click(function(){
		$('.people-online').slideToggle(300);
	});

	// Instantiate websocket to socket variable 
	var socket = io.connect();

	// Get the form and username variables
	var reg = $('#reg');
	var regu = $('#reg-user');

	// Add user to the chat
	reg.submit(function(e){
		e.preventDefault();
		
		socket.emit('new-user', regu.val());
		$('.sign').hide();
		$('.chat-wrapper').show();
		
	});

	// Receive all active users array from the server
	socket.on('usernames', function(data){
		var temp = '';
		for (var i = 0; i < data.length; i++) {
			temp += "<li class='people'>" + "<p class='person'>" + data[i] + "</p>" +  "<p class='online'>" +  "</p>" +  "</li>";
		}
		$('.list').html(temp);
	});

	// Get the chat area variables (send button, input value and container)
	var send = $('#send');
	var input = $('#send-text');
	var box = $('.holder');

	// Send (emit) message to the socket
	send.submit(function(e){
		e.preventDefault();
		socket.emit('send-message', input.val());
		input.val('');
	});

	// Receive broadcasted message from the socket
	socket.on('new-message', function(data){
		//console.log(data);
		//var get = new Date().getTime();
		
		var time = moment().startOf('second').fromNow();

		// Convert the response to an array for easy iteration
		var item = [data];

		// Iterate over all messages and render the view on the chat div
		var fit = '';
		for (var i = 0; i < item.length; i++) {
			fit += "<div class='message-container'>" + "<div class='chat-meta'>" + "<img src='/img/dogs.jpg'>" + "<div class='details'>" + "<h1 class='title name'>"  + item[0].user + "</h1>" + "<p class='sent-message'>" + item[0].msg + "</p>" + "<p class='sent-message time'>" + time + "</p>" + "</div>" + "</div>" + 
			"</div>";
		}
		
		// Append the messages to chat holder 
		$('.holder').append(fit);

	});

});