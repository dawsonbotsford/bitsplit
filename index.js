var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var coreJs = require('./js/core.js');
var bitcoin = require('./bitcoin.js');
var Parse = require('node-parse-api').Parse;
var restler = require('restler');

// bitcoin.sendTransaction("L1msFLvbZn64AfTVQyUVsPDNXEA3uT94FKKgscBd18cS2Qoit4ZT", "mjXX5eKz72g1rKzw4fEDZgVeWLpADeS42P", "mreeDW9xqyTPC6AmsFzuGLP3A33Yj4YhAp", 50000, function(err, response){
// 	console.log(response);
// });

var parse = new Parse("is3SIL9nDLCqIhhOp3S9v1f8K7PiXs9mTjRwDkPs", "av6qlnU6r8pl2Wt78wSVmmFoxiEvZwnGMNm97S0D");

app.set('port', (process.env.PORT || 5000))

app.use(express.static(__dirname + '/'))

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

		  parse.findMany('_User', { publicKey: request.body.receiver_publicKey }, function(ert, rp){

		  		parse.findMany('_User', { publicKey: request.body.sender_publicKey }, function(ert2, rp2) {

		  			console.log(rp);
		  			console.log(rp2);
					
				  var data = {key: "hwPvctbIxMYbahS1rQnKfQ",
                  message: {
                    from_email: "dawsonbotsford@gmail.com",
                    to: [
                        {
                          email: rp2.results[0].username,
                          name: rp2.results[0].fullName,
                          type: "to"
                        }
                      ],
                    autotext: 'true',
                    subject: rp.results[0].fullName + ' sent you an invoice!',
                    html: rp.results[0].fullName + ' has sent you an invoice with bit split. You need to pay ' + request.body.amount + ' satoshi to ' + keys.public_key
                  }
              }

              console.log(data);
              console.log(data.message.to[0]);

		  restler.postJson("https://mandrillapp.com/api/1.0/messages/send.json", data);

		  		})

		  });

//restler.postJson("https://mandrillapp.com/api/1.0/messages/send.json", data);

});

app.post('/paymentreceived', function(request, response) {

	response.send("{'success':true}");

});

app.get('/keys', function(request, response) {
	response.send(bitcoin.generateKeys());
});

app.post('/split', function(request, response) {
    response.send(response.send(coreJs.calculate(request.body)));
})

app.listen(app.get('port'), function() {
  console.log("Node app is running at localhost:" + app.get('port'))
})
