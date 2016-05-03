require('colors');

const cp     = require('child_process');
const spawn  = cp.spawn;

const log = m => console.log('*** '.green.bold, m);

// candy
console.log('\n---------------- ---------------- ----------------');

// helper function to log stuff
log('-[ E-1986 ]-'.bold.yellow);

// start webpack
log('Starting Webpack'.bold.white);
const webpack       = spawn('webpack', ['--dev'], { stdio: 'inherit' });
const webpackServer = spawn('webpack', ['--dev', '--config',  'webpack.server.config.js'], { stdio: 'inherit' });

// start server
log('Starting Server [port: 9815]'.bold.white);
const server = spawn('nodemon', ['./dist/server.js'], { stdio: 'inherit' });

// start browser
log('Opening in Browser'.bold.white + ' http://localhost:9815'.bold.yellow);
const browser = spawn('open', ['http://localhost:9815/']);

// on error show error
webpack.on('error', err => log('Unable to start Webpack.'.red));
webpackServer.on('error', err => log('Unable to start Server Webpack.'.red));
server.on('error',   err => log('Unable to start game Server'.red));
browser.on('error', err => log('Unable to open http://localhost:9815'.red));

// kill processes on exit
process.on('exit', function() {
    [webpack, webpackServer, server, browser].forEach(function (child) {
        child.kill();
    });
});

// candy
console.log('---------------- ---------------- ----------------\n');