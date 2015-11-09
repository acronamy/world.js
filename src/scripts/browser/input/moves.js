var conf = require('./preset.js'),
		api = require('../api/api.js'),
		px = api.parse.px,
		speedX = api.parse.speedX,
		body = document.querySelector('body')

module.exports = function(){
	var x = 0,
			y = 0

	var initial_keys = {
		up:conf.keys.up||"up",
		down:conf.keys.down||"down",
		right:conf.keys.right||"right",
		left:conf.keys.left||"left",
		speed_mod:conf.keys.speed_mod||"shift"
	}

	var speed = {
		walking:speedX(conf.speed.active.walking),
		running:speedX(conf.speed.active.running)
	}

	function $move(){
		this.up = function(e){
			if(e.shiftKey) var use_speed = speed.running
			else var use_speed = speed.walking
			body.style.backgroundPosition = y+" "+px(x+=use_speed)
		}
		this.down = function(e){
			if(e.shiftKey) var use_speed = speed.running
			else var use_speed = speed.walking
			body.style.backgroundPosition = y+" "+px(x-=use_speed)
		}
		this.left = function(e){
			if(e.shiftKey) var use_speed = speed.running
			else var use_speed = speed.walking
			body.style.backgroundPosition = px(y+=use_speed)+" "+x
		}
		this.right = function(e){
			if(e.shiftKey) var use_speed = speed.running
			else var use_speed = speed.walking
			body.style.backgroundPosition = px(y-=use_speed)+" "+x
		}
	}
	var move = new $move()

	require('./keybinding.js')(initial_keys,move)
}
