const {merge} = require('webpack-merge');
const config = require('./webpack.config.js')

//merge existing configuration 
module.exports = merge(config, {
  mode: 'development',
  devtool: 'inline-source-map'
})
