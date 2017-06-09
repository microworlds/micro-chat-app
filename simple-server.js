var http = require('http');

var port = 9000;

var server = http.createServer(function(req, res){
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('<h1>Hello GDG</h1>');
});

server.listen(port, function(){
  console.log("Server running on port " + port);
});