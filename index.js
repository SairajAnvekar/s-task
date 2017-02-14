var express = require('express');
var app = express();

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
app.get('/', function(request, response) {
  response.render('pages/index');
});


app.get('/test', function(req, res, next) {  
     res.render('index');
});



app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});


