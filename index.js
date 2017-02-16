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

app.get('/home/dashboard', function(req, res, next) {  
     res.render('index');
});

app.get('/tasks',function(req, res, next){
  Task.find({},function(err, user) {	 
      res.json({"data":user});
      
  });

});

app.use('/api/',api);

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});


