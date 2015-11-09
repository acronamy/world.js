module.exports = function(mode){
	var express = require('express'),
			app = express(),
			path = require('path'),
			http = require('http'),
			conf = {}

	//dev server?
	if(mode.dev) require('../build/index.js')(mode)

	//meta and conf
	mode.name = require('../package.json').name

	conf.port = mode.port||8080
	conf.engine = mode.engine||'jade'
	conf.public = mode.puplic||'../public'

	//views
	app.set('views', path.resolve(__dirname,conf.public));
	app.set('view engine', conf.engine);

	//static
	app.use('/scripts', express.static(path.resolve(__dirname,'../public/scripts')));
	app.use('/styles', express.static(path.resolve(__dirname,'../public/styles')));

	//listen
	var port = app.listen(conf.port)

	if(mode.socketIO){
		var io = require('socket.io').listen(port)
		//inform the template?
		require('./io/main_io.js')(io)
	}

	var locals = {
		conf:mode
	}

	//routes
	require('./routes/main_route.js')(app,locals)

	//greating message
	if(mode.verbose) require('./greeting.js')(mode)
}
