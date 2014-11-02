var express = require('express')
var bodyParser = require('body-parser')
var app = express();

app.set('port', (process.env.PORT || 5000))
//

app.use(express.static(__dirname + '/auth'))

app.use(bodyParser.json())

app.post('/submit', function(request, response) {

  	response.send(request.body.firstName);
  	
});

app.listen(app.get('port'), function() {
  console.log("Node app is running at localhost:" + app.get('port'))
})