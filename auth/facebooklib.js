//var rest = require('restler');

function getFacebookProfileInfo(access_token, callback)
{
// 	rest.get('https://graph.facebook.com/me', {headers: { Authorization: "Bearer " + access_token }}).on('complete', function(data) {
  		
//   		callback({ firstName: data.first_name, lastName: data.last_name });
  		
// 	});
	
	// $.get("https://graph.facebook.com/me", {
	//          //data: { signature: authHeader },
	//          headers: {"Authorization":"Bearer " + access_token}},
	         
	//          //beforeSend: function(xhr){xhr.setRequestHeader('X-Test-Header', 'test-value');},
	//          function(resp) { 
	//          	debugger
	//          	console.log('Success!' + resp); }
	//       );
	$.ajax("https://graph.facebook.com/me", {
		headers: {"Authorization":"Bearer " + access_token},
		type: 'GET'
	});
}