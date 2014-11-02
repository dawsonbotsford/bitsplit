var rest = require('restler');

function getFacebookProfileInfo(access_token, callback)
{
	rest.get('https://graph.facebook.com/me', {headers: { Authorization: "Bearer " + access_token }}).on('complete', function(data) {
  		
  		callback({ firstName: data.first_name, lastName: data.last_name });
	});
}

getFacebookProfileInfo("CAAWXySB8UfQBAPVxj54ZAwJVvZAwOrK2doFieUB6PfJ6qSdW1YhxaaWNe9e0yUX9D1wAj9ZAo7U0GKnV1ExFn7wncTzLltjt2Nv5BkvMoWmsSxcIQS6xAFgs2POTy5A8mLM4HRdbJQI5XOwLpK3zIiJWsDIFSGzv8uZAf3bLZBCeuImnhzehPHBCkngz2a243oeQSSueWXTVeEkouFTRYHt1n0aekqm8ZD", function(info) { console.log(info) });