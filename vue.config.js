const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: [
    'vuetify'
  ],
  productionSourceMap: false,
  pages: {
    index: {
      entry: "./src/main.js",
      title: "ASCII Table"
    }
  }
})
