var base_speed = require('../../input/preset.js').speed.base

module.exports = function(multi){
	var multi = parseInt(multi.split('x')[1])
	return base_speed * multi
}
