$(document).ready(function(){
	console.log("I am loaded");
	

	$('.chat-wrapper').hide();
	//$('.sign').hide();


	$('#tog').click(function(){
		$('.people-online').slideToggle(300);
	});



	var socket = io.connect();

	var reg = $('#reg');
	var regu = $('#reg-user');

	// Add user
	reg.submit(function(e){
		e.preventDefault();
		socket.emit('new-user', regu.val());
			$('.sign').hide();
			$('.chat-wrapper').show();
			//$('.error').html("Username has already been taken");
		//regu.val() = "";
	});

	socket.on('usernames', function(data){
		var temp = '';
		for (var i = 0; i < data.length; i++) {
			temp += "<li class='people'>" + "<p class='person'>" + data[i] + "</p>" +  "<p class='online'>" +  "</p>" +  "</li>";
		}
		$('.list').html(temp);
	});


	// Start chat
	var send = $('#send');
	var input = $('#send-text');
	var box = $('.holder');


	send.submit(function(e){
		e.preventDefault();
		socket.emit('send-message', input.val());
		input.val('');
	});

	socket.on('new-message', function(data){
		console.log(data);
		var time = new Date().toString();

		var fit = '';
		for (var i in data) {
			fit += "<div class='message-container'>" + "<div class='chat-meta'>" + "<img src='/img/dogs.jpg'>" + "<div class='details'>" + "<h1 class='title name'>"  + data.user + "</h1>" + "<p class='sent-message'>" + data.msg + "</p>" + "<p class='sent-message'>" + time + "</p>" + "</div>" + "</div>" + 
			"</div>";
		}
		
		$('.holder').append(fit);

	});
	$('.holder').scrollTop(100000000000);

});
