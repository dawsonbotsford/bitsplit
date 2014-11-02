var fs = require('fs');
var chain = require('chain-node');

var identityObject = JSON.parse(fs.readFileSync('secret.json'));

chain.apiKeyId = identityObject.api_key;
chain.apiKeySecret = identityObject.api_secret;


chain.getAddress('18UMdtpPqM8mxH6bJUWCbhcdzgUYuicvPm', function(err, resp) { console.log(resp) });