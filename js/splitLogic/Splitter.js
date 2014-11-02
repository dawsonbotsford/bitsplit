var T = require('./Transaction.js')

exports.Splitter = Splitter;

function Splitter(users) {

		var avg = function(users) {
		// Get avg so we can find how much each person owes
				var total = 0;
				for (var i = 0 ; i < users.length ; i++){
					user = users[i];
					total += user.paid;
				}

				avg = total / users.length;

				return avg;
			};


			var sortByDiff = function(users) {
				var sortable = [];
				for (var i = 0; i < users.length ; i++){
					var user = users[i];
					sortable.push([user, user.diff])
				}
				var tuple = sortable.sort(function(a,b) { return a[1] - b[1]});
				for (var i = 0; i < users.length ; i++){
					users[i] = tuple[i][0];
				}
				return users;
			}

			var print = function(users){
				for (var i = 0; i < users.length ; i++){
					user = users[i];
					console.log("ID: " + user.id + " Paid: " + user.paid + "\n");
				}
			}

		 	var setDiffs = function(users,avg)
			{
				for (var i = 0; i < users.length ; i++){
					var user = users[i];
					user.diff = user.paid - avg;
				}
				return users;
			}

			var split = function(users)
			{
				var tolerance = .00001;
				var begPtr = 0;
				var endPtr = users.length - 1;
	  		// users.length is the theoretical limit of the transactions needed
				var allTransactions = [];
				while(begPtr < endPtr) {
					if (Math.abs(users[begPtr].diff)  < tolerance) {
						begPtr += 1;
					}
					else if  (Math.abs(users[endPtr].diff) < tolerance) {
						endPtr -= 1;
					}
					else{
						// Find out which is larger
						var begDiff = Math.abs(users[begPtr].diff);
						var endDiff = Math.abs(users[endPtr].diff);
						var trans = new T.Transaction(users[begPtr], users[endPtr], (begDiff < endDiff) ? begDiff : endDiff );
						allTransactions.push({"userOne" : trans.userOne.id, "userTwo" : trans.userTwo.id, "txnValue" : trans.value});
						var ret = trans.simulate();
						users[begPtr] = ret[0];
						users[endPtr] = ret[1];
					}
				}
				return [users, allTransactions];
			}

			this.simulate = function(users) {
				var length = users.length;
				users = setDiffs(users, avg(users));
				//print(users);
				users = sortByDiff(users);
				//print(users);
				var ret = split(users);
				users = ret[0];
				allTransactions = ret[1];
				//print(users);
				console.log(allTransactions);
				return allTransactions;
				// print ();

			}
		}
