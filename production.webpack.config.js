var path = require('path');
var webpack = require('webpack');
// var HtmlWebpackPlugin = require('html-webpack-plugin');
//
// var HTMLWebpackPluginConfig = new HtmlWebpackPlugin({
//   template: __dirname + '/index.html',
//   filename: 'index.html',
//   inject: 'body'
// });

module.exports = {
  entry: [
    './src/index.jsx'
  ],
  output: { path: __dirname + '/static', filename: 'bundle.js' },
  devServer: {
    proxy: {
      '/': {
        target: 'http://localhost:3030',
        secure: false
      }
    }
  },
  module: {
    loaders: [
      {
        test: /.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          presets: ['es2015', 'react']
        }
      },
      {
        test: /\.scss$/,
        loaders: ["style", "css", "sass"]
      }
    ]
  },
  plugins: [
      new webpack.ProvidePlugin({
          $: "jquery",
          jQuery: "jquery"
      }),
      new webpack.ProvidePlugin({
          Materialize: "materialize-css/dist/js/materialize.min.js"
      }),
      new webpack.DefinePlugin({
        'process.env':{
          'NODE_ENV': JSON.stringify('production')
        }
      }),
      new webpack.optimize.UglifyJsPlugin({
        compress:{
          warnings: true
        }
      })
      // HTMLWebpackPluginConfig
  ]
};
