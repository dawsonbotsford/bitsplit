

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

function calculate() {
	
}