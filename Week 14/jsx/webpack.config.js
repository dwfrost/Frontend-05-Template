const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");
module.exports = {
  entry: {
    main: "./main.js",
    "animation-demo": "./animation-demo.js",
  },
  output: {
    path: path.join(__dirname, "./dist"),
    filename: "[name].js",
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
            plugins: [
              [
                "@babel/plugin-transform-react-jsx",
                { pragma: "createElement" },
              ],
            ],
          },
        },
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: "轮播demo", // 替换html的title标签内容
      template: path.join(__dirname, "./template/main.html"), // 模板来源
      filename: "main.html", // 输出文件名称，可以使用子目录如abc/index.html
      chunks: ["main"], // 如果是多页，需要独立配置，如果不设置，会注入所有entry的chunk
    }),
    new HtmlWebpackPlugin({
      title: "Animation", // 替换html的title标签内容
      template: path.join(__dirname, "./template/animation.html"), // 模板来源
      filename: "animation.html", // 输出文件名称，可以使用子目录如abc/index.html
      chunks: ["animation-demo"], // 如果是多页，需要独立配置，如果不设置，会注入所有entry的chunk
    }),
  ],
  mode: "none",
  // mode: "production",
  // devServer: {
  //   contentBase: './dist',
  //   hot: true,
  // },
};
