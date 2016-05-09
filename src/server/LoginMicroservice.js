import IOMicroservice from './IOMicroservice';

const io = require('socket.io')(8090);

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

// var io = require('socket.io')(3000);
// var redis = require('socket.io-redis');
// io.adapter(redis({ host: 'localhost', port: 6379 }));

class LoginMicroservice extends IOMicroservice {
}

export default LoginMicroservice;