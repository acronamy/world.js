(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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

},{"./getter/global.js":2,"./loader/asset.js":3,"./parser/px.js":4,"./parser/speed_string.js":5,"./setter/global.js":6}],2:[function(require,module,exports){
module.exports = function(prop){
	return this[prop]
}

},{}],3:[function(require,module,exports){

},{}],4:[function(require,module,exports){
module.exports = function(n,o){
	return n+"px"
}

},{}],5:[function(require,module,exports){
var base_speed = require('../../input/preset.js').speed.base

module.exports = function(multi){
	var multi = parseInt(multi.split('x')[1])
	return base_speed * multi
}

},{"../../input/preset.js":11}],6:[function(require,module,exports){
module.exports = function(prop,val){
	this[prop] = val
}

},{}],7:[function(require,module,exports){
var body = document.querySelector('body')

module.exports = function(server_canvas){

	body.style.backgroundImage = "url("+server_canvas.c+")"
}

},{}],8:[function(require,module,exports){
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

},{"./api/api.js":1,"./draw/world.js":7,"./input/moves.js":10,"./system/grid.js":13}],9:[function(require,module,exports){
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

},{"../libraries/mousetrap.js":12}],10:[function(require,module,exports){
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

},{"../api/api.js":1,"./keybinding.js":9,"./preset.js":11}],11:[function(require,module,exports){
module.exports = {
	speed:{
		base:5,
		active:{
			walking:"x1",
			running:"x2"
		},
		world:{
			waterfall:"x10"
		},
		pasive:{
			train:"x12"
		}
	},
	keys:{
		up:"up",
		down:"down",
		left:"left",
		right:"right",
		speed_mod:"shift"
	}
}

},{}],12:[function(require,module,exports){
/* mousetrap v1.5.3 craig.is/killing/mice */
(function(C,r,g){function t(a,b,h){a.addEventListener?a.addEventListener(b,h,!1):a.attachEvent("on"+b,h)}function x(a){if("keypress"==a.type){var b=String.fromCharCode(a.which);a.shiftKey||(b=b.toLowerCase());return b}return l[a.which]?l[a.which]:p[a.which]?p[a.which]:String.fromCharCode(a.which).toLowerCase()}function D(a){var b=[];a.shiftKey&&b.push("shift");a.altKey&&b.push("alt");a.ctrlKey&&b.push("ctrl");a.metaKey&&b.push("meta");return b}function u(a){return"shift"==a||"ctrl"==a||"alt"==a||
"meta"==a}function y(a,b){var h,c,e,g=[];h=a;"+"===h?h=["+"]:(h=h.replace(/\+{2}/g,"+plus"),h=h.split("+"));for(e=0;e<h.length;++e)c=h[e],z[c]&&(c=z[c]),b&&"keypress"!=b&&A[c]&&(c=A[c],g.push("shift")),u(c)&&g.push(c);h=c;e=b;if(!e){if(!k){k={};for(var m in l)95<m&&112>m||l.hasOwnProperty(m)&&(k[l[m]]=m)}e=k[h]?"keydown":"keypress"}"keypress"==e&&g.length&&(e="keydown");return{key:c,modifiers:g,action:e}}function B(a,b){return null===a||a===r?!1:a===b?!0:B(a.parentNode,b)}function c(a){function b(a){a=
a||{};var b=!1,n;for(n in q)a[n]?b=!0:q[n]=0;b||(v=!1)}function h(a,b,n,f,c,h){var g,e,l=[],m=n.type;if(!d._callbacks[a])return[];"keyup"==m&&u(a)&&(b=[a]);for(g=0;g<d._callbacks[a].length;++g)if(e=d._callbacks[a][g],(f||!e.seq||q[e.seq]==e.level)&&m==e.action){var k;(k="keypress"==m&&!n.metaKey&&!n.ctrlKey)||(k=e.modifiers,k=b.sort().join(",")===k.sort().join(","));k&&(k=f&&e.seq==f&&e.level==h,(!f&&e.combo==c||k)&&d._callbacks[a].splice(g,1),l.push(e))}return l}function g(a,b,n,f){d.stopCallback(b,
b.target||b.srcElement,n,f)||!1!==a(b,n)||(b.preventDefault?b.preventDefault():b.returnValue=!1,b.stopPropagation?b.stopPropagation():b.cancelBubble=!0)}function e(a){"number"!==typeof a.which&&(a.which=a.keyCode);var b=x(a);b&&("keyup"==a.type&&w===b?w=!1:d.handleKey(b,D(a),a))}function l(a,c,n,f){function e(c){return function(){v=c;++q[a];clearTimeout(k);k=setTimeout(b,1E3)}}function h(c){g(n,c,a);"keyup"!==f&&(w=x(c));setTimeout(b,10)}for(var d=q[a]=0;d<c.length;++d){var p=d+1===c.length?h:e(f||
y(c[d+1]).action);m(c[d],p,f,a,d)}}function m(a,b,c,f,e){d._directMap[a+":"+c]=b;a=a.replace(/\s+/g," ");var g=a.split(" ");1<g.length?l(a,g,b,c):(c=y(a,c),d._callbacks[c.key]=d._callbacks[c.key]||[],h(c.key,c.modifiers,{type:c.action},f,a,e),d._callbacks[c.key][f?"unshift":"push"]({callback:b,modifiers:c.modifiers,action:c.action,seq:f,level:e,combo:a}))}var d=this;a=a||r;if(!(d instanceof c))return new c(a);d.target=a;d._callbacks={};d._directMap={};var q={},k,w=!1,p=!1,v=!1;d._handleKey=function(a,
c,e){var f=h(a,c,e),d;c={};var k=0,l=!1;for(d=0;d<f.length;++d)f[d].seq&&(k=Math.max(k,f[d].level));for(d=0;d<f.length;++d)f[d].seq?f[d].level==k&&(l=!0,c[f[d].seq]=1,g(f[d].callback,e,f[d].combo,f[d].seq)):l||g(f[d].callback,e,f[d].combo);f="keypress"==e.type&&p;e.type!=v||u(a)||f||b(c);p=l&&"keydown"==e.type};d._bindMultiple=function(a,b,c){for(var d=0;d<a.length;++d)m(a[d],b,c)};t(a,"keypress",e);t(a,"keydown",e);t(a,"keyup",e)}var l={8:"backspace",9:"tab",13:"enter",16:"shift",17:"ctrl",18:"alt",
20:"capslock",27:"esc",32:"space",33:"pageup",34:"pagedown",35:"end",36:"home",37:"left",38:"up",39:"right",40:"down",45:"ins",46:"del",91:"meta",93:"meta",224:"meta"},p={106:"*",107:"+",109:"-",110:".",111:"/",186:";",187:"=",188:",",189:"-",190:".",191:"/",192:"`",219:"[",220:"\\",221:"]",222:"'"},A={"~":"`","!":"1","@":"2","#":"3",$:"4","%":"5","^":"6","&":"7","*":"8","(":"9",")":"0",_:"-","+":"=",":":";",'"':"'","<":",",">":".","?":"/","|":"\\"},z={option:"alt",command:"meta","return":"enter",
escape:"esc",plus:"+",mod:/Mac|iPod|iPhone|iPad/.test(navigator.platform)?"meta":"ctrl"},k;for(g=1;20>g;++g)l[111+g]="f"+g;for(g=0;9>=g;++g)l[g+96]=g;c.prototype.bind=function(a,b,c){a=a instanceof Array?a:[a];this._bindMultiple.call(this,a,b,c);return this};c.prototype.unbind=function(a,b){return this.bind.call(this,a,function(){},b)};c.prototype.trigger=function(a,b){if(this._directMap[a+":"+b])this._directMap[a+":"+b]({},a);return this};c.prototype.reset=function(){this._callbacks={};this._directMap=
{};return this};c.prototype.stopCallback=function(a,b){return-1<(" "+b.className+" ").indexOf(" mousetrap ")||B(b,this.target)?!1:"INPUT"==b.tagName||"SELECT"==b.tagName||"TEXTAREA"==b.tagName||b.isContentEditable};c.prototype.handleKey=function(){return this._handleKey.apply(this,arguments)};c.init=function(){var a=c(r),b;for(b in a)"_"!==b.charAt(0)&&(c[b]=function(b){return function(){return a[b].apply(a,arguments)}}(b))};c.init();C.Mousetrap=c;"undefined"!==typeof module&&module.exports&&(module.exports=
c);"function"===typeof define&&define.amd&&define(function(){return c})})(window,document);

},{}],13:[function(require,module,exports){
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

},{}]},{},[8])