// Development configuration
const { merge } = require('webpack-merge');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const base = require('./webpack.config');

module.exports = merge(base, {
  mode: 'production',
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, '../app/src/index.html'),
      filename: 'index.html',
    }),
  ],
});
