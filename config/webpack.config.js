const path = require('path');

module.exports = {
  entry: {
    index: './app/src/index.jsx',
  },
  target: 'web',
  output: {
    path: path.resolve(__dirname, '../app/dist'),
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        include: [path.resolve(__dirname, '../app/src')],
        use: {
          loader: 'babel-loader',
        },
        resolve: {
          extensions: ['.js', '.jsx', '.json'],
        },
      },
      {
        test: /\.html$/,
        include: [path.resolve(__dirname, 'app/src')],
        use: [
          {
            loader: 'html-loader',
          },
        ],
      },
      {
        test: /\.(eot|woff|woff2|ttf|svg|png|jpg|gif)$/,
        include: [path.resolve(__dirname, 'resources')],
        use: 'url-loader',
      },
    ],
  },
  // plugins: [
  //   new HtmlWebPackPlugin({
  //     template: './app/src/index.html',
  //     filename: './index.html',
  //   }),
  // ],
};
