var path = require('path');
var webpack = require('webpack');


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
      })
  ]
};
