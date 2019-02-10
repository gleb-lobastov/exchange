const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

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
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  plugins: [
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
