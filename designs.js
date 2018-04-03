/**
* @description Pixel Art maker
* @description Udacity and Google Front-End Web Developer final project
* @description Author: Sašo Kunčič
* @description Last modify: 5.February 2018
* @constructor
*/

// Used color defined in index.html
let pickedColor = $('#buttonPickColor').css("background-color");
//console.log('initial pickedColor: '+ pickedColor);

// Color selection handler
$('#buttonPickColor').on('change', function() {
	pickedColor=hex2rgb($('#buttonPickColor').val());
	$(this).css('background-color', pickedColor);
	//console.log('pickedColor: '+ pickedColor);
});

/**
* @description Convert picked color from hexadecimal to rgb format
* @constructor
* @param {string} hex - Color in hexadecimal format
* @returns {string} Color in rgb format
*/
function hex2rgb(hex) {
	return 'rgb(' + (hex = hex.replace('#', '')).match(new RegExp('(.{' + hex.length/3 + '})', 'g')).map(function(l) { return parseInt(hex.length%2 ? l+l : l, 16) }) + ')';
}
// Sample to paste in Chrome developments console
//console.log(hex2rgb("#0000ff")); // [0, 0, 255] blue

/**
* @description Erase existing canvas and make new from entered values
* @constructor
*/
function makeGrid() {
	// Remove existing canvas
	$("#pixelCanvas").children().remove();

	const nRows = $('#inputHeight').val();
	const nColumns = $('#inputWeight').val();
	//const canvasParameters = 'Canvas parameters: \ncellColor:<' + pickedColor + '>\nnColumns:<' + nColumns + '>\nnRows:<' + nRows + '>'
	//alert(canvasParameters);

	// Create table with id
	let $pt = '<table id="puzzletable">';
	// For-loop to create rows
	for (let y=0; y<nRows; y++) {
		$pt += '<tr>';
		for (let x=0; x<nColumns; x++) {
			$pt += '<td>';
			$pt += '</td>';
		}
		$pt += '</tr>';
	}
	$pt += '</table>';
	$('#pixelCanvas').append($pt);
}

// Event handler: Reset canvas
$('#buttonSubmit').on('click', function(evt) {
	evt.preventDefault();
	makeGrid();
});

// Event handler: Help
$('#buttonHelp').on('click', function() {
	const helpString = 'Canvas usage:\n' +
		'to color single - click the cell\n' +
	    'to color multiple - click and drag the cells\n' +
	    'to erase - double-click the cell\n' +
	    'to erase all - use Reset Canvas button';
    alert(helpString);
});

// Event handler: Click to draw single cell
// to color click the cell
$('table').on('click','td',function(evt){
	$(evt.target).css('background-color', pickedColor);
});

// Event handler: Drag to draw multiple cells
// to draw drag over the canvas
$('table').on('mouseover','td', function (evt){
	evt.preventDefault();
	if (evt.buttons) {
		$(this).css("background-color",pickedColor);
	}
});

// Event handler: Doubleclick to erase cell content
// to erase doubleclicked cell
$('table').on('dblclick','td',function(evt){
	$(evt.target).css('background-color','');
});

// Create initial canvas when page is loaded
// Use inital setings from index.html for number of raws and columns
$( document ).ready(function(){
	makeGrid();
});