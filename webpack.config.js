'use strict';
 
var webpack = require('webpack');
 
 
let config = {
    entry: {
        main: "./static/js/src/main.js",
        editor: "./static/js/src/editor.js"
    },
    output: {
        path: "./static/js/dist",
        filename: "[name]-bundle.js",
      },
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                loader: 'babel-loader'
            },
            {
                test: /pnotify\.js/,
                loader: 'imports?global=>window,this=>window'
            }
        ]
    },
    plugins: [
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        }),
        new webpack.ProvidePlugin({   
            jQuery: 'jquery',
            $: 'jquery',
            jquery: 'jquery'
        })
    ]
};
 
module.exports = config;