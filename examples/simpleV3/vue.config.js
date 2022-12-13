// If omitted => causig 'isCE' error  https://github.com/vuejs/core/issues/4344
const path = require('path')

module.exports = {
  chainWebpack: config => {
    config.resolve.symlinks(false)
    config.resolve.alias.set( 'vue', path.resolve('./node_modules/vue'))
  },
  configureWebpack: {
    devServer: {
      hot: true
    }
  }
}
