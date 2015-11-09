var colors = require('colors')

module.exports = function(socket){

	socket.on('disconnect',function(){
		console.log(colors.red('[socket.io] Client disconnected.'))
	})
}

