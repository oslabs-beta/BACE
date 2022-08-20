const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require("copy-webpack-plugin");


module.exports = {
  entry: './src/popup.tsx',
  output: {
    path: path.resolve(__dirname, 'bundle'),
    filename: 'bundle.js',
  },
  module: {
    rules: [
      { 
      test: /\.(ts|tsx)$/, 
      exclude: /node_modules/,
      use: {
       loader: 'ts-loader',
      } 
    },
    {
      test: /\.css$/,
      use: ["style-loader", "css-loader"],
    },
    {
      test: /\.png|svg|jpg|gif$/,
      use: ["file-loader"],
    }
  ]
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
  plugins: [
    new HtmlWebpackPlugin(
    {
      template: './src/popup.html',
      filename: 'popup.html'
    }
  ),
  new CopyPlugin({
    patterns: [
      { from: "public"},
    ]})
  ],
  devServer: {
    static: {
      directory: path.join(__dirname, "./build"),
    }
  }
};