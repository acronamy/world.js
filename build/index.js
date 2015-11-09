var build_conf = require('./config.json'),
		common = require('./common.js'),
		fs = require('fs'),
		gulp = require('gulp'),
		path = require('path'),
		tasks = fs.readdirSync(path.join(__dirname,'tasks'))

var run = {}
for(i in tasks) run[tasks[i].split(".")[0]] = require(path.join(__dirname,"tasks",tasks[i])).bind(common)

module.exports = function(server_conf){

	//tasks
	gulp.task('scripts',run.scripts)
	gulp.task('styles',run.styles)
	gulp.task('watch',run.watch)

	//run
	gulp.task('default',['scripts','styles','watch'])
	gulp.start('default')
}
