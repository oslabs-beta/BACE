const path = require('path');
// const HtmlWebpackPlugin = require('html-webpack-plugin');
// const TerserPlugin = require('terser-webpack-plugin');

module.exports = {
  entry: {
    // popup:  './src/client/extension/popup.tsx',
    // devtool: './src/client/extension/devtool.tsx',
    index: './src/client/app/index.ts',
    webcomponent: './webcomponentsjs/webcomponents-bundle.js',
    injection: './src/client/app/injection.ts',
    contentbridge: './src/client/app/ContentBridge.ts',
    appelement: './src/client/app/Element/AppElement.ts',
    background: './src/client/content/background.ts',
    devtools: './src/client/extension/devtools.ts'
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
  // optimization: {
  //   minimize: true,
  //   minimizer: [new TerserPlugin()],
  // },
  devServer: {
    port: 8080,
    hot: true,
    historyApiFallback: true,
    static: {
      directory: path.resolve(__dirname, 'public/dist'),
      publicPath: '/public',
    },
    proxy: {
      '/api/**': {
        target: 'http://localhost:3000/',
        secure: false
      }
    }
  },
};
