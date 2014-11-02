var User = Parse.Object.extend("User");

// { fullName, publicKey, email, password}
function createAccount(userObject, callback)
{
    var user = new User();
    alert(userObject.fullName);
    user.set("fullName", userObject.fullName);
    user.set("publicKey", userObject.publicKey);
    user.set("username", userObject.email);
    user.set("password", userObject.password);

    user.save(null, {
      success: function(user) {
        callback(null, user);
      },
      error: function(user, error) {
        callback(error, user);
      }
    });
}

function getAccounts(callback)
{
	var query = new Parse.Query(User);

	query.find({
		success: function(items) {
			var accounts = [];
			for(var i =0; i < items.length; i++)
			{
				var user = items[i];
				accounts.push({
					fullName: user.attributes.fullName,
					publicKey: user.attributes.publicKey,
					email: user.attributes.username,
					id: user.id
				})
			}
			callback(null, accounts);
		}
	});
}

function login(username, password, callback)
{
	Parse.User.logIn(username, password, {
	  success: function(user) {
	    callback(null, user);
	  },
	  error: function(user, error) {
	    callback(error, user);
	  }

	});
}

function getCurrentUser()
{
	var currentUser =
	{
		"id": Parse.User.current().id,
		"fullName": Parse.User.current().attributes.fullName,
		"email": Parse.User.current().attributes.username,
		"publicKey": Parse.User.current().attributes.publicKey
	};

	return currentUser;
}
