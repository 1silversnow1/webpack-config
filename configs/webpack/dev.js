'use strict';

const path = require('path');
const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const base = require('./base.js');
const config = require('../config');

module.exports = function(env) {
    return webpackMerge(base(), {
        devtool: 'inline-source-map',
        devServer: {
            contentBase: path.join(__dirname, "../../src"),
            compress: true,
            clientLogLevel: "error",
            port: 9000
        },
        plugins: [
            new webpack.DefinePlugin({
                'API_URL': JSON.stringify(config.devApiUrl),
                'ASSETS_URL': JSON.stringify(config.prodAssetsPath)
            })
            //new BundleAnalyzerPlugin()
        ]
    })
};
