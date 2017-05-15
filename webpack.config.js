'use strict';

const webpack = require('webpack'),
      path    = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');

const srcRoot  = './templates/_layouts/src/',
      distRoot = './templates/_layouts/dist/';


let config = {
    entry: {
        main: path.resolve("./static/js/main.js"),
        editor: path.resolve("./static/js/editor.js")
    },
    output: {
        path: path.resolve("./static/dist/js"),
        publicPath: '/static/js',
        filename: "[name].bundle.js",
      },
    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader'
            }        ]
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
            filename: path.resolve(path.join(distRoot, 'base.html')),
            template: path.resolve(path.join(srcRoot, 'base.html'))
        })
    ]
};

module.exports = config;