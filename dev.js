require('colors');

const cp     = require('child_process');
const spawn  = cp.spawn;

const log = m => console.log('*** '.green.bold, m);

console.log('\n---------------- ---------------- ----------------');

log('-[ E-1986 ]-'.bold.yellow);

log('Starting Webpack'.bold.white);
const webpack = spawn('webpack', ['--dev'], { stdio: 'inherit' });

log('Starting Server [port: 9123]'.bold.white);
const server = spawn('node', ['server.js'], { stdio: 'inherit' });

log('Opening in Browser'.bold.white + ' http://localhost:9815'.bold.yellow);
const browser = spawn('open', ['http://localhost:9815/']);

webpack.on('error', err => log('Unable to start Webpack.'.red));
server.on('error',   err => log('Unable to start game Server'.red));
browser.on('error', err => log('Unable to open http://localhost:9815'.red));

process.on('exit', function() {
  console.log('killing', children.length, 'child processes');
  [webpack, server, browser].forEach(function (child) {
    child.kill();
  });
});

console.log('---------------- ---------------- ----------------\n');