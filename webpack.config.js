'use strict';

const webpack        = require('webpack'),
      path           = require('path'),
      ManifestPlugin = require('webpack-manifest-plugin');


let config = {
    entry: {
        main: path.resolve("./static/js/main.js"),
        editor: path.resolve("./static/js/editor.js")
    },
    output: {
        path: path.resolve("./static/dist/js"),
        filename: "[name].[chunkhash].bundle.js",
      },
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
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
        new ManifestPlugin()
    ]
};

module.exports = config;