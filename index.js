$(document).ready(function() {
	var canvas = document.getElementById("canvas");
	var ctx = canvas.getContext('2d');
	var mouseDown = false;

	// we want the canvas to be 100 boxes wide, 100 boxes tall.
	const canvasWidth = $(canvas).width();
	const canvasHeight = $(canvas).height();

	const pixelWidth = canvasWidth/32;
	const pixelHeight = canvasHeight/32;

	function clear() {
		ctx.clearRect(0, 0, canvasWidth, canvasHeight);
	}

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

	$('#clear').click(clear);

	$("#erase").click(function() {
		ctx.fillStyle = "#ffffff";
		ctx.strokeStyle = "#ffffff";
	});

	$("#draw").click(function() {
		ctx.fillStyle = "#000000";
		ctx.strokeStyle = "#000000";	
	});
});