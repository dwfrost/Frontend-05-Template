// const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin')

const VueLoaderPlugin = require('vue-loader/lib/plugin')
module.exports = {
  entry: './src/main.js',
  // output: {
  //   filename: '[name].js',
  //   path: __dirname + '/dist',
  // },
  module: {
    rules: [
      { test: /\.vue$/, use: 'vue-loader' },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  mode: 'development',
  plugins: [
    // new HtmlWebpackPlugin({
    //   template: './public/index.html',
    // }),
    new VueLoaderPlugin(),
    new CopyPlugin({
      patterns: [{ from: './src/index.html', to: '[name].[ext]' }],
    }),
  ],
}
