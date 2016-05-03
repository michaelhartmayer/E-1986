// Setup basic express server
var express = require('express');
var app     = express();
var server  = require('http').createServer(app);
var io      = require('socket.io')(server);
var port    = process.env.PORT || 9815;

// Routing
app.use(express.static(__dirname + '/dist'));

/* DEV */
const users = {
    'Pawn':     'test',
    'Knight':   'test',
    'Rook':     'test',
    'King':     'test',
    'Queen':    'test',
    'Bishop':   'test',
    'Joker':    'test',
    'Master':   '12345'
};

// connection manager
class ConnectionManager {
    constructor ({ limit = 20 }) {

    }
}

// connection
class Connection {
    constructor (sck) {
        this.id  = sck.id;
        this.sck = sck;
    }

    disconnect () {
        this.sck.close();
    }

    emit (channel, message) {
        this.sck.emit(channel, message);
    }
}

// session
class UserSession {
    constructor () {
        this.id  = 0 | Math.random() * 999999999;
        this.ttl = 60 * 60 * 24; // 1 day
        this.ts  = new Date().getTime();
    }

    isValid () {
        const expiration = this.ts + this.ttl;
        const now        = new Date().getTime();

        if (expiration > now) return true;
        return false;
    }

    getId () {
        return this.id;
    }
}

// login
const login = credentials => {
    const { username, password } = credentials;
    if (users[username] && users[username] === password) return new UserSession();

    return false;
};

// http listen
server.listen(port, function () {
    console.log('Server listening at port %d', port);
});