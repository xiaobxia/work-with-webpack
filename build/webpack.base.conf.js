var path = require('path')
var utils = require('./utils')
var config = require('../config')
var os = require('os');
var HappyPack = require('happypack');
var happyThreadPool = HappyPack.ThreadPool({size: os.cpus().length});

function resolve (dir) {
  return path.join(__dirname, '..', dir)
}

module.exports = {
  entry: {
    //key的值需要和chunk的名字对应
    'index': './src/js/index.js',
    'page1': './src/js/page1.js'
  },
  output: {
    path: config.build.assetsRoot,
    filename: '[name].js',
    publicPath: process.env.NODE_ENV === 'production'
      ? config.build.assetsPublicPath
      : config.dev.assetsPublicPath
  },
  resolve: {
    extensions: ['.js', '.json'],
    //使'../src/module'可以简写为'module'
    alias: {
      '@': resolve('src'),
      //通过module引入
      'css': path.resolve(__dirname, '../src/css/page'),
      //'module': path.resolve(__dirname, '../src/module'),
      //'util': path.resolve(__dirname, '../src/util')
    }
  },
  plugins: [
    new HappyPack({
      id: 'happyBabel',
      loaders: ['babel-loader'],
      threadPool: happyThreadPool,
      verbose: true
    })
  ],
  module: {
    rules: [
      {
        test: /\.(js)$/,
        loader: 'eslint-loader',
        enforce: 'pre',
        include: [resolve('src'), resolve('test')],
        options: {
          formatter: require('eslint-friendly-formatter'),
          //自动修复
          fix: true
        }
      },
      //babel-loader很慢，要做好优化
      {
        test: /\.js$/,
        loader: 'happypack/loader?id=happyBabel',
        include: [resolve('src'), resolve('test')],
        exclude: /node_modules/
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('img/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('media/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
        }
      }
    ]
  }
};
