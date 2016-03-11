var app = angular.module('App',['angular-web-notification']);

app.config(function($interpolateProvider) { 
	$interpolateProvider.startSymbol('{$');
    $interpolateProvider.endSymbol('$}');
});


app.factory('socket', function($rootScope) {
    //var socket = io.connect('https://djangonode-joseomar94.c9users.io/:3000');
    var socket = io.connect('http://localhost:3000');

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


app.controller('AppCtrl', function ($scope,socket, webNotification) {

  

    
    socket.on('test', function(data){
        console.log(data.username);

        var username = data.username;

        webNotification.showNotification('Example Notification', {
                body: username,
                icon: 'my-icon.ico',
                onClick: function onNotificationClicked() {
                    console.log('Notification clicked.');
                },
                autoClose: 4000 //auto close the notification after 4 seconds (you can manually close it via hide function)
            }, function onShow(error, hide) {
                if (error) {
                    window.alert('Unable to show notification: ' + error.message);
                } else {
                    console.log('Notification Shown.');

                    setTimeout(function hideNotification() {
                        console.log('Hiding notification....');
                        hide(); //manually close the notification (you can skip this if you use the autoClose option)
                    }, 5000);
                }
            });

    });

    
});

