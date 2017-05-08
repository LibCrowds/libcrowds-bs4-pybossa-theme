'use strict';
 
const webpack = require('webpack'),
      path    = require('path');
 
 
let config = {
    entry: {
        editor: path.resolve("./static/js/src/editor.js")
    },
    output: {
        path: path.resolve("./static/js/dist"),
        filename: "[name]-bundle.js",
      },
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                loader: 'babel-loader'
            },
            {
                test: /pnotify\.js/,
                loader: 'imports?global=>window,this=>window'
            }
        ]
    },
    plugins: [
        new webpack.ProvidePlugin({   
            jQuery: 'jquery',
            $: 'jquery',
            jquery: 'jquery'
        })
    ]
};
 
module.exports = config;