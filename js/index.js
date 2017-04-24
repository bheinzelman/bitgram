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
	$("#colorpicker").spectrum({
    	color: "#000",
    	change: function(color) {
    		bg.setColor(color.toHexString());
		}
	});
});