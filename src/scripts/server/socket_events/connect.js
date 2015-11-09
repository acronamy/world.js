var colors = require('colors'),
		fs = require('fs'),
		path = require('path')


module.exports = function(io){
	io.on('connection',function(socket){
		console.log(colors.yellow('[socket.io] Client connected.'))

		require('../reciever/index.js').bind(io)(socket)
		require('./disconnect.js').bind(io)(socket)

	})
}
