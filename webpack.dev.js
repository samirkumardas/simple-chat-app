const merge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin'); 
const webpack = require('webpack'); 
const path = require('path');
const common = require('./webpack.common.js');

module.exports = merge(common, {
   mode: 'development',
   devtool: 'inline-source-map',
   devServer: {
      contentBase: path.join(__dirname, "dist"),
      historyApiFallback: true
   },
   plugins: [
    new HtmlWebpackPlugin({template: './src/index.html'}),
    new webpack.HotModuleReplacementPlugin()
   ]
});