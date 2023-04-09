const ESLintPlugin = require('eslint-webpack-plugin')
const { merge } = require('webpack-merge')

const baseConfig = require('./webpack.base.js')

module.exports = merge(baseConfig, {
  mode: 'development',
  target: 'web',
  devServer: {
    hot: true,
    open: true,
    proxy: {

    }
  },
  plugins: [
    new ESLintPlugin({ extensions: ['js', 'ts', 'vue'] })
  ]

})
