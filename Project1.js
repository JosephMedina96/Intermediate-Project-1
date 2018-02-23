const baseURL = "https://api.genderize.io/?name="; // The base URL

// Gets the text field and sets up some variables for later
let name;
let gender;
let probability;

// Using the httpGetAsync function, we make a call to the API
function getNameGender() {
	name = document.getElementById("BoyOrGirl").value; // Sets the value of name to what is currently in the text field
	let fullURL = baseURL + name; // Appends the name to the base URL
	httpGetAsync(fullURL, assignGender); // Returns the API's response to the function assignGender
}

// Makes an async call for JSON (Vanilla Javascript)
function httpGetAsync(theUrl, callback) {
    let xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function() { 
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200)  
            callback(xmlHttp.responseText);
    }
    xmlHttp.open("GET", theUrl, true); // true for asynchronous 
    xmlHttp.send(null);
}

// Analyzes the data of the JSON response, then sets the webpage text
function assignGender(data) {
	let dataJSON = JSON.parse(data);
	let error = false;
	console.log(dataJSON);
	gender = dataJSON.gender;
	probability = dataJSON.probability;

	if(probability == 1) {
		probability = 100;
	} else {
		probability = probability * 100;
	}

	if(gender == null && probability == NaN) {
		error = true;
	}

	setText(name, gender, probability, error);
}

function setText(name, gender, probability, error) {
	let nameString = "Right! So your name is " + name + "!";
	let genderString = "I believe that you are a " + gender + ", correct?";
	let probabilityString = "I'm about " + probability + "% certain.";

	if(error) {
		genderString = "I haven't heard that name before.";
		probabilityString = "Are you a boy or a girl?";
	}

	// Makes the element visible
	document.getElementById("OakResponse").style.padding = "65pt";
	document.getElementById("OakResponse").style.visibility = "visible";

	document.getElementById("name").innerHTML = nameString;
	document.getElementById("gender").innerHTML = genderString;
	document.getElementById("probability").innerHTML = probabilityString;
}
