var colors = require('colors')

module.exports = function(mode){
	return console.log(colors.magenta(
		"\n------------------",
		"\nName:",colors.white(mode.name),
		"\nPort:",colors.white(mode.port),
		"\nDevelopment:",colors.white(mode.dev),
		"\nSocket.io:",colors.white(mode.socketIO),
		"\n------------------"
	))
}
