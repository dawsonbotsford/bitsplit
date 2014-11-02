var S = require('./Splitter.js');
var U = require('./User.js');


function TestSplit() {
		// Test class to test splitting simulation

		testSimpleCase1 = function(){
			var Brian = new U.User ("123",43.2);
			var Dawson = new U.User ("456", 17.2);
			var Peyman = new U.User ("789", 9.0);
			var if1 = new U.User ("111", 24);
			var if2 = new U.User ("222", 100);

			var users = [Brian, Dawson, Peyman, if1, if2];

			var split = new S.Splitter(users);
			users = split.simulate(users);
			assertEqual (users);
		}

		testSimpleCase2 = function(){
			var Brian = new U.User ("123",20);
			var Dawson = new U.User ("456", 20);
			var Peyman = new U.User ("789", 20);

			var users = [Brian, Dawson, Peyman];

			var split = new S.Splitter (users);
			users = split.simulate(users);
			assertEqual (users);
		}

		testSingleUser = function(){
			var Blah = new U.User("1", 10);
			var users = [Blah];

			var split = new S.Splitter(users);
			users = split.simulate(users);
			assertEqual(users);
		}

		assertEqual = function(users){
			var tol = .0000001;
			for (var i = 0; i < users.length - 1; i++) {
				if (Math.abs(users[i].paid - users[i + 1].paid) >= tol) {
					console.log ("Test case FAILED");
					break;
				}
			}
			console.log ("Test case passed");

		}

		console.log("Test case 1");
		testSimpleCase1();
		console.log ("Test case 2");
		testSimpleCase2();
		console.log("Test case 3");
		testSingleUser();

	}

TestSplit();
