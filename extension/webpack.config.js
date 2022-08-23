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
    path: path.resolve(__dirname, 'public/dist'),
    publicPath: '/public',
    //each entry receive output name of their key
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
  // plugins: [
  //   new HtmlWebpackPlugin(
  //     {
  //       filename: 'index.html',
  //       template: path.resolve(__dirname, 'public/index.html'),
  //       inject: false,
  //       minify: false,
  //     }
  //   ),
  //   new HtmlWebpackPlugin(
  //     {
  //       filename: 'devtools.html',
  //       template: path.resolve(__dirname, 'public/devtools.html'),
  //       inject: false,
  //       minify: false,
  //     },
  //   )
  // ],
  devServer: {
    static: {
      directory: path.resolve(__dirname, 'public/dist'),
      publicPath: '/public',
    },
  },
};
