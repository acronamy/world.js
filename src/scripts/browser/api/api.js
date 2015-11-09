var namespace = "worldjs"
window[namespace] = {}

var api = {
	load:{
		asset:require('./loader/asset.js')
	},
	parse:{
		speedX:require('./parser/speed_string.js'),
		px:require('./parser/px.js')
	},
	set:{
		global:require('./setter/global.js').bind(window[namespace])
	},
	get:{
		global:require('./getter/global.js').bind(window[namespace])
	}
}

//the api is a usefull set of functions
module.exports = api
