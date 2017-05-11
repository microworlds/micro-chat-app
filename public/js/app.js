var app = angular.module('app', ['btford.socket-io']);

app.factory('Socket', function (socketFactory) {
  return socketFactory();
})


app.controller('main', ['$scope', 'Socket', function($scope, Socket){
	console.log("Main controller");
	

	Socket.connect();
	$scope.users = [];
	$scope.messages = []; 

	/* Emmissions */
	function check (){
		var name = prompt("Enter your username");
		if (name != null) {
			Socket.emit('add-user', {username : name})
		}
	}
	
	check();

	$scope.sendMessage = function (msg){
		if (msg != null && msg != ""){
			
			Socket.emit('message', {message: msg});
		}
		$scope.msg = "";
	}

	// Run add user function


	$scope.time = new Date().toString();

	// Request active users on the channel
	Socket.emit('request-users', {});

	
	/* Emit responses */
	Socket.on('users', function(data){
		$scope.users = data.users;
	});

	Socket.on('message', function(data){
		$scope.messages.push(data);
	});

	
	Socket.on('add-user', function(data){
		$scope.users.push(data.username);
		$scope.messages.push({username: data.username, message: " has joined the chat"});
	});

	Socket.on('remove-user', function(data){
		$scope.users.splice($scope.users.indexOf(data.username), 1);
		$scope.messages.push({username: data.username, message: " has left the chat"});
	});
	

	Socket.on('prompt-username', function(data){
		addUser(data.message);
	});

	
	$scope.$on('$locationChangeStart', function(event){
		Socket.disconnect(true);
	});

}]);

