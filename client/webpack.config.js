const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin')

module.exports = {
  entry: './src/popup.jsx',
  output: {
    // where the build will live, a build folder will created
    path: path.resolve(__dirname, 'build'),
    //build with a new hash to show a new build that has been created
    filename: 'build.js',
  },
  module: {
    rules: [
      { 
      //means the loader will execute with any file with .js or .jsx
      test: /\.(js|jsx)$/, 
      exclude: /node_modules/,
      use: {
        //babel is the tool we use to understand react code and transpiule it into plain javascript
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-env', '@babel/preset-react']
        }
      }, 
    },
    {
      test: /\.css$/,
      use: ["style-loader", "css-loader"],
    },
    {
      test: /\.png|svg|jpg|gif$/,
      use: ["file-loader"],
    }
  ],
  },
  externals: {
    'react': 'React'
},
  // so our build folder contains html file
  plugins: [new HtmlWebpackPlugin({
    template: './src/popup.html',
    filename: 'popup.html'
  }),
  //To copy all the files inside public folder and post into build
    new CopyPlugin({
      patterns: [
        { from: "public" },

      ],
    })],
// How do we obtain a development server on localhost
  devServer: {
    host: 'localhost',
    port: 8080,
    // enable HMR on the devServer
    // Reload, everytime there is a change
    hot: true,
    // fallback to root for other urls
    historyApiFallback: true,
    static: {
      // match the output path
      directory: path.resolve(__dirname, 'build'),
      // match the output 'publicPath'
      publicPath: '/',
    }
  }
};
 
