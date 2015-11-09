module.exports = function(socket){
	var io = this
	socket.on('window', function(obj){
		require('../broadcasts/canvas.js')(io,socket,obj)
	})
}
