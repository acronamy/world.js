var socket = window.socket,
		api = require('./api/api.js'),
		set = api.set.global,
		get = api.get.global

//clients live here
set('client',[])

require('./api/api.js')//set window object


var redraw = socket.emit('window', {width:window.innerWidth,height:window.innerHeight})

window.onresize = redraw

require('./system/grid.js')()
require('./input/moves.js')()

socket.on('redraw',function(c){
	require('./draw/world.js')(c)
})
