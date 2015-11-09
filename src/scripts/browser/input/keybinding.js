var Mousetrap = require('../libraries/mousetrap.js')
//set initial keys in json
module.exports = function(preset_keys,move){


	Mousetrap.bind(preset_keys.up,move.up)
	Mousetrap.bind(preset_keys.down,move.down)
	Mousetrap.bind(preset_keys.left,move.left)
	Mousetrap.bind(preset_keys.right,move.right)
//	//Mod
	Mousetrap.bind(preset_keys.speed_mod+'+'+preset_keys.up,move.up)
	Mousetrap.bind(preset_keys.speed_mod+'+'+preset_keys.down,move.down)
	Mousetrap.bind(preset_keys.speed_mod+'+'+preset_keys.left,move.left)
	Mousetrap.bind(preset_keys.speed_mod+'+'+preset_keys.right,move.right)
}
