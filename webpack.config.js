var webpack = require('webpack');
var hotMiddlewareScript = 'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000';
var path = require('path');

const isDevelopment = process.env.NODE_ENV === 'development';
const indexEntry = ['./src/client/index.js'];


if (isDevelopment) { // Add the hot middleware to the entry point
  indexEntry.push(hotMiddlewareScript);
}

module.exports = {
  context: __dirname,
  entry: {
    index: indexEntry,
  },
  output: {
    path: path.join(__dirname, 'dist', 'assets'),
    publicPath: '/assets',
    filename: '[name].bundle.js'
  },
  module: {

    loaders: [
      {
        test    : /\.jsx?$/,
        exclude : /node_modules/,
        loader  : 'babel',
      }, {
        test   : /\.json$/,
        loader : 'json'
      },
      {
        test: /\.scss$/,
        loaders: ["style","css","sass"]
      }
    ],
  },

  resolve: {
    alias: { // aliases for frequently used paths.  Aliases are referenced like modules
      styles: path.join(__dirname, "src/client/assets/styles"),
      images: path.join(__dirname, "src/client/assets","images"),
      components: path.join(__dirname, "src/client/components"),
      containers: path.join(__dirname, "src/client/containers"),
      pages: path.join(__dirname, "src/client/containers/pages"),
      actions: path.join(__dirname, "src/client/actions"),
      reducers: path.join(__dirname, "src/client/reducers"),
      constants: path.join(__dirname, "src/client/constants"),
      util: path.join(__dirname, "src/util"),
      dist: path.join(__dirname, "dist"),
      img: path.join(__dirname, "dist/img"),
      sample: path.join(__dirname, "sample"),
      },
  },
  devtool: '#dev-module-source-map',
  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.DefinePlugin({
      isDevelopment,
    }),
    new webpack.ProvidePlugin({
      React: 'react',
      ReactDOM: 'react-dom',
      cnames: 'classnames',
    }),
    new webpack.HotModuleReplacementPlugin(),
  ],
};
