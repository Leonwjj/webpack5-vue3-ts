const HtmlWebpackPlugin = require('html-webpack-plugin')
const { VueLoaderPlugin } = require('vue-loader')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const devMode = process.env.NODE_ENV !== 'production'
const path = require('path')

module.exports = {
  entry: './src/index.ts',
  module: {
    rules: [
      // {
      //     test: /\.ts$/,
      //     exclude: /node_modules/,
      //     // tsc 处理 .vue
      //     options: {
      //         appendTsSuffixTo: [/\.vue$/]
      //     },
      //     // 有 options 不能有 use 或者 use:[{loader: 'ts-loader', options: {}}]
      //     // use: "ts-loader",
      //     loader: 'ts-loader'
      // },
      // babel 7 支持 ts 编译
      {
        test: /\.(t|j)s$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              cacheDirectory: true
            }
          }
        ]
      },
      // scss 预处理器loader
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          // 从右往左，从下往上
          devMode ? 'style-loader' : MiniCssExtractPlugin,
          // {
          //     loader: 'style-loader' // 注入style
          // },
          {
            loader: 'css-loader' // 编译css
          },
          {
            loader: 'postcss-loader'
          },
          {
            loader: 'sass-loader'
          }
        ]
      },
      {
        test: /\.vue$/,
        use: 'vue-loader'
      },
      // 图片资源
      {
        test: /\.(png|svg|jpe?g|gif)$/,
        type: 'asset',
        generator: {
          filename: 'images/[name]-[hash][ext]'
        }
      },
      // 字体
      {
        test: /\.(eot|svg|ttf|woff2?|)$/,
        type: 'asset/resource',
        generator: {
          filename: 'fonts/[name]-[hash][ext]'
        }
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'webpack5-ts-vue',
      template: './public/index.html'
    }),
    new VueLoaderPlugin()
  ],
  // 自动添加文件扩展名,影响效率不推荐修改
  resolve: {
    alias: {
      '@': path.resolve(__dirname, '../src')
    }
    // extensions: [".vue"],
  },
  // 文件缓存
  cache: {
    type: 'filesystem'
  }
}
