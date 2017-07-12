const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const path = require('path');

function buildConfig(env) {
    let environment = env || process.env.NODE_ENV || 'dev';
    return require('./configs/webpack/' + environment + '.js')({ env: environment })
}
module.exports = buildConfig;