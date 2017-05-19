'use strict';

const webpack    = require('webpack'),
      path       = require('path'),
      pathExists = require('path-exists');

const HtmlPlugin              = require('html-webpack-plugin'),
      HtmlHarddiskPlugin      = require('html-webpack-harddisk-plugin'),
      ExtractTextPlugin       = require('extract-text-webpack-plugin'),
      OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin'),
      CopyPlugin              = require('copy-webpack-plugin'),
      CleanPlugin             = require('clean-webpack-plugin'),
      FaviconsPlugin          = require('favicons-webpack-plugin');

const distPath            = path.resolve('./static'),
      baseTemplatePath    = path.resolve('./templates/base.html'),
      customTemplatesPath = path.resolve('./templates/custom');

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
                    use: [{
                        loader: "css-loader"
                    },
                    {
                        loader: 'sass-loader',
                        options: {
                            data: '$theme-env: ' + process.env.THEME + ';'
                        }
                    }]
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
            baseTemplatePath,
            customTemplatesPath
        ]),
        new CopyPlugin([{
            context: path.join('_custom', process.env.THEME),
            from: '**/*.md',
            to: customTemplatesPath
        }]),
        new HtmlPlugin({
            hash: true,
            inject: false,
            filename: baseTemplatePath,
            template: './_base.html'
        }),
        new ExtractTextPlugin('style.css'),
        new OptimizeCssAssetsPlugin({
              cssProcessorOptions: {
                  discardComments: {
                      removeAll: true
                  }
              }
        }),
        new FaviconsPlugin(path.resolve('./_img/favicon.png'), {
            appName: "LibCrowds",
            url: "http://www.libcrowds.com/",
            background: "#DA0000",
            theme_color: "#DA0000",
        })
    ]
};

if (process.env.NODE_ENV === 'production') {
    config.plugins.push(new webpack.optimize.UglifyJsPlugin());
} else {
    config.plugins.push(new HtmlHarddiskPlugin({ alwaysWriteToDisk: true }));
}

module.exports = config;
