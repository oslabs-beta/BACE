const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
// const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: {
    //create multiple entry points
    popup:  './src/client/chrome_ext/popup.tsx',
    devtool: './src/client/chrome_ext/devtool.tsx'
},
  output: {
    path: path.resolve(__dirname, 'public'),
    publicPath: '/',
    //each entry recieve output name of their key
    filename: '[name].js'
  },
  mode: process.env.NODE_ENV,
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'ts-loader',
        },
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.png|svg|jpg|gif$/,
        use: ['file-loader'],
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  plugins: [
    new HtmlWebpackPlugin(
      {
        filename: 'popup.html',
        template: path.resolve(__dirname, 'public/popup.html'),
        inject: false,
        minify: false,
      },
    ),
  ],
  devServer: {
    static: {
      directory: path.resolve(__dirname, 'public/'),
      publicPath: '/public',
    },
  },
};
