var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var coreJs = require('./js/core.js');


app.set('port', (process.env.PORT || 5000))


app.use(express.static(__dirname + '/auth'))

app.use(bodyParser.json())

app.post('/submit', function(request, response) {

  	response.send(request.body.firstName);

});

app.post('/split', function(request, response) {
    response.send(response.send(coreJs.calculate(request.body)));
})

app.get('/test', function(request, response){
	response.send("{'name':'PEYMAN'}");
})

app.listen(app.get('port'), function() {
  console.log("Node app is running at localhost:" + app.get('port'))
})
