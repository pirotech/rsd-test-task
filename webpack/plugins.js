const path = require ('path');

const _HtmlWebPackPlugin = require("html-webpack-plugin");
const _MiniCssExtractPlugin = require("mini-css-extract-plugin");
const _CleanWebpackPlugin = require('clean-webpack-plugin');



const devMode = process.env.NODE_ENV !== 'production';


const HtmlWebPackPlugin = new _HtmlWebPackPlugin({
    // где искать индекс файл
    template: "./public/index.html",
    // какоф файл создавть в dist
    filename: "./index.html"
});

const MiniCssExtractPlugin = new _MiniCssExtractPlugin({
    // Options similar to the same options in webpackOptions.output
    // both options are optional
    filename: devMode ? '[name].css' : '[name].[hash].css',
    chunkFilename: devMode ? '[id].css' : '[id].[hash].css',
});

const CleanWebpackPlugin = new _CleanWebpackPlugin(["dist"], { root: path.resolve(__dirname , '..'), verbose: true });


module.exports = {
    HtmlWebPackPlugin,
    MiniCssExtractPlugin,
    CleanWebpackPlugin
};
