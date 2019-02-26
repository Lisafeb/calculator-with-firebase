// Initialize Firebase
var config = {
	apiKey: "AIzaSyA4sBNDh2s5Ira-eIk9Ho8QR6uMPNN0IQ0",
	authDomain: "calculator-6450c.firebaseapp.com",
	databaseURL: "https://calculator-6450c.firebaseio.com",
	projectId: "calculator-6450c",
	storageBucket: "calculator-6450c.appspot.com",
	messagingSenderId: "561516776329"
};
firebase.initializeApp(config);


// reference to messages collection
var messagesRef = firebase.database().ref('calculations');

// get all the keys from document
var key = document.querySelectorAll('#calculator span');
var operators = ['+', '-', 'x', '÷'];
var decimalAdded = false;

// add onclick event to all the keys and perform operations
for (var i = 0; i < key.length; i++) {
	key[i].onclick = function (e) {
		// Get the input and button values
		var input = document.querySelector('.screen');
		var inputVal = input.innerHTML;
		var btnVal = this.innerHTML;

		if (btnVal == 'C') {
			input.innerHTML = '';
			decimalAdded = false;
		}

		else if (btnVal == '=') {
			var equation = inputVal;
			var lastChar = equation[equation.length - 1];

			equation = equation.replace(/x/g, '*').replace(/÷/g, '/');

			if (operators.indexOf(lastChar) > -1 || lastChar == '.')
				equation = equation.replace(/.$/, '');

			if (equation)
				input.innerHTML = eval(equation);

			decimalAdded = false;
			saveCalculation(inputVal, input.innerHTML);
		}

		else if (operators.indexOf(btnVal) > -1) {
			// operator is clicked
			// get the last character from the equation
			var lastChar = inputVal[inputVal.length - 1];

			if (inputVal != '' && operators.indexOf(lastChar) == -1)
				input.innerHTML += btnVal;

			else if (inputVal == '' && btnVal == '-')
				input.innerHTML += btnVal;

			if (operators.indexOf(lastChar) > -1 && inputVal.length > 1) {

				input.innerHTML = inputVal.replace(/.$/, btnVal);
			}

			decimalAdded = false;
		}

		else if (btnVal == '.') {
			if (!decimalAdded) {
				input.innerHTML += btnVal;
				decimalAdded = true;
			}
		}

		// if any other key is pressed, just append it
		else {
			input.innerHTML += btnVal;
		}

		// prevent page jumps
		e.preventDefault();
	}

	//save message to firebase
	function saveCalculation(calculation, result) {
		var newMessageRef = messagesRef.push();
		newMessageRef.set({
			calculation: calculation,
			result: result
		});
	}
	//listen for new data
	messagesRef.on('value', gotData, errData);

	function gotData(data) {
		//first, get rid of the previous data list
		var list = document.getElementById('previousEquations');
		if (list.hasChildNodes()) {
			list.removeChild(list.childNodes[0]);
		}


		//then create a new list
		var ulNode = document.createElement('ul');
		ulNode.setAttribute('class', 'equationsList');

		list.appendChild(ulNode);

		var previousEquations = data.val();
		var keys = Object.keys(previousEquations);

		for (var i = keys.length - 10; i < keys.length; i++) {
			var k = keys[i];
			var calculation = previousEquations[k].calculation;
			var result = previousEquations[k].result;

			var calculatorNode = document.createElement('li');
			calculatorNode.className = 'list-group-item';
			var calculatorData = document.createTextNode(calculation + ' = ' + result)
			calculatorNode.appendChild(calculatorData);

			ulNode.appendChild(calculatorNode);
		}
	}

	function errData(err) {
		console.log('There was an error:' + err);
	}
}