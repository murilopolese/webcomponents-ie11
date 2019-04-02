const gulp = require('gulp')
const del = require('del')
const webpack = require('webpack')
const config = require('./webpack.config.js')
const concat = require('gulp-concat')
const smoosh = require('gulp-smoosher')

const clean = async function() {
	await del([
		'./temp/**/*',
		'./dist/**/*'
	])
}

// Runs webpack (and babel) on the application source code.
// Outputs to `temp` folder.
const tempBundleJs = async function() {
	return new Promise((resolve, reject) => {
		const compiler = webpack(config)
		compiler.run((err, stats) => {
			if (err) { reject(err) }
			console.log('errors', stats.compilation.errors)
			console.log('warnings', stats.compilation.warnings)
			resolve()
		});
	})
}

// Moves webcomponent polyfill to `temp` folder.
const tempMovePolyfill = async function(cb) {
	return new Promise((resolve, reject) => {
		gulp.src('./node_modules/@webcomponents/webcomponentsjs/webcomponents-bundle.js')
			.pipe(gulp.dest('./temp'))
			.on('end', resolve)
	})
}

// Moves `index.html` to `temp` folder. This is needed to smoosh correct files
const tempMoveHtml = async function(cb) {
	return new Promise((resolve, reject) => {
		gulp.src('./src/index.html')
		.pipe(gulp.dest('./temp'))
		.on('end', resolve)
	})
}

// Merges javascript files into `main.js`
const concatJs = async function() {
	return new Promise((resolve, reject) => {
		gulp.src([
				'./temp/webcomponents-bundle.js',
				'./temp/bundle.js'
			])
			.pipe(concat('main.js'))
			.pipe(gulp.dest('temp'))
			.on('end', resolve)
	})
}

// Replace `script` tags with the file content.
const smooshHtml = async function() {
	return new Promise((resolve, reject) => {
		gulp.src('./temp/index.html')
			.pipe(smoosh())
			.pipe(gulp.dest('./dist'))
			.on('end', resolve)
	})
}

gulp.task('default', async () => {
	await clean()

	// Bundle and move files to a `temp` folder
	await tempMoveHtml()
	await tempMovePolyfill()
	await tempBundleJs()

	// Bundle and move files to `dist` folder
	await concatJs()
	await smooshHtml()
})
