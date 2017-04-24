/**
 * constructor
 */
function bitgram() {
	this.canvas = null;
	this.ctx = null;

	// boolean if the mouse is being held down
	this.mouseDown = false;

	// size of the canvas
	this.canvasWidth = null;
	this.canvasHeight = null;

	// how big each pixel should be
	this.pixelWidth = null;
	this.pixelHeight = null;

	// bool are we erasing
	this.eraserMode = false;

	// array to store pixels
	this.pixels = null;

	// current fill color
	this.color = "black";

	// the amount of pixels per axis
	this.pixelCount = 32;
}

/**
 * Call to init the canvas.
 * Must be called before use.
 */
bitgram.prototype.init = function() {
	this.canvas = $("#canvas").get(0);

	this.ctx = this.canvas.getContext('2d');

	this.sizeCanvas();
	this.clearPixels();
	this.drawGrid();

	//
	// Mouse event handlers
	//
	$(this.canvas).mousemove((event) => {
		this.draw(event);
	});

	$(this.canvas).mousedown((event) => {
		this.mouseDown = true;		
		this.draw(event);
	});

	$(window).mouseup(() => {
		this.mouseDown = false;		
	});

	//
	// Mobile touch events
	//
	/* Drag */
	$(this.canvas).on("touchmove", (e) => {
  		var touch = e.touches[0];
  		var mouseEvent = new MouseEvent("mousemove", {
    		clientX: touch.clientX,
    		clientY: touch.clientY
  		});
  		this.canvas.dispatchEvent(mouseEvent);
	});

	/* init touch */
	$(this.canvas).on("touchstart", (e) => {
  		var touch = e.touches[0];
  		var mouseEvent = new MouseEvent("mousedown", {
    		clientX: touch.clientX,
    		clientY: touch.clientY
  		});
  		this.canvas.dispatchEvent(mouseEvent);
	});

	/* touch end */
	$(this.canvas).on("touchend", (e) => {
	  var mouseEvent = new MouseEvent("mouseup", {});
	  this.canvas.dispatchEvent(mouseEvent);
	});

	// resize the canvas 
	$(window).resize(() => {
		this.sizeCanvas();
		this.drawGrid();
		var prevColor = this.color;

		var prevEraseMode = this.eraserMode;
		this.eraserMode = false;

		for (var i = 0; i < this.pixelCount; i++) {
			for (var j = 0; j < this.pixelCount; j++) {
				var cellColor = this.pixels[i][j];
				if (cellColor != null) {
					this.setColor(cellColor);
					this.drawPixel(i, j);
				}
			}
		}
		this.setColor(prevColor);
		this.eraserMode = prevEraseMode;
	})
}

/**
 * Sizes the canvas as a perfect square
 */
bitgram.prototype.sizeCanvas = function() {
	const winWidth = $(window).width();
	const winHeight = $(window).height();
	const size = winHeight < winWidth ? winHeight : winWidth;

	this.canvas.width = parseInt(size * .6);
	this.canvas.height = parseInt(size * .6);
	this.canvas.width -= this.canvas.width % this.pixelCount;
	this.canvas.height -= this.canvas.height % this.pixelCount;

	this.canvasWidth = this.canvas.width;
	this.canvasHeight = this.canvas.height;

	this.pixelWidth = this.canvasWidth/this.pixelCount;
	this.pixelHeight = this.canvasHeight/this.pixelCount;
}

/**
 * Clears all the marks from the canvas.
 */
bitgram.prototype.clear = function() {
	this.ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
	this.clearPixels();
	this.drawGrid();
}

/**
 * Given a mouse event, draw a pixel in the corresponding cell
 * in which the mouse touched.
 */
bitgram.prototype.draw = function(event) {
	if (this.mouseDown) {
		var rect = this.canvas.getBoundingClientRect(), 
			scaleX = this.canvas.width / rect.width,    
			scaleY = this.canvas.height / rect.height;  
			
		var x = ((event.clientX - rect.left) * scaleX);
		var y = ((event.clientY - rect.top) * scaleY);

		//get the cell indices
		x = parseInt(x/this.pixelWidth);
		y = parseInt(y/this.pixelHeight);

		// if in erase mode, draws grid appropriately
		var prevColor = this.color;

		if (this.eraserMode) {
			if ((x + y) % 2 != 0) {
				this.setColor("#eeeeee");
			}
			else {
				this.setColor("white");
			}
		}

		this.drawPixel(x, y);

		this.setColor(prevColor);
	}
}

/**
 * Takes x coord and y coord and fills in a cell.
 */
bitgram.prototype.drawPixel = function(xCoord, yCoord, save=true) {
	var x = parseInt(xCoord * this.pixelWidth);
	var y = parseInt(yCoord * this.pixelHeight);

	this.ctx.beginPath();
	this.ctx.fillRect(x, y, this.pixelWidth, this.pixelHeight);
	this.ctx.stroke();

	if (this.eraserMode && save) {
		this.pixels[xCoord][yCoord] = null;
	}
	else if (save) {
		this.pixels[xCoord][yCoord] = this.color;
	}
	
}

/**
 * Sets the fill color.
 */
bitgram.prototype.setColor = function(color) {
	this.ctx.fillStyle = color;
	this.ctx.strokeStyle = color;
	this.color = color;
}

/**
 * Draws the background grid
 */
bitgram.prototype.drawGrid = function() {
	var prevColor = this.color;
	this.setColor("#eeeeee");
	for (var i = 0; i < this.pixelCount; i++) {
		for (var j = 0; j < this.pixelCount; j++) {
			if ((i + j) % 2 != 0) {
				this.drawPixel(i, j, false);
			}
		} 
	}
	this.setColor(prevColor);
}

/**
 * Puts the canvas in erase mode.
 */
bitgram.prototype.setEraseMode = function() {
	this.eraserMode = true;
}

/**
 * Puts the canvas in draw mode.
 */
bitgram.prototype.setDrawMode = function() {
	this.eraserMode = false;
	this.setColor(this.color);
}

/**
 * clears the pixel array storage. 
 */
bitgram.prototype.clearPixels = function() {
	this.pixels = [];
	for (var i = 0; i < this.pixelCount; i++) {
		var row = [];
		for (var j = 0; j < this.pixelCount; j++) {
			row.push(null);
		}
		this.pixels.push(row);
	}
}
