const path = require('path')
module.exports = {
	entry: './src/main.js',
	output: {
		filename: 'bundle.js',
		path: path.resolve(__dirname, 'temp')
	},
	module: {
		rules: [
			{
				test: /\.m?js$/,
				exclude: /(node_modules|bower_components)/,
				use: {
					loader: 'babel-loader',
					options: {
						presets: ['@babel/preset-env'],
						plugins: [
							'babel-plugin-transform-es3-member-expression-literals',
							'babel-plugin-transform-es3-property-literals',
							'@babel/plugin-transform-reserved-words'
						]
					}
				}
			}
		]
	}
}
