module.exports = function(){
	var canvas = document.getElementById("viewport"),
		context = canvas.getContext("2d"),
		size = {
			width:window.innerWidth,
			height:window.innerHeight
		}

	canvas.width = size.width
	canvas.height = size.height

	var world = {
		grid:100
	}


	function grid(){
		for (var x = 0; x <= size.width+world.grid/2; x += world.grid) {
				context.moveTo(0.5 + x + -world.grid/2, -world.grid/2);
				context.lineTo(0.5 + x + -world.grid/2, size.height+world.grid/2 + -world.grid/2);
		}

		for (var x = 0; x <= size.height+world.grid/2; x += world.grid) {
				context.moveTo(-world.grid/2, 0.5 + x + -world.grid/2);
				context.lineTo(size.width+world.grid/2 + -world.grid/2, 0.5 + x + -world.grid/2);
		}
		context.strokeStyle = "#ddd";
		context.stroke();
	}
	grid();

}
