const webpack = require('webpack');

module.exports = {
    watch:   true,
    devtool: 'cheap-eval-source-map',
    plugins: [
        new webpack.OldWatchingPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin(),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': '"development"',
        })
    ]
};