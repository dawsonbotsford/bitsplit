var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var coreJs = require('./js/core.js');
var bitcoin = require('./bitcoin.js');
var Parse = require('node-parse-api').Parse;
var restler = require('restler');

bitcoin.sendTransaction("L1msFLvbZn64AfTVQyUVsPDNXEA3uT94FKKgscBd18cS2Qoit4ZT", "mjXX5eKz72g1rKzw4fEDZgVeWLpADeS42P", "mreeDW9xqyTPC6AmsFzuGLP3A33Yj4YhAp", 50000, function(err, response){
	console.log(response);
});

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


	// get transaction
	var input = request.body.payload.transaction.inputs[0].addresses[0];


	var outputs = [];
	//var outputsToValues = {};

	for(var i = 0; i < request.body.payload.transaction.outputs.length; i++)
	{
		console.log(request.body.payload.transaction.outputs[i].addresses);
		for(var j = 0; j < request.body.payload.transaction.outputs[i].addresses.length; j++)
		{
			var outputAddress = request.body.payload.transaction.outputs[i].addresses[j];
			if(outputAddress == input)
				continue;

			outputs.push(outputAddress);

		}
	}

	var index = outputs.indexOf(input);

	if(index > -1)
		outputs.splice(index, 1);

	var output = outputs[0];

	parse.findMany('Invoice', { invoice_publicKey: output, sender_publicKey: input }, function (err, response) {
  		
  			if(err != null) return;
  			if(response.results.length <1) return;
 //  		// send you an email notification
 	  		console.log(response);

  			//response.results[0].invoice_privateKey;

  			console.log("=============== FOUND INVOICE");
 	 		bitcoin.sendTransaction(response.results[0].invoice_privateKey, response.results[0].invoice_publicKey, response.results[0].receiver_publicKey, response.results[0].amount, function(a,b){})

  		parse.update('Invoice', response.results[0].objectId, { isPaid: true }, function (err, updatedresponse) {

  			log("UPDATED INVOICE");

  			if(err != null) return;

			parse.findMany('_User', { publicKey: response.results[0].receiver_publicKey }, function(ert, rp) {

				if(ert != null) return;
				if(rp.results.length < 1)
					return;

		  		parse.findMany('_User', { publicKey: input }, function(ert2, rp2) {

				if(ert2 != null) return;
				if(rp2.results.length < 1)
					return;

				console.log("SENDER PUB: " + rp);
				console.log("RECEIVER PUB: " + rp2);
					
				var data = {key: "hwPvctbIxMYbahS1rQnKfQ",
                message: {
                    from_email: "dawsonbotsford@gmail.com",
                    to: [
                        {
                          email: rp.results[0].username,
                          name: rp.results[0].fullName,
                          type: "to"
                        }
                      ],
                    autotext: 'true',
                    subject: rp2.results[0].fullName + ' paid you !',
                    html: rp2.results[0].fullName + ' Paid you !'
                  }
              }

              	console.log(data);
              	console.log(data.message.to[0]);

		  		restler.postJson("https://mandrillapp.com/api/1.0/messages/send.json", data);
		  		console.log("SENT EMAIL");

		  		})

		  });

		  		  // END OF UPDATE
		});

	});


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
