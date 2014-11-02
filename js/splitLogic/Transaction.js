exports.Transaction = Transaction;
var User = require('./User.js')

function Transaction(userOne, userTwo, value){
		// User1 pays user2 value
		this.userOne = userOne;
		this.userTwo = userTwo;
		this.value = value;

		this.simulate = function() {
			// user1 must pay user2 value
			// If it occurs
			console.log("User: " + userOne.id + " pays User: " + userTwo.id + " " + value + " BTC");
			userOne.paid = (userOne.paid + value);
			userTwo.paid = (userTwo.paid - value);

			// Resettle diffs (TODO: Should this be actually calculated again?)
			userOne.diff = (userOne.diff + value);
			userTwo.diff = (userTwo.diff - value);
			return [userOne, userTwo];
		}


}
