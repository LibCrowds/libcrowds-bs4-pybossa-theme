'use strict';

const webpack = require('webpack'),
      path    = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');

// pace-progress loader is a fix for https://github.com/HubSpot/pace/issues/328

let config = {
    entry: {
        main: "./_js/main.js"
    },
    output: {
        path: path.resolve("./static/dist/js"),        
        filename: "[name].bundle.js"
      },
    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader'
            },
            {
                test: require.resolve("pace-progress"), 
                loader: "imports-loader?define=>false" 
            }
        ]
    },
    plugins: [
        new webpack.ProvidePlugin({
            jQuery: 'jquery',
            $: 'jquery',
            jquery: 'jquery',
            Tether: 'tether'
        }),
        new HtmlWebpackPlugin({
            hash: true,
            inject: false,
            filename: path.resolve('./templates/base.html'),
            template: './templates/_base.webpack.html'
        })
    ]
};

module.exports = config;