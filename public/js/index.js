$(document).ready(function(){
	console.log("I am loaded");
	$('.holder').scrollTop(1000000);

	$('#tog').click(function(){
		$('.people-online').slideToggle(300);
	});
});








