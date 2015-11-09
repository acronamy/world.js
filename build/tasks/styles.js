module.exports = function(){
	var resolve = this.root_resolve,
			stylus = this.stylus,
			gulp = this.gulp,
			livereload = this.livereload,
			path = require('path')


	var src = path.join(resolve('src','styles'),'index.styl')

	gulp.src(src)
		.pipe(stylus())
		.pipe(gulp.dest(resolve('dest','styles')))
		.pipe(livereload())

}
