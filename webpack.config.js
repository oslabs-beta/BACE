const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: [
    path.resolve('./src/index.js')
  ],
  output: {
    path: path.resolve('./build/'),
    filename: 'bundle.js',
    publicPath: '/'
  },
  mode: process.env.NODE_ENV,
  module: {
    loaders: [
      {
        test: /\.jsx/,
        exclude: /node_modules/,
        include: path.resolve('./src/'),
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              '@babel/preset-env',
              '@babel/preset-react',
            ]
          },
        },
      },
      {
        test: /\.scss$/, 
        use: [
          {
            loader: 'style-loader'
          },
          {
            loader: 'css-loader'
          },
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: () => [
                  require('autoprefixer')
                ]
              }
            }
          },
          {
            loader: 'sass-loader'
          }
        ],
      },
      {
        test: /\.css$/, 
        use: [
          'style-loader',
          'css-loader',
        ],
      }
      // {
      //   test: /\.s?css$/,
      //   use: [
      //     {loader: 'style-loader'},
      //     {
      //       loader: 'css-loader?importLoaders=1',
      //       query: {
      //         modules: true,
      //         localIdentName: '[name]__[local]___[hash:base64:5]'
      //       }
      //     },
      //     {loader: 'sass-loader'},
      //     {
      //       loader: 'postcss-loader',
      //       options: {
      //         plugins: function () {
      //           return [
      //             require('postcss-cssnext')
      //           ];
      //         }
      //       }
      //     }
      //   ]
      // }
    ]
  },
  devServer: {
    host: 'localhost',
    port: 8080,
    hot: true,
    // fallback to root for other urls
    historyApiFallback: true,
    static: {
      // match the output path
      directory: path.resolve('./build/'),
      // match the output 'publicPath'
      publicPath: '/build',
    },
    proxy: {
      '/**': {
        target: 'http://localhost:3000/',
        secure: false,
      },
    },
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
    }),
  ],
  resolve: {
    extensions: ['.js', '.jsx', '.scss', '.css']
  }
};