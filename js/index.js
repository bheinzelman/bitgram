$(document).ready(function() {
	var canvas = document.getElementById("canvas");
	var ctx = canvas.getContext('2d');
	var mouseDown = false;

	const winWidth = $(document).width();
	const winHeight = $(document).height();

	var size = winHeight < winWidth ? winHeight : winWidth;

	canvas.width = parseInt(size * .6);
	canvas.height = parseInt(size * .6);

	// we want the canvas to be 100 boxes wide, 100 boxes tall.
	const canvasWidth = $(canvas).width();
	const canvasHeight = $(canvas).height();

	const pixelWidth = canvasWidth/32;
	const pixelHeight = canvasHeight/32;

	//
	// Clears the canvas.
	//
	function clear() {
		ctx.clearRect(0, 0, canvasWidth, canvasHeight);
	}

	//
	// On a touch event, draw a pixel to the corresponding
	// box.
	function draw(event) {
		if (mouseDown) {
			var rect = canvas.getBoundingClientRect(), 
				scaleX = canvas.width / rect.width,    
				scaleY = canvas.height / rect.height;  
				
			var x = ((event.clientX - rect.left) * scaleX);
			var y = ((event.clientY - rect.top) * scaleY);

			x = parseInt(x/pixelWidth) * pixelWidth;
			y = parseInt(y/pixelHeight) * pixelHeight;


			ctx.beginPath();
			ctx.fillRect(x, y, pixelWidth, pixelHeight);
			ctx.stroke();
		}
	}

	//
	// Mouse event handlers
	//
	$("#canvas").mousemove(function(event) {
		draw(event);
	});

	$("#canvas").mousedown(function(event) {
		mouseDown = true;		
		draw(event);
	});

	$("#canvas").mouseup(function() {
		mouseDown = false;		
	});

	//
	// Mobile touch events
	//
	/* Drag */
	$(canvas).on("touchmove", function (e) {
  		var touch = e.touches[0];
  		var mouseEvent = new MouseEvent("mousemove", {
    		clientX: touch.clientX,
    		clientY: touch.clientY
  		});
  		canvas.dispatchEvent(mouseEvent);
	});

	/* init touch */
	$(canvas).on("touchstart", function (e) {
  		var touch = e.touches[0];
  		var mouseEvent = new MouseEvent("mousedown", {
    		clientX: touch.clientX,
    		clientY: touch.clientY
  		});
  		canvas.dispatchEvent(mouseEvent);
	});

	/* touch end */
	$(canvas).on("touchend", function (e) {
	  var mouseEvent = new MouseEvent("mouseup", {});
	  canvas.dispatchEvent(mouseEvent);
	});


	//
	// Button handlers
	//
	$('#clear').click(clear);
	$("#erase").click(function() {
		// set draw color to white
		ctx.fillStyle = "#ffffff";
		ctx.strokeStyle = "#ffffff";
	});
	$("#draw").click(function() {
		// set draw color to black
		ctx.fillStyle = "#000000";
		ctx.strokeStyle = "#000000";	
	});
});