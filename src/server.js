require('colors');

const path = require('path');
const fs   = require('fs');

// express server
const express = require('express');
const app     = express();
const server  = require('http').createServer(app);
const io      = require('socket.io')(server);
const port    = process.env.PORT || 9815;

// dev users
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

// log helpers
const log   = (...args) => console.log.apply(null, ['->'.bold.white, ...args]);
const error = (...args) => console.log.apply(null, ['-E'.bold.red, ...args]);

// connection manager
class ConnectionManager {
    constructor ({ io = null, limit = 20 }) {
        this.cLimit  = limit;
        this.cActive = 0;
        this.cList   = [];


        if (!io) return error('Unable to start ConnectionManager - need io');
        
        io.on('connection', sck => this.handleConnect(sck));
        log('ConnectionManager started.');
    }

    handleConnect (sck) {
        const c      = new Connection(sck);
        const { id } = sck;

        // bind disconnect
        c.onDisconnect(c => this.handleDisconnect(c));
        this.register(c);

        // log
        log(`${id.bold} - Client Connected`);
    }

    handleDisconnect (c) {
        this.unregister(c);
        log(`${c.getId().bold} - Client Disconnected`);
    }

    register (c) {
        this.cList.push(c);
    }

    unregister (c) {
        this.cList = this.cList.filter(i => c === i ? false : i);
    }
}

// connection
class Connection {
    constructor (sck) {
        this.id  = sck.id;
        this.sck = sck;
    }

    onDisconnect (fn) {
        this.sck.on('disconnect', () => fn(this));
    }

    disconnect () {
        this.sck.close();
    }

    emit (channel, message) {
        this.sck.emit(channel, message);
    }

    broadcast (channel, message) {
        this.sck.broadcast.emit(channel, message);
    }

    getId () {
        return this.id;
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

new ConnectionManager({ io });

// login
const login = credentials => {
    const { username, password } = credentials;
    if (users[username] && users[username] === password) return new UserSession();

    return false;
};

// http listen
server.listen(port, function () {
    log(`http server listening at port ${port.toString().bold}`);
});

// routing
app.use(express.static(__dirname));
// app.get('*', (req, res) => {
//     var uri;
//     var file;

//     console.log(req)

//     uri  = req.params[0];
//     file = path.join(__dirname, uri);

//     if (fs.existsSync(file) && fs.statSync(file).isFile()) {
//         res.sendFile(file);
//         log('http', '200'.white, uri);
//     }

//     else {
//         res.status(404).send('404 - Resource Not Found');
//         log('http', '404'.red, uri);
//     }
// });





