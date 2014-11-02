var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var coreJs = require('./js/core.js');
var bitcoin = require('./bitcoin.js');
var Parse = require('node-parse-api').Parse;

var parse = new Parse("is3SIL9nDLCqIhhOp3S9v1f8K7PiXs9mTjRwDkPs", "av6qlnU6r8pl2Wt78wSVmmFoxiEvZwnGMNm97S0D");

app.set('port', (process.env.PORT || 5000))

app.use(express.static(__dirname + '/'))

//app.use(express.static(__dirname + '/css'))

app.use(bodyParser.json())

app.post('/invoice', function(request, response) {

	var keys = bitcoin.generateKeys();

	var invoiceObject =
	{ 
			message: request.body.message,
			invoice_privateKey: keys.private_key,
			invoice_publicKey: keys.public_key,
			receiver_publicKey: request.body.receiver_publicKey,
			sender_publicKey: request.body.sender_publicKey,
			amount: request.body.amount,
			isPaid: false
	};

	parse.insert('Invoice', invoiceObject, 
	 	function(err, res) {

  			response.send(res);
	})

});

app.post('/paymentreceived', function(request, response) {


	// get transaction
	var inputs = request.body.payload.input_addresses;
	var outputs = request.body.payload.output_addresses;

	response.send("{'success':true}");

})

app.post('/split', function(request, response) {
    response.send(response.send(coreJs.calculate(request.body)));
})

app.listen(app.get('port'), function() {
  console.log("Node app is running at localhost:" + app.get('port'))
})
