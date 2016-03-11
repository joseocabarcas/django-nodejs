var Io = require('socket.io'),
    redis = require('redis'),
    cookie = require('cookie'),
    serialize = require('node-serialize'),
    clientRedis = redis.createClient();

var http = require('http');
var server = http.createServer().listen(3000);



var Socket = function (config) {
    this.io = Io.listen(server);
};

Socket.prototype.run = function(){
    var self = this;

    this.io.use(function (socket, next) {
        self.auth(socket,next);
    });

    this.io.sockets.on('connection', function (socket) {
        console.log("Conectado al socket");
        socket.broadcast.emit('test', socket.handshake.user);
    });
};

Socket.prototype.auth = function (socket, next) {
    var userCookie = cookie.parse(socket.request.headers.cookie);
    var sessionUser ='session:'+ userCookie.sessionid;
    console.log(sessionUser);
    clientRedis.get(sessionUser, function(e,session){

        if ( e || !session) {
            console.log("error");
            return next(Error('Not authorizes'));
        }
        session = serialize.unserialize(session);
        socket.handshake.user = session;
        next()

    });
};

// run server as stand alone
if(module.parent){
    // export module
    module.exports = Socket;
}else{
    var socket = new Socket();
    socket.run();
}

/*


var http = require('http');
var server = http.createServer().listen(3000);
var io = require('socket.io').listen(server);


io.on('connection', function(socket){
    console.log("Conectado al socket");
    
    socket.emit('test',{'prueba':'Hola'});
});
    */