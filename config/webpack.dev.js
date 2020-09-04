// Development configuration
const { merge } = require('webpack-merge');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackHarddiskPlugin = require('html-webpack-harddisk-plugin');
const base = require('./webpack.config');
require('dotenv').config();

const { PORT } = process.env;

module.exports = merge(base, {
  mode: 'development',
  devServer: {
    host: 'localhost',
    port: `${PORT}`,
    hot: true, // Hot-reload this server if changes are detected
    compress: true, // Compress (gzip) files that are served
    contentBase: path.resolve(__dirname, '../app/dist'), // Where we serve the local dev server's files from
    watchContentBase: true, // Watch the content base for changes
  },
  output: {
    publicPath: `http://localhost:${PORT}/`,
  },
  plugins: [
    new HtmlWebpackPlugin({
      alwaysWriteToDisk: true,
      template: path.resolve(__dirname, '../app/src/index.html'),
      filename: path.resolve(__dirname, '../app/dev/index-dev.html'),
      inject: 'true',
    }),
    new HtmlWebpackHarddiskPlugin(),
  ],
});
