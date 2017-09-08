var utils = require('./utils')
var webpack = require('webpack')
var config = require('../config')
var merge = require('webpack-merge')
var baseWebpackConfig = require('./webpack.base.conf')
//TODO html处理模块
var HtmlWebpackPlugin = require('html-webpack-plugin')
var FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')

// add hot-reload related code to entry chunks
//{a:a} -> {a: ['./build/dev-client', 'a']}
Object.keys(baseWebpackConfig.entry).forEach(function (name) {
  baseWebpackConfig.entry[name] = ['./build/dev-client'].concat(baseWebpackConfig.entry[name])
})

module.exports = merge(baseWebpackConfig, {
  module: {
    rules: utils.styleLoaders({ sourceMap: config.dev.cssSourceMap })
  },
  // cheap-module-eval-source-map is faster for development
  devtool: '#cheap-module-eval-source-map',
  plugins: [
    new webpack.DefinePlugin({
      'process.env': config.dev.env
    }),
    // https://github.com/glenjamin/webpack-hot-middleware#installation--usage
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    // https://github.com/ampedandwired/html-webpack-plugin
    new HtmlWebpackPlugin({
      filename: 'view/index.html',
      template: './src/view/index.html',
      inject: true,
      chunks : ['index'],
      hash : true
    }),
    new HtmlWebpackPlugin({
      filename: 'view/page1.html',
      template: './src/view/page1.html',
      inject: true,
      //TODO 很重要就是因为这个对应的js到对应页面，没有的话一个页面会有很多js（要和entry中的key对应）
      chunks : ['page1'],
      hash : true
    }),

    new FriendlyErrorsPlugin()
  ]
})
