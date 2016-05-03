const webpack   = require('webpack');
const path      = require('path');
const dm        = require('deep-merge/multiple');
const args      = require('minimist')(process.argv.slice(2));

// server-side webpack
var fs          = require('fs');
var nodeModules = {};
fs.readdirSync('node_modules')
    .filter(function(x) {
        return ['.bin'].indexOf(x) === -1;
    })
    .forEach(function(mod) {
        nodeModules[mod] = 'commonjs ' + mod;
    });

// path
const srcPath   = path.resolve(__dirname, 'src');
const distPath  = path.resolve(__dirname, 'dist');

// base config
const webpackBaseConfig = {
    root:               `${srcPath}`,
    moduleDirectories:  ['node_modules'],

    externals: nodeModules,
    context:   distPath,

    resolve: {
        extensions: ['', '.js', '.jsx']
    },

    entry: {
        'server': `${srcPath}/server.js`
    },

    target: 'node',

    output: {
        path:     distPath,
        filename: '[name].js'
    },

    module: {
        preLoaders: [
            {
                test: /\.(js|jsx)$/,
                include: srcPath,
                loader: 'eslint'
            }
        ],

        loaders: [
            {
                test:   /\.less$/,
                loader: 'style!css!less'
            },
            {
                test: /\.(jpg|png|gif|bmp|tif)$/,
                loader: 'file'
            },
            {
                test:    /\.(js|jsx)$/,
                loader:  'babel',
                exclude: /node_modules/
            }
        ]
    },

    plugins: [
        new webpack.DefinePlugin({
            __dirname: '"' + distPath + '"'
        }),
    ]
};

// env config
var webpackEnvConfig = {};

// grab config depending on environment
if (args['dev'])
    webpackEnvConfig = require('./cfg/dev.webpack.config.js');
else if (args['dist'])
    webpackEnvConfig = require('./cfg/dist.webpack.config.js');

// deep merge strategy
const merge = dm((target, source, key) => [].concat(target, source));

// export config
module.exports = merge([
    webpackBaseConfig,
    webpackEnvConfig
]);