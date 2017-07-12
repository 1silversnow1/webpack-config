const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const config = require('../config');

module.exports = () => {
    "use strict";
    return {
        entry: {
            app: path.resolve(__dirname, `../../src/app/${config.entry}`)
        },
        output: {
            path: path.resolve(__dirname, `../../public${config.publicPath}`),
            publicPath: config.publicPath,
            filename: '[name].bundle.js',
            chunkFilename: '[name].[id].[chunkhash].js',
            library: '[name]'
        },
        resolve: {
            alias: {
                styles: path.resolve(__dirname, '../../src/styles/app')
            },
            extensions: ['.js', '.json', '.css', '.scss'],
            modules: [path.resolve(__dirname, '/src'), 'node_modules']
        },
        resolveLoader: {
            modules: [
                'node_modules',
                path.join(__dirname, '../../node_modules'),
            ],
        },
        module: {
            noParse: /jquery|lodash|angular\/angular.js/,
            rules: [
                {
                    test: /\.js$/,
                    exclude: /(node_modules|bower_components)/,
                    include: [
                        path.resolve(__dirname, 'src')
                    ],
                    use: {
                        loader: 'babel-loader',
                        options: {
                            presets: [['es2015', 'stage-0']],
                            plugins: ['syntax-dynamic-import'],
                            compact: true
                        }
                    }
                },
                {
                    test: /\.scss$/,
                    use: ExtractTextPlugin.extract({
                        fallback: 'style-loader',
                        use: [
                            'css-loader?sourceMap',
                            'postcss-loader',
                            'resolve-url-loader',
                            'sass-loader?sourceMap']
                    })
                },
                {
                    test: /\.(jpg|png|svg)$/,
                    loader: `url-loader?limit=20000&name=[name].[ext]&outputPath=images/&publicPath=${config.publicPath}`
                },
                {
                    test: /\.(ttf|eot|woff|woff2)$/,
                    loader: `url-loader?limit=20000&name=[name].[ext]&outputPath=fonts/&publicPath=${config.publicPath}`
                },
                {
                    test: /\.html$/,
                    use: 'raw-loader'
                }
            ]
        },
        plugins: [
            new webpack.ProvidePlugin({
                $: 'jquery',
                jQuery: 'jquery'
            }),
            new webpack.optimize.CommonsChunkPlugin({
                name: 'vendor',
                minChunks(module) {
                    return module.context && module.context.indexOf('node_modules') !== -1;
                }
            }),
            new ExtractTextPlugin({
                filename: 'app.css'
            })
        ]
    };
};