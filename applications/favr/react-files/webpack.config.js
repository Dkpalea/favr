const path = require('path');

// const publicPath = path.resolve('../static/js');
const publicPath = path.join(__dirname, 'public');


// const HtmlWebPackPlugin = require('html-webpack-plugin');

//'webpack-dev-server/client?/', 'webpack/hot/dev-server',

module.exports = {
  entry: ['./src/app.jsx' ],
  output: {
    path: publicPath,
    filename: 'bundle.js',
  },
  module: {
    rules: [{
      loader: 'babel-loader',
      test: /\.(jsx|js)$/,
      exclude: /node_modules/,
    },
    {
      test: /\.s?css$/,
      use: ['style-loader',
        'css-loader',
        'sass-loader',
      ],
    },
    {
      test: /\.(png|svg|jpg|gif)$/,
      use: {
        loader: 'file-loader',
      },
    },
    {
      test: /\.html$/,
      use: {
        loader: 'html-loader',
      },
    },
    ],
  },
  // plugins: [
  //   new HtmlWebPackPlugin({
  //     template: './public/index.html',
  //     filename: './index.html',
  //   }),
  // ],
  resolve: {
    extensions: ['.js', '.jsx', '.svg', '.json'],
  },
  devtool: 'cheap-module-eval-source-map',
  devServer: {
    contentBase: publicPath,
    historyApiFallback: true,
    watchContentBase: true,
    host: '0.0.0.0',
    port: 8080,
  },
  mode: 'production',
};
