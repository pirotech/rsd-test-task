const path = require('path');
const _MiniCssExtractPlugin = require('mini-css-extract-plugin');
const devMode = process.env.NODE_ENV !== 'production';

const TSLoader = {
	test: /\.(js|ts|tsx)$/,
	exclude: /node_modules/,
	use: {
		loader: 'awesome-typescript-loader'
	}
};
const TSLintLoader = {
	enforce: 'pre',
	test: /\.(ts|tsx)$/,
	exclude: /node_modules/,
	include: path.resolve(__dirname, '../src'),
	use: {
		loader: 'tslint-loader',
		options: {
			configFile: path.resolve(__dirname, '../tslint.json'),
		},
	}
};
const CSSLoader = {
	test: /\.(sa|sc|c)ss$/,
	use: [
		{
			loader: devMode ? 'style-loader' : _MiniCssExtractPlugin.loader,
		},
		{
			loader: 'css-loader',
			options: {
				importLoaders: 1,
				sourceMap: true,
				minimize: true,
			}
		},
		{
			loader: 'sass-loader',
			options: {
				data:
					'@import "./src/shared/css/settings/_variables.scss";' +
          '@import "./src/shared/css/settings/_mixins.scss";',
				includePaths: [
					path.resolve(__dirname, './src')
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
	TSLoader,
	TSLintLoader,
	CSSLoader,
	FileLoader,
	FontLoader,
};
