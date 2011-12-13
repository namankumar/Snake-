document.ontouchstart = function(event) 
{ 
	event.preventDefault();
};

function Draw()
{
 	this.canvas = document.createElement('canvas');
 	this.canvas.style.border = "black 1px solid";
    document.getElementById('canvas').appendChild(this.canvas);
    this.context = this.canvas.getContext("2d");
	
	this.drawScore = function()
	{		
		var scoreY = this.canvas.height;
		var scoreX = this.canvas.width - 50;
		
		this.context.clearRect(scoreX, scoreY - 50, 50 ,50 );
		this.context.font = '20pt Comic Sans';
		this.context.fillText(game.score, scoreX, scoreY, 30);
	};

	this.clearCanvas = function()
	{
		this.context.clearRect(0,0,this.canvas.width,this.canvas.height);
	};
	this.drawFood = function(foodX, foodY)
	{		
		this.context.fillStyle = "rgb(400,0,0)";
	 	this.context.fillRect(foodX, foodY, gridsize, gridsize);		
	};
	
	this.drawSnake = function(snakeX, snakeY)
	{
		if(snake.body.some(snake.trip))
		{	
			game.reset();
            window.location = "gameOver.html";
		}
		
		this.context.fillStyle = "rgb(0,0,0)";

		//draw new body
		snake.body.push([snakeX, snakeY]);
	 	this.context.fillRect(snakeX, snakeY, gridsize-1, gridsize-1);
		
		//erase old body
		if(snake.body.length > snake.length)
		{
			eraseBody = snake.body.shift();
			this.context.clearRect(eraseBody[0], eraseBody[1], gridsize, gridsize);
		}

		if(food.eatFood())
		{
			game.updateScore();
			food.makeFood();
			snake.length++;

			if(snake.speed > 25)
			{
				clearInterval(game.timerHandle);
				snake.speed = snake.speed - 8;
				game.timerHandle = setInterval(snake.slither, snake.speed);
			}
		}
	};
}

function Move()
{
	this.speed = 120;
	
	this.left = function()
	{
		if(direction != 2)
		{
			direction = 4;
			x = x - gridsize;
			if(x < 0)
			 {
				game.reset();
				window.location = "gameOver.html";
			 }
			sketch.drawSnake(x, y);
		}
	};

	this.right = function()
	{
		if(direction !=4 )
		{
			direction = 2;
			x = x + gridsize;
			if(x  >= sketch.canvas.width)
			 {
				game.reset();
				window.location = "gameOver.html";
			 }
			sketch.drawSnake(x, y);
		}
	};

	this.up = function()
	{
		if(direction != 3)
		{
			direction = 1;
			y = y - gridsize;
			if(y < 0)
			 {
				game.reset();
				window.location = "gameOver.html";
			 }

			sketch.drawSnake(x , y);
		}
	};
	
	this.down = function()
	{
		if(direction != 1)
		{
			direction = 3;
			y = y + gridsize;
			if(y >=  sketch.canvas.height)
			 {
				game.reset();
				window.location = "gameOver.html";
			 }
			sketch.drawSnake(x , y);
		}
	};
	
	//keep moving
	this.slither = function()
	{
		switch(direction)
		{
			case 1: snake.up(); break;
			case 2: snake.right(); break;
			case 3: snake.down(); break;
			case 4: snake.left(); break;
			default: break;
		}
	};
	
	this.trip = function(body)
	{
		return (body[0] == x && body[1] == y);  
	};
}

//keyboard controls
function keyBoardControl(event)
{
	var keyCode;
	if(event == null)
	{
		keyCode = window.event.keyCode;
	}
	else
	{
		keyCode = event.keyCode;
	}
	switch(keyCode)
	{
		case 37: snake.left(); break; 
		case 38: snake.up(); break;
		case 39: snake.right(); break;
		case 40: snake.down(); break; 
		default: break;
	}
}

//keyboard controls
function mouseControl(event)
{
		moveX = event.layerX;
		moveY = event.layerY;
	
	if (direction == 1 || direction == 3)
	{
		if(moveX > x) 
			snake.right(); 
		else
			snake.left();
	}
	// else direction is left or right!
	else
	{
		if(moveY > y)
		 	snake.down();
		else
			snake.up();
	}
	return;	
}

function Food()
{
	this.foodLoc = [];
	
	this.isFoodOnBody = function(body)
	{
	  return (body[0] == food.foodLoc[0] && body[1] == food.foodLoc[1]);
	};
	
	//eat food
	this.eatFood = function()
	{
		return (this.foodLoc[0] == x && this.foodLoc[1] == y);
	};
	
	this.makeFood = function()
	{
		this.foodLoc = [
			Math.floor(Math.random()*(sketch.canvas.width/gridsize))*gridsize, 
			Math.floor(Math.random()*(sketch.canvas.height/gridsize))*gridsize
						];
		if(snake.body.some(this.isFoodOnBody))
			this.makeFood();
		else
			sketch.drawFood(this.foodLoc[0], this.foodLoc[1]);
	};
}

function Game()
{
	this.score = 0;
	this.timerHandle = null;
		
	this.updateScore = function()
	{
		this.score += 10;
		sketch.drawScore();
	};	
	
    this.storeData = function()
    {
		localStorage["snake_ts"] = this.score;
        
		if(localStorage["snake_hs"] == undefined || this.score > localStorage["snake_hs"])
        {	
            localStorage["snake_hs"]= this.score;
        }

        return true;
    };
    
    this.pause = function()
    {

        clearInterval(game.timerHandle);
        
    };
    
    this.popupCallBack = function(index)
	{   
        switch(index)
        {
            case 0:
                game.timerHandle = setInterval(snake.slither, snake.speed);
                break;
            case 1:
                this.quit();
                break;
            default: break;
        }
    
    };

    this.resume = function()
    {
        blackberry.ui.dialog.customAsk("Resume Game?", new Array["Resume", "Quit"], this.popupCallBack, 
            {
                title : "Game Paused.", 
                size : blackberry.ui.dialog.SIZE_SMALL, 
                position : blackberry.ui.dialog.LOC_CENTER
            }
        );
    };
    
    this.reset = function()
	{
		clearInterval(game.timerHandle);
        game.storeData();
//		alert( "Your score is " + this.score);
		snake.body = [];
		snake.length = 3;
		this.score = 0;
		x = 0;
		y = 0;
		direction = 2;
//		sketch.clearCanvas();
//		food.makeFood();		
//		snake.slither();

	};
    
    this.quit = function()
    {
        this.reset();
		blackberry.app.exit();
    };

	this.onDeviceRotation = function()
	{
		if(window.orientation == 0)
		{//portrait
			sketch.canvas.height = 1024;
		    sketch.canvas.width = 600;
		}
		else
		{//landscape
			sketch.canvas.height = 600;
		    sketch.canvas.width = 1024;
		}
		direction = 2;
		sketch.clearCanvas();
		food.makeFood();		
	};
	
}

function Main()
{	
	this.sketch = new Draw();

	this.gridsize = 20;

	if(window.orientation == 0)
	{//portrait
		sketch.canvas.height = 1024;
	    sketch.canvas.width = 600;
	}

	{	//landscape
		sketch.canvas.height = 600;
	    sketch.canvas.width = 1024;
	}

	//snake head position
	this.x = 0;
	this.y = 0;
	
	//current direction 
	this.direction = 2;
	
	game = new Game();
	
	this.food = new Food();
	this.snake = new Move();
			
	this.snake.body = [];
	this.snake.length = 3;
	this.food.makeFood();

	sketch.canvas.addEventListener('mousedown', mouseControl, false);
	game.timerHandle = setInterval(snake.slither, snake.speed);
	
	window.onorientationchange = game.onDeviceRotation();
	
   	blackberry.app.event.onBackground(game.pause());
    blackberry.app.event.onForeground(game.resume());
    
}