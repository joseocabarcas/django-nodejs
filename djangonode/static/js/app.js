var app = angular.module('App',[]);

app.config(function($interpolateProvider) { 
	$interpolateProvider.startSymbol('{$');
    $interpolateProvider.endSymbol('$}');
});


app.factory('socket', function($rootScope) {
    var socket = io.connect('https://djangonode-joseomar94.c9users.io/:3000');
    return {
        on: function(eventName, callback) {
            socket.on(eventName, function() {
                var args = arguments;
                $rootScope.$apply(function() {
                    callback.apply(socket, args);
                });
            });
        },
        emit: function(eventName, data, callback) {
            socket.emit(eventName, data, function() {
                var args = arguments;
                $rootScope.$apply(function() {
                    if(callback) {
                        callback.apply(socket, args);
                    }
                });
            });
        }
    };
});


app.controller('AppCtrl', function ($scope,socket) {

  

    
    socket.on('test', function(data){
        console.log(data);
    });

    
})