var path = require('path'),
		conf = require('../config.json')
module.exports = function(mode,type){
	if(!mode&&!type) return conf
	else return conf[mode][type].replace("__root",path.resolve(__dirname,'../../'))
}
