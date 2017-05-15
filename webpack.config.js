'use strict';

const webpack = require('webpack'),
      path    = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');

<<<<<<< HEAD

=======
>>>>>>> c9115d817874d5e61847735bb928adf63b91b6be
let config = {
    entry: {
        main: "./static/js/main.js",
        editor: "./static/js/editor.js"
    },
    output: {
<<<<<<< HEAD
        path: path.resolve("./static/dist/js"),
        publicPath: '/static/js',
=======
        path: path.resolve(__dirname, 'static/dist/js'),
>>>>>>> c9115d817874d5e61847735bb928adf63b91b6be
        filename: "[name].bundle.js",
      },
    module: {
        loaders: [
            {
                test: /\.js$/,
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
<<<<<<< HEAD
            chunks: ['main', 'editor'],
            filename: './templates/base.html',
            template: './templates/_base.webpack.html'
=======
            filename: path.resolve(__dirname, 'templates/base.html'),
            template: path.resolve(__dirname, 'templates/_base.webpack.html')
>>>>>>> c9115d817874d5e61847735bb928adf63b91b6be
        })
    ]
};

module.exports = config;