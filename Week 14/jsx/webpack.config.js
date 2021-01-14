module.exports = {
  entry: {
    main: './main.js',
    'animation-demo': './animation-demo.js',
  },
  output: {
    path: __dirname,
    filename: './dist/[name].js',
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
  mode: 'development',
  // devServer: {
  //   contentBase: './dist',
  //   hot: true,
  // },
}
