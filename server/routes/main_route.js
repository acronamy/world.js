module.exports = function(app,locals){
	app.get("*",function(req,res){
		res.render('index.jade',locals)
	})
}
