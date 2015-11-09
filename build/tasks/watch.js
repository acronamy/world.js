module.exports = function(){
	var livereload = this.livereload,
			gulp = this.gulp,
			resolve = this.root_resolve,
			path = require('path')

	livereload.listen()

	gulp.watch(path.join(resolve('src','scripts'),'**/*.js'),['scripts'])
	gulp.watch(path.join(resolve('src','styles'),'**/*.styl'),['styles'])
}
