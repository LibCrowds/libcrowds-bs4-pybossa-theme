'use strict';

const webpack = require('webpack'),
      path    = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');

let config = {
    entry: {
        main: "./_js/main.js",
        editor: "./_js/editor.js"
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
            chunks: ['main', 'editor'],
            filename: path.resolve('./templates/base.html'),
            template: './templates/_base.webpack.html'
        })
    ]
};

module.exports = config;