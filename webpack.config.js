'use strict';

const webpack = require('webpack'),
      path    = require('path');

const HtmlWebpackPlugin        = require('html-webpack-plugin'),
      ExtractTextWebpackPlugin = require('extract-text-webpack-plugin');

// pace-progress loader is a fix for https://github.com/HubSpot/pace/issues/328

let config = {
    entry: {
        main: "./_js/main.js"
    },
    output: {
        path: path.resolve("./static/js"),        
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
                test: /\.s[a|c]ss$/,
                use: ExtractTextWebpackPlugin.extract({
                    fallback: 'style-loader',
                    use: 'css-loader!sass-loader'
                })
            },
            {
                test: /\.(jpe?g|png|gif|svg)$/i,
                loader: 'url-loader?limit=10000!img-loader'
            },
            {   test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                loader: "url-loader?limit=10000&mimetype=application/font-woff" 
            },
            {   test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                loader: "file-loader"
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
        }),
        new ExtractTextWebpackPlugin('style.css')
    ]
};

module.exports = config;