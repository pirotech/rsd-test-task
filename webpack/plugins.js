const path = require ('path');
const _CleanWebpackPlugin = require('clean-webpack-plugin');
const _HtmlWebPackPlugin = require('html-webpack-plugin');
const _MiniCssExtractPlugin = require('mini-css-extract-plugin');

const devMode = process.env.NODE_ENV !== 'production';

const CleanWebpackPlugin = new _CleanWebpackPlugin(
  ['dist'],
  { root: path.resolve(__dirname , '..'), verbose: true }
);
const HtmlWebPackPlugin = new _HtmlWebPackPlugin({
  template: './public/index.html',
  filename: './index.html'
});
const MiniCssExtractPlugin = new _MiniCssExtractPlugin({
  filename: devMode ? '[name].css' : '[name].[hash].css',
  chunkFilename: devMode ? '[id].css' : '[id].[hash].css',
});

module.exports = {
  HtmlWebPackPlugin,
  MiniCssExtractPlugin,
  CleanWebpackPlugin
};
