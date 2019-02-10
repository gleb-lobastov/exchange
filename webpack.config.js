const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const OPEN_EXCHANGE_RATES_API_KEY = 'f8ed44b178b646978b564ecf19711da5';
const isDevelopmentMode = process.env.NODE_ENV === 'development';
module.exports = {
  mode: isDevelopmentMode ? 'development' : 'production',
  output: {
    filename: isDevelopmentMode ? '[name].js' : '[name]-[chunkhash].js',
    publicPath: isDevelopmentMode ? '/' : '/exchange',
  },
  resolve: {
    extensions: ['.js', '.jsx'],
    modules: ['src', 'node_modules'],
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      __OPEN_EXCHANGE_RATES_API_KEY__: `"${OPEN_EXCHANGE_RATES_API_KEY}"`,
    }),
    new CleanWebpackPlugin(['dist/*.*']),
    new HtmlWebpackPlugin({
      title: 'Exchange',
      template: './src/index.html',
      favicon: './src/favicon.ico',
    }),
  ],
  devServer: {
    historyApiFallback: true,
  },
  devtool: isDevelopmentMode ? 'eval' : 'source-map',
};
