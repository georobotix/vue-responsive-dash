module.exports = {
  configureWebpack: {
    devtool: "source-map",
  },
  css: { extract: false },
  devServer: {
    hot: true
  }
};
