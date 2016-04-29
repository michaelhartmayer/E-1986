// Setup basic express server
var express = require('express');
var app     = express();
var server  = require('http').createServer(app);
var io      = require('socket.io')(server);
var port    = process.env.PORT || 9815;

server.listen(port, function () {
    console.log('Server listening at port %d', port);
});

// Routing
app.use(express.static(__dirname + '/dist'));

// Chatroom
io.on('connection', function (socket) {
    socket.on('new message', function (data) {
        // socket.broadcast.emit('new message', {
        //     username: socket.username,
        //     message: data
        // });
    });

    // when the client emits 'add user', this listens and executes
    socket.on('add user', function (username) {
        // socket.emit('login', {
        //     numUsers: numUsers
        // });

        // echo globally (all clients) that a person has connected
        // socket.broadcast.emit('user joined', {
        //     username: socket.username,
        //     numUsers: numUsers
        // });
    });

    // when the client emits 'typing', we broadcast it to others
    // socket.on('typing', function () {
    //     socket.broadcast.emit('typing', {
    //         username: socket.username
    //     });
    // });

    // when the client emits 'stop typing', we broadcast it to others
    // socket.on('stop typing', function () {
    //     socket.broadcast.emit('stop typing', {
    //         username: socket.username
    //     });
    // });

    // when the user disconnects.. perform this
    socket.on('disconnect', function () {
        // if (addedUser) {
        //     --numUsers;

        //     // echo globally that this client has left
        //     socket.broadcast.emit('user left', {
        //         username: socket.username,
        //         numUsers: numUsers
        //     });
        // }
    });
});