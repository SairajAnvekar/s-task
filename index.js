var express      = require('express');
var mongoose     = require('mongoose');
var app          = express();
var Task         = require('./app/models/tasks.js');
var api          = require('./api/routes/api');
var cookieParser = require('cookie-parser');
var bodyParser   = require('body-parser');
var session      = require('express-session');
var passport     = require('passport');
var flash        = require('connect-flash');
var Sprint		   = require('./app/models/sprint.js');

mongoose.connect(process.env.MONGODB||'mongodb://localhost/projectManagement');



app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public'));
// views is directory for all template files

engines = require('consolidate');
app.engine('html', engines.nunjucks);
app.engine('ejs', engines.ejs);
app.set('view engine', 'ejs');
app.use('/node_modules', express.static(__dirname + '/node_modules/'));
app.set('views', __dirname + '/views');
app.use('/views', express.static(__dirname + '/views/'));


require('./config/passport')(passport); 

app.use(cookieParser()); // read cookies (needed for auth)
app.use(bodyParser()); // get information from html forms


app.use(session({
    secret: 'stask'
})); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session

require('./app/routes/users.js')(app, passport);

app.get('/', function(request, response) {
  response.render('pages/index');
});


app.get('/home', function(req, res, next) {  
     res.render('index');
});

app.get('/home/*', function(req, res, next) {  
     res.render('index');
});

app.get('/tasks',function(req, res, next){
  Task.find({},function(err, user) {	 
      res.json({"data":user});
      
  });

});









app.post('/updateTaskPos',function(req, res){
	
	var sprintId=req.body._id;
	var pos=req.body.pos;
	var posWorking=req.body.posOfWorking;
	var posStage=req.body.posOfStage;
	var posProd=req.body.posOfProd;
	
	var taskId=req.body.tid;
	var result=[];
	
	 Sprint.update({tasks:taskId},{ $pullAll: {tasks: [taskId] }},function(err, doc) {  

		Sprint.update({ _id:sprintId },{$push: {tasks: {$each: [taskId], $position: pos}}},function(err, doc) {
			
			result.push({"data":doc});			 
			Sprint.update({working:taskId},{ $pullAll: {working: [taskId] }},function(err, doc) {			
				Sprint.update({ _id:sprintId },{$push: {working: {$each: [taskId], $position: posWorking}}},function(err, doc) {
					result.push({"data":doc});
					
					Sprint.update({stage:taskId},{ $pullAll: {stage: [taskId] }},function(err, doc) {  
						Sprint.update({ _id:sprintId },{$push: {stage: {$each: [taskId], $position: posStage}}},function(err, doc) {
							result.push({"data":doc});
						
						 
							Sprint.update({prod:taskId},{ $pullAll: {prod: [taskId] }},function(err, doc) {  
								Sprint.update({ _id:sprintId },{$push: {prod: {$each: [taskId], $position: posProd}}},function(err, doc) {
									result.push({"data":doc});

									res.json(result);
								})
							});								 
						})
					});	

				})

			});	
			
		})
			
	 });	
	   
	   
	   


	
});





app.post('/updateTaskPos1',function(req, res){
	
	var sprintId=req.body._id;
	var pos=req.body.pos;
	var posWorking=req.body.posOfWorking;
	var posStage=req.body.posOfStage;
	var posProd=req.body.posOfProd;
	
	var taskId=req.body.tid;
	var result=[];
	
	 Sprint.update({tasks:taskId},{ $pullAll: {tasks: [taskId] }},function(err, doc) {  

		Sprint.update({ _id:sprintId },{$push: {tasks: {$each: [taskId], $position: pos}}},function(err, doc) {
			
			 result.push({"data":doc});
			
		})
			
	   });	
	   
	    Sprint.update({working:taskId},{ $pullAll: {working: [taskId] }},function(err, doc) {  

		Sprint.update({ _id:sprintId },{$push: {working: {$each: [taskId], $position: posWorking}}},function(err, doc) {
			
			 result.push({"data":doc});
			
		})
			
	   });	
	   
	    Sprint.update({stage:taskId},{ $pullAll: {stage: [taskId] }},function(err, doc) {  

		Sprint.update({ _id:sprintId },{$push: {stage: {$each: [taskId], $position: posStage}}},function(err, doc) {
			
			  result.push({"data":doc});
			
		})
			
	   });	

	    res.json(result);
	
});

app.use('/api/',api);

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});


