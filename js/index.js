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
		bg.setColor("#ffffff");
	});
	$("#draw").click(function() {
		bg.setColor("#000000");
	});	
});