const webpack   = require('webpack');
const path      = require('path');
const srcPath   = path.resolve(__dirname, 'src');
const distPath  = path.resolve(__dirname, 'dist');
const dm        = require('deep-merge/multiple');
const args      = require('minimist')(process.argv.slice(2));

// base config
const webpackBaseConfig = {
    root:               `${srcPath}`,
    moduleDirectories:  ['node_modules'],

    resolve: {
        extensions: ['', '.js', '.jsx']
    },

    entry: {
        'app': `${srcPath}/app.js`
    },

    output: {
        path:       `${distPath}/assets`,
        filename:   'ml.js',
        publicPath: './assets/'
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
                loader:  'react-hot!babel',
                exclude: /node_modules/
            }
        ]
    }
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