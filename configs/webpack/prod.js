'use strict';

const path = require('path');
const webpackMerge = require('webpack-merge');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const base = require('./base.js');
const config = require('../config');

module.exports = function(env) {
    return webpackMerge(base(), {
        plugins: [
            new webpack.LoaderOptionsPlugin({
                minimize: true,
                debug: false
            }),
            new webpack.DefinePlugin({
                'API_URL': JSON.stringify(config.prodApiUrl),
                'ASSETS_URL': JSON.stringify(config.devAssetsPath)
            }),
            new HtmlWebpackPlugin({
                filename: 'index.html',
                template: './src/index.html',
                inject: false
            })
        ]
    })
};


