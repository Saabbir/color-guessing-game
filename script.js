// global variables
var h1 = document.querySelector('h1');
var resetButton = document.querySelector('#reset');
var	displayMessage = document.querySelector('#message');
var	colorDisplay = document.querySelector('#colorDisplay');
var	squares = document.querySelectorAll('.square');
var	modeButtons = document.querySelectorAll('.mode');
var	numSquares = 6;
var	colors;
var	pickedColor;

// this function will return one random RGB color
function randomRgbColor() {
	var r = Math.floor(Math.random() * 256);
	var g = Math.floor(Math.random() * 256);
	var b = Math.floor(Math.random() * 256);
	return 'rgb(' + r + ', ' + g + ', ' + b + ')';
}

// this function will return an array containing 3 or 6 random RGB color
function generateRgbColorsArray(howManyRgbColor) {
	var arr = [];
	for (var i = 0; i < howManyRgbColor; i++) {
		arr.push(randomRgbColor());
	}
	return arr;
}

// this function will return one item/element from `colors` array randomly
function pickColor() {
	var random = Math.floor(Math.random() * colors.length);
	return colors[random];
}

// this function will change all squares background color to `pickedColor`
function changeAllSquareBgColor(color) {
	for (var i = 0; i < squares.length; i++) {
		squares[i].style.background = color;
	}
}

// this is the beginning state of our program
function reset() {
	displayMessage.textContent = "";
	h1.style.background = 'steelblue';
	resetButton.textContent = "New Colors";
	colors = generateRgbColorsArray(numSquares);
	pickedColor = pickColor();
	colorDisplay.textContent = pickedColor;
	for (var i = 0; i < squares.length; i++) {
		if (colors[i]) {
			squares[i].style.display = 'block';
			squares[i].style.background = colors[i];
		} else {
			squares[i].style.display = 'none';
		}
	}	
}

// mode buttons event listener
function modeButtonsEventListener() {
	for (var i = 0; i < modeButtons.length; i++) {
		modeButtons[i].addEventListener('click', function() {
			modeButtons[0].classList.remove('selected');
			modeButtons[1].classList.remove('selected');
			this.classList.add('selected');
			(this.textContent === "Easy") ? numSquares = 3 : numSquares = 6;
			reset();
		});
	}
}

// squares event listener
function squaresEventListener() {
	for (var i = 0; i < squares.length; i++) {
		squares[i].addEventListener('click', function() {
			var clickedColor = this.style.background;
			if (clickedColor === pickedColor) {
				displayMessage.textContent = 'CORRECT!'
				resetButton.textContent = 'Play Again?'
				h1.style.background = clickedColor;
				changeAllSquareBgColor(clickedColor);
			} else {
				this.style.background = '#232323';
				displayMessage.textContent = 'TRY AGAIN!'
			}
		});
	}	
}

// clicking reset button will reset everything to the beginning state
function resetButtonEventListener() {
	resetButton.addEventListener('click', function() {
		reset();
	});	
}

// this function will run at the beginning state
function init() {
	// mode buttons event listener
	modeButtonsEventListener();

	// squares event listener
	squaresEventListener();

	// reset button event listener
	resetButtonEventListener();

	// start from here
	reset();	
}

init();