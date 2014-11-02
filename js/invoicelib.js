var Invoice = Parse.Object.extend("Invoice");

// { receiver: "receiverPublicKey", sender: "senderPublicKey" }
// function createInvoice(invoiceObject, callback)
// {

// 	var invoiceObject = new Invoice;

// 	invoiceObject.set("message", invoiceObject.message || "");
// 	invoiceObject.set("invoice_privateKey", invoiceObject.invoice_privateKey);
// 	invoiceObject.set("invoice_publicKey", invoiceObject.invoice_publicKey);
// 	invoiceObject.set("receiver_publicKey", invoiceObject.receiver);

// 	invoiceObject.save(null, {
//       success: function(invoice) {
//         callback(null, invoice);
//       },
//       error: function(invoice, error) {
//         callback(error, invoice);
//       }
//     });
// }

function getInvoice(invoiceId, callback) 
{

	var query = new Parse.Query(Invoice);

	query.get(invoiceId, {
	success: function(invoice) {
		callback(null, {
				sender_publicKey: invoice.attributes.sender_publicKey,
				receiver_publicKey: invoice.attributes.receiver_publicKey,
				message: invoice.attributes.message,
				invoice_publicKey: invoice.attributes.invoice_publicKey,
				amount: invoice.attributes.amount,
				isPaid: invoice.attributes.isPaid,
				id: invoice.id
			});
		}
	});	
}

function getAllInvoicesForCurrentUser(callback) {

	var query = new Parse.Query(Invoice);

		query.equalTo("sender_publicKey", getCurrentUser().publicKey).find({
		success: function(items) {
			var invoices = [];
			for(var i =0; i < items.length; i++)
			{
				var invoice = items[i];
				invoices.push({
					sender_publicKey: invoice.attributes.sender_publicKey,
					receiver_publicKey: invoice.attributes.receiver_publicKey,
					message: invoice.attributes.message,
					invoice_publicKey: invoice.attributes.invoice_publicKey,
					amount: invoice.attributes.amount,
					isPaid: invoice.attributes.isPaid,
					id: invoice.id
				})
			}
			callback(null, invoices);
		}
	});

}