const path = require('path');
const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
	/**
 * babel-polyfill:- This will let you use all modern es2015+ js tools like Promise, Array.from, Object.assign, Weakmap.
 * you need to install @babel-polyfill npm package.
*/
	entry: ['babel-polyfill', './src/index.tsx'],
	mode: 'development',
	output: {
		publicPath: './public',
		filename: 'bundle.js',
		path: path.resolve(__dirname, './public'),
	},
	plugins: [new webpack.HotModuleReplacementPlugin(), new CopyWebpackPlugin([{ from: 'public/index.html' }])],
	devServer: {
		port: 3001,
		contentBase: path.join(__dirname, './public'),
		hot: true,
		open: true,
		historyApiFallback: true,
	},
	module: {
		rules: [
			{
				test: /\.css$/,
				use: ['style-loader', 'css-loader'],
			},
			{
				test: /\.(jpe?g|png|gif|woff|woff2|eot|ttf|svg|jpg)(\?[a-z0-9=.]+)?$/,
				loader: 'url-loader',
			},
			{
				test: /.(ts|tsx)$/,
				loader: 'ts-loader',
				exclude: /node_modules/,
			},
			{
				test: /.js?$/,
				loader: 'babel-loader',
				exclude: /node_modules/,
			},
		],
	},
	resolve: {
		alias: {
			// '@ag-grid-community/core/modules': path.resolve('./node_modules/@ag-grid-community/core/dist/es2015/modules'),
			'@ag-grid-community/core': path.resolve('./node_modules/@ag-grid-community/core'),
			// 'ag-grid-enterprise': path.resolve('./node_modules/ag-grid-enterprise'),
			react: path.resolve('./node_modules/react'),
		},
		extensions: ['.ts', '.tsx', '.js'],
	},
	devtool: 'eval-cheap-source-map',
};
