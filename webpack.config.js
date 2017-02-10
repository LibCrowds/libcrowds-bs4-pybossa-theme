var webpack = require('webpack');

module.exports = {
    entry: {
        main: "./static/js/main.js",
        editor: "./static/js/editor.js"
    },
    output: {
        path: "./static/js/gen",
        filename: "[name].min.js"
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader'
            },
            {
                test: /pnotify\.js/,
                loader: 'imports-loader?global=>window,this=>window'
            }
        ]
    },
    plugins: [
        new webpack.ProvidePlugin({
            jQuery: 'jquery',
            $: 'jquery',
            jquery: 'jquery',
            "window.jQuery": "jquery",
            PNotify: 'pnotify'
        })
    ]
};