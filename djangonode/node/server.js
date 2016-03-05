var http = require('http');
var server = http.createServer().listen(3000);
var io = require('socket.io').listen(server);
var querystring = require('querystring');

io.on('connection', function(socket){
    console.log("Conectado al socket");
    
    socket.emit('test',{'prueba':'Hola'});
});