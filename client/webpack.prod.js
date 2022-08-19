const {merge} = require('webpack-merge');
const config = require('./webpack.config.js')

//merge existing configuration 
module.exports = merge(config, {
  mode: 'production'
})
