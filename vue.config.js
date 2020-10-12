// vue.config.js

module.exports = {
  devServer: {
    disableHostCheck: true
  },
  css: {
    loaderOptions: {
      scss: {
        prependData: `@import "~@/assets/styles/variables.scss";`
      }
    }
  }
};
