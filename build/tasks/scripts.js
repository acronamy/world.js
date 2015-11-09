module.exports = function(){
	var resolve = this.root_resolve,
			browserify = this.browserify,
			gulp = this.gulp,
			livereload = this.livereload,
			path = require('path')

	var src = path.join(resolve('src','scripts'),'browser/index.js')

	gulp.src(src)
		.pipe(browserify())
		.pipe(gulp.dest(resolve('dest','scripts')))
		.pipe(livereload())

}
