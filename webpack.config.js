'use strict';

const webpack = require('webpack'),
      path    = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');

let config = {
    entry: {
        main: "./static/js/main.js",
        editor: "./static/js/editor.js"
    },
    output: {
        path: path.resolve(__dirname, 'static/dist/js'),
        filename: "[name].bundle.js",
      },
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                loader: 'babel-loader'
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
            filename: path.resolve(__dirname, 'templates/base.html'),
            template: path.resolve(__dirname, 'templates/_base.webpack.html')
        })
    ]
};

module.exports = config;