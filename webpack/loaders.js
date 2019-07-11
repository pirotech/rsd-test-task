const devMode = process.env.NODE_ENV !== 'production';
const _MiniCssExtractPlugin = require("mini-css-extract-plugin");
const path = require ('path');

const JSLoader = {
	test: /\.(js|jsx)$/,
	exclude: /node_modules/,
	use: {
		loader: 'babel-loader'
	}
};
const CSSLoader = {
	test: /\.(sa|sc|c)ss$/,
	use: [
		{
			loader: devMode ? 'style-loader' : _MiniCssExtractPlugin.loader,
		},
		{
			loader: "css-loader",
			options: {
				modules: false,
				importLoaders: 1,
				sourceMap: true,
				minimize: true,
			}
		},
		{
			loader: "sass-loader",
			options: {
				data: '@import "./src/shared/css/settings/_variables.scss";' +
          '@import "./src/shared/css/settings/_mixins.scss";',
				includePaths: [
					path.resolve(__dirname, "./src")
				]
			}
		},
	]
};
const FileLoader = {
	test: /\.(svg|gif|png|jpg)$/,
	use: {
		loader: 'file-loader',
		options: {
			name: 'files/[name].[ext]',
		}
	},
};
const ESLintLoader = {
	enforce: 'pre',
	test: /\.(js|jsx)$/,
	exclude: /node_modules/,
	include: path.resolve(__dirname, '../src'),
	use: {
		loader: 'eslint-loader',
		options: {
			configFile: path.resolve(__dirname, '../.eslintrc'),
		},
	}
};
const FontLoader = {
	test: /\.(woff(2)?|eot|ttf|otf)(\?.*$|$)/,
	use: [{
		loader: 'file-loader',
		options: {
			name: 'fonts/[name].[ext]',
		}
	}]
};


module.exports = {
	JSLoader,
	CSSLoader,
	FileLoader,
	ESLintLoader,
	FontLoader,
};
