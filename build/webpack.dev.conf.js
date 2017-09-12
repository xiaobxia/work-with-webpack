var utils = require('./utils')
var webpack = require('webpack')
var config = require('../config')
var merge = require('webpack-merge')
var baseWebpackConfig = require('./webpack.base.conf')
//TODO html处理模块
var HtmlWebpackPlugin = require('html-webpack-plugin')
var ExtractTextPlugin = require('extract-text-webpack-plugin')
var FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')

// add hot-reload related code to entry chunks
//{a:a} -> {a: ['./build/dev-client', 'a']}
Object.keys(baseWebpackConfig.entry).forEach(function (name) {
  baseWebpackConfig.entry[name] = ['./build/dev-client'].concat(baseWebpackConfig.entry[name])
})

var webpackConfig =  merge(baseWebpackConfig, {
  module: {
    rules: utils.styleLoaders({ sourceMap: config.dev.cssSourceMap ,
      extract: true})
  },
  // cheap-module-eval-source-map is faster for development
  devtool: '#cheap-module-eval-source-map',
  plugins: [
    new webpack.DefinePlugin({
      'process.env': config.dev.env
    }),
    new ExtractTextPlugin({
      filename: utils.assetsPath('css/[name].[contenthash].css')
    }),
    // https://github.com/glenjamin/webpack-hot-middleware#installation--usage
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    // https://github.com/ampedandwired/html-webpack-plugin
    //TODO 一个html文件对应一个实例
    // new HtmlWebpackPlugin({
    //   filename: 'view/index.html',
    //   template: './src/view/index.html',
    //   inject: true,
    //   chunks : ['index'],
    //   hash : true,
    //   chunksSortMode: 'dependency'
    // }),
    // new HtmlWebpackPlugin({
    //   filename: 'view/page1.html',
    //   template: './src/view/page1.html',
    //   inject: true,
    //   //TODO 很重要就是因为这个对应的js到对应页面，没有的话一个页面会有很多js（要和entry中的key对应）
    //   chunks : ['page1'],
    //   hash : true,
    //   chunksSortMode: 'dependency'
    // }),

    new FriendlyErrorsPlugin()
  ]
})

//添加html入口文件
var pages = utils.getEntry(['./src/view/*.html']);

//配置HtmlWebpackPlugin
for (var pathname in pages) {
  // 配置生成的html文件，定义路径等
  var conf = {
    //对应了url的路径
    filename: pathname + '.html',
    template: pages[pathname],   // 模板路径
    inject: true,              // js插入位置
    // necessary to consistently work with multiple chunks via CommonsChunkPlugin
    chunksSortMode: 'dependency'

  };

  if (pathname in webpackConfig.entry) {
    conf.chunks = ['manifest', 'vendor', pathname];
    conf.hash = true;
  }

  webpackConfig.plugins.push(new HtmlWebpackPlugin(conf));
}
module.exports = webpackConfig
