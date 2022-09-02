const path = require('path');
// const HtmlWebpackPlugin = require('html-webpack-plugin');
// const TerserPlugin = require('terser-webpack-plugin');

module.exports = {
  entry: {
    index: './src/client/app/index.ts',
    webcomponent: './webcomponentsjs/webcomponents-bundle.js',
    // injection: './src/client/app/injection.ts',
    // contentbridge: './src/client/app/ContentBridge.ts',
    // appelement: './src/client/app/Element/AppElement.ts',
    background: './src/client/extension/background.ts',
    devtools: './src/client/extension/devtools.ts',
    contentscript: './src/client/extension/contentScript.ts'
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
  watchOptions: {
    ignored: /node_modules/
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
