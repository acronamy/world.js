var Canvas = require('canvas'),
		path = require('path'),
		fs = require('fs'),
		__asset = path.resolve(__dirname,"../../../images"),
		Image = Canvas.Image


module.exports = function(io,socket,window){

	var canvas = new Canvas(200,200)

		ctx = canvas.getContext('2d')


	fs.readFile(path.join(__asset,'grass.png'), function(err, grass){
		if (err) throw err;
		img = new Image;
		img.src = grass;
		ctx.drawImage(img, 0, 0, 200, 200);
		draw()
	});

	function draw(){
		io.emit('redraw', {c:canvas.toDataURL()});
	}

}
