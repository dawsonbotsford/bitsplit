exports.calculate = calculate;

var S = require('./splitLogic/Splitter.js');
var U = require('./splitLogic/User.js');

// array of { fullName: <str>, id: <str> }
function getUsers(callback)
{

	var dummyData = [
		{ fullName: "Dawson Botsford", id:"0x0001" },
		{ fullName:"Peyman Mo", id: "0x0002" }];

	callback(dummyData);
}

function getCurrentUser()
{
	var dummyData = { fullName: "Brian Newsom", id:"0x0003" };

	return dummyData;
}

function calculate(data) {
	var users = [];
	for (var i = 0; i < data.length ; i++) {
		users.push(new U.User(data[i].id, parseInt(data[i].paid)));
	}
	var split = new S.Splitter(users);
	txns = split.simulate(users);
	return txns;
}

// var dummyData = [
// 	{ id: "001", paid:"100" },
// 	{ id:"002", paid: "200" }];
//
//
// calculate(dummyData);
