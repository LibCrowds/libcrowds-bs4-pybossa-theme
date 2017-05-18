'use strict';

const webpack    = require('webpack'),
      path       = require('path'),
      pathExists = require('path-exists');

const HtmlPlugin              = require('html-webpack-plugin'),
      ExtractTextPlugin       = require('extract-text-webpack-plugin'),
      OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin'),
      CopyPlugin              = require('copy-webpack-plugin'),
      CleanPlugin             = require('clean-webpack-plugin'),
      FaviconsPlugin          = require('favicons-webpack-plugin');

const distPath            = path.resolve('./static'),
      customTemplatesPath = path.resolve('./templates/custom'),
      customImagePath     = path.resolve('./_img/custom');

// pace-progress loader is a fix for https://github.com/HubSpot/pace/issues/328

let config = {
    entry: {
        main: "./_js/main.js"
    },
    output: {
        path: distPath,
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
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: 'css-loader!sass-loader'
                })
            },
            {
                test: /\.(jpe?g|png|gif)$/i,
                loader: 'url-loader?limit=10000!img-loader'
            },
            {   test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                loader: "url-loader?limit=10000&mimetype=application/font-woff"
            },
            {   test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                loader: "url-loader?limit=10000!file-loader"
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
        new CleanPlugin([
            distPath,
            customTemplatesPath,
            customImagePath
        ]),
        new CopyPlugin([{
            context: path.join('_custom', process.env.THEME),
            from: '**/*.md',
            to: customTemplatesPath
        },
        {
            context: path.join('_custom', process.env.THEME),
            from: '**/*.jpg',
            to: customImagePath
        }]),
        new HtmlPlugin({
            hash: true,
            inject: false,
            filename: path.resolve('./templates/base.html'),
            template: './templates/_base.webpack.html'
        }),
        new ExtractTextPlugin('style.css'),
        new OptimizeCssAssetsPlugin({
              cssProcessorOptions: {
                  discardComments: {
                      removeAll: true
                  }
              }
        }),
        new FaviconsPlugin('_img/favicon.png', {
            appName: "LibCrowds",
            background: "#DA0000",
            theme_color: "#DA0000",
        })
    ]
};

if (process.env.NODE_ENV === 'production') {
    config.plugins.push(new webpack.optimize.UglifyJsPlugin())
}

module.exports = config;
