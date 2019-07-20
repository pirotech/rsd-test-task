const path = require ('path');

const loaders = require("./loaders.js");
const plugins = require("./plugins.js");


module.exports = {
	entry: './src/index.tsx',
	devServer: {
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
			// loaders.ESLintLoader,
			loaders.FontLoader,
		]
	},
	resolve: {
		extensions: ['.ts', '.tsx', '.js']
	},
	output: {
		path: path.join(__dirname, '../dist'),
		filename: "js/[name].bundle.js"
	},
	plugins: [
		plugins.CleanWebpackPlugin,
		plugins.MiniCssExtractPlugin,
		plugins.HtmlWebPackPlugin
	]
};
