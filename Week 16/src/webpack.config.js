const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path')
module.exports = {
  entry: {
    main: './main.js',
  },
  output: {
    path: path.join(__dirname, './dist'),
    filename: '[name].js',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
            plugins: [
              [
                '@babel/plugin-transform-react-jsx',
                { pragma: 'createElement' },
              ],
            ],
          },
        },
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: '轮播demo',
      template: path.join(__dirname, './index.html'),
      filename: 'index.html',
      // chunks: ['main'],
    }),
  ],
  mode: 'none',
  // mode: "production",
  // devServer: {
  //   contentBase: './dist',
  //   hot: true,
  // },
}
