var webpack = require('webpack');

module.exports = {
    entry: "./static/js/main.js",
    output: {
        path: "./assets/js/gen",
        filename: "bundle.min.js"
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                query: {
                    presets: ['es2015']
                }
            }
        ]
    },
    plugins: [
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery"
        })
    ]
};