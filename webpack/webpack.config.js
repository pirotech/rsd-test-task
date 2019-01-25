const path = require ('path');

const loaders = require("./loaders.js");
const plugins = require("./plugins.js");


module.exports = {
	entry: ["./src/index.js"],
	devServer: {
		contentBase: './dist',
		publicPath: '/',
		port: 8888,
		historyApiFallback: true,
		watchContentBase: true,
		watchOptions: {
			poll: true
		},
	},
	module: {
		rules: [
			loaders.JSLoader,
			loaders.CSSLoader,
			loaders.FileLoader,
			loaders.ESLintLoader,
			loaders.FontLoader,
		]
	},
	resolve: {
		extensions: ['.js', '.jsx']
	},
	output: {
		publicPath: '/',
		path: path.resolve(__dirname, "..", "dist"),
		filename: "js/[name].bundle.js"
	},
	// Подключаем плагины в конфигурацию
	plugins: [
		plugins.CleanWebpackPlugin,
		plugins.MiniCssExtractPlugin,
		plugins.HtmlWebPackPlugin
	]
};
