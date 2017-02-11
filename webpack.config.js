const debug = process.env.NODE_ENV !== "production";
const webpack = require('webpack');

module.exports = {
  context: __dirname,
  devtool: debug ? "sourcemap" : false,
  entry: "./js/scripts.js",
  output: {
    path: __dirname,
    filename: "scripts.min.js"
  },
  plugins: debug ? [] : [
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin({ mangle: true, sourcemap: false }),
  ],
  module: {
    loaders: [
      { test: /\.css$/, loader: "style-loader!css-loader" },
    ]
  },
};
