function bitgram() {
	this.canvas = null;
	this.ctx = null;
	this.mouseDown = false;
	this.canvasWidth = null;
	this.canvasHeight = null;
	this.pixelWidth = null;
	this.pixelHeight = null;
	this.eraserMode = false;

	this.pixels = [];
	for (var i = 0; i < 32; i++) {
		var row = [];
		for (var j = 0; j < 32; j++) {
			row.push("#ffffff");
		}
		this.pixels.push(row);
	}
}

bitgram.prototype.init = function() {
	this.canvas = document.getElementById("canvas");
	this.ctx = this.canvas.getContext('2d');
	this.sizeCanvas();
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

	$(this.canvas).mouseup(() => {
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
		for (var i = 0; i < 32; i++) {
			for (var j = 0; j < 32; j++) {
				this.setColor(this.pixels[i][j]);
				this.drawPixel(i, j);
			}
		}
	})
}

bitgram.prototype.sizeCanvas = function() {
	const winWidth = $(window).width();
	const winHeight = $(window).height();
	const size = winHeight < winWidth ? winHeight : winWidth;

	this.canvas.width = parseInt(size * .6);
	this.canvas.height = parseInt(size * .6);
	this.canvas.width -= this.canvas.width % 32;
	this.canvas.height -= this.canvas.height % 32;

	this.canvasWidth = this.canvas.width;
	this.canvasHeight = this.canvas.height;

	this.pixelWidth = this.canvasWidth/32;
	this.pixelHeight = this.canvasHeight/32;
}


bitgram.prototype.clear = function() {
	this.ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
	this.drawGrid();
}

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

		if (this.eraserMode) {
			if ((x + y) % 2 != 0) {
				this.setColor("#eeeeee");
			}
			else {
				this.setColor("white");
			}
		}

		this.drawPixel(x, y);

		this.setColor("black");
	}
}

/**
 * Takes x coord and y coord
 */
bitgram.prototype.drawPixel = function(xCoord, yCoord) {
	var x = parseInt(xCoord * this.pixelWidth);
	var y = parseInt(yCoord * this.pixelHeight);

	this.ctx.beginPath();
	this.ctx.fillRect(x, y, this.pixelWidth, this.pixelHeight);
	this.ctx.stroke();

	this.pixels[xCoord][yCoord] = this.ctx.fillStyle;
}

bitgram.prototype.setColor = function(color) {
	this.ctx.fillStyle = color;
	this.ctx.strokeStyle = color;
}

bitgram.prototype.drawGrid = function() {
	this.setColor("#eeeeee");
	for (var i = 0; i < 32; i++) {
		for (var j = 0; j < 32; j++) {
			if ((i + j) % 2 != 0) {
				this.drawPixel(i, j);
			}
		} 
	}
	this.setColor("black");
}

bitgram.prototype.setEraseMode = function() {
	this.eraserMode = true;
}

bitgram.prototype.setDrawMode = function() {
	this.eraserMode = false;
}
