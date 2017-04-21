$(document).ready(function() {
	var bg = new bitgram();
	bg.init();
	
	//
	// Button handlers
	//
	$('#clear').click(function() {
		bg.clear();
	});
	$("#erase").click(function() {
		// set draw color to white
		bg.setEraseMode();
	});
	$("#draw").click(function() {
		bg.setDrawMode();
	});	
	// $("#color-submit").click(function() {
	// 	var color = parseInt($("#color-input").val()).toString(16);
	// 	while (color.length < 2) {
	// 		color = "0" + color;
	// 	}
	// 	color = "#" + color;
	// 	console.log(color);
	// 	bg.setColor(color);
	// });
});