let context = null;
let canvas = null;
let level = 1;
let enemies;


//2D array of ints specifying what's in the maze
let maze;
let player;


//size of boxes in the maze
//canvas.height / boxHeight = num rows
//canvas.width / boxWidth = num cols
let boxWidth = 30;
let boxHeight = 30;

//row that the maze starts and ends at in the maze
let mazeFirstRow = 3;
let mazeLastRow = 10;

window.onload = function() {
    canvas = document.getElementById("canvas");
    context = canvas.getContext("2d");

    canvas.addEventListener('touchstart', handleTouchStart, false);
    canvas.addEventListener('touchmove', handleTouchMove, false);
    canvas.addEventListener('touchend', handleTouchEnd, false);

    canvas.addEventListener('mousedown', handleMouseDown, false);
    canvas.addEventListener('mousemove', handleMouseDrag, false);
    canvas.addEventListener('mouseup', handleMouseEnd, false);

    canvas.addEventListener('keypress', handleKeyPressed, false);
    canvas.addEventListener('keydown', handleKeyDown, false);
    canvas.addEventListener('keyup', handleKeyUp, false);
    window.addEventListener('keypress', handleKeyPressed, false);
    window.addEventListener('keydown', handleKeyDown, false);
    window.addEventListener('keyup', handleKeyUp, false);

    loadLevel();
    window.requestAnimationFrame(gameLoop);
}

//loads the current level information
function loadLevel() {
    //calls a function to create the 2D maze
    player = new Player(400, 50, 20, 20, "red");
    maze = generateMaze(Math.floor(canvas.height / boxHeight),
        Math.floor(canvas.width / boxWidth),
        mazeFirstRow, mazeLastRow);
  enemies = [];
  let bat = new Bat(3*canvas.width/4, (mazeLastRow+1)*boxHeight, 20, 20, "green");
  enemies.push(bat);
  let zombie = new Zombie(canvas.width/4, (mazeLastRow+1)*boxHeight, 20, 20, "black");
  enemies.push(zombie);

//generates the maze
maze = generateMaze(Math.floor(canvas.height / boxHeight), Math.floor(canvas.width / boxWidth) , mazeFirstRow, mazeLastRow);
}
//method that is called over and over again to update objects and draw them
function gameLoop() {
    update();
    render();

    window.requestAnimationFrame(gameLoop);
}

//tells all objects to update
function update() {
 
    player.update();
    if (player.hitMaze()) {
        loadLevel();
    } else if (beatLevel()) {
        level++;
        loadLevel();
    }
  for(let i = 0; i < enemies.length; i++) {
    enemies[i].update();
    if(player.hitRect(enemies[i].x, enemies[i].y, enemies[i].width, enemies[i].height )) {
    loadLevel();
  }
  }
  
}

function beatLevel() {
    return player.y > (mazeLastRow + 1) * boxHeight;
}

//tells all objects to draw themselves
function render() {
    context.clearRect(0, 0, canvas.width, canvas.height);

    context.strokeStyle = "black";
    context.strokeRect(0, 0, canvas.width, canvas.height);

    context.fillStyle = "pink";
    for (let row = 0; row < maze.length; row++) {
        for (let col = 0; col < maze[row].length; col++) {
            if (maze[row][col] == 0) { //wall
                context.fillRect(col * boxWidth, row * boxHeight, boxWidth, boxHeight);

            }
        }
    }

    context.fillStyle = "black";
    context.font = "20px Arial";
    context.fillText("Level " + level, 5, 20);
    player.render();
  for(let i = 0; i < enemies.length; i++) {
    enemies[i].render();
  }
}

//loc.x and loc.y are the coordinates of the down event (mouse or touch)
function handleDown(loc) {

}

//loc.x and loc.y are the coordinates of the drag event (mouse or touch)
function handleDrag(loc) {}

//loc.x and loc.y are the coordinates of the down event (mouse or touch)
function handleEnd(loc) {
    player.clickQueue.enqueue(loc);
}

/***************************************************************/
/* The next three functions you can edit to handle key events  */
/* Use the following command to get an integer representing    */
/* the key that was pressed:                                   */
/*     let x = event.which || event.keyCode;                   */
/* You can use this website to determine the key code for      */
/* different keys:                                             */
/*     https://keycode.info/                                   */
/* If you want to find out whether the "ALT", "CTRL", "META"   */
/* or "SHIFT" key was pressed when a key event occured, use    */
/* the altKey, ctrlKey, metaKey or shiftKey (boolean) property.*/
/***************************************************************/

//Called (potentially repeatedly if held) when a key is pressed
//When multiple keys are being pressed, only the last key will
//be repeated
function handleKeyPressed(event) {

}

//Called when a key is first pressed down
function handleKeyDown(event) {
    let x = event.which || event.keyCode;
    if (x == 83) {
        player.goal = null;
        player.clickQueue.clear();
    }
    //tries to make it go back from where it came from/undo`
    else if (x == 85 && player.clickStack.length != 0) {
        //empty out the forward Queue
        player.clickQueue.clear();
        player.goal = player.clickStack.pop();

    }
}

//Called when a key is released
function handleKeyUp(event) {

}

/**********************************/
/* Below are helper functions for */
/* dealing with events - you can  */
/* read, but probably should not  */
/* change.          




























































..........................................................................................................................

*/
/**********************************/
function handleMouseDown(e) {
    handleDown(getMousePos(canvas, e));
}

function handleTouchStart(e) {
    e.preventDefault();
    handleDown(getTouchPos(canvas, e));
}

function handleMouseDrag(e) {
    handleDrag(getMousePos(canvas, e));
}

function handleTouchMove(e) {
    e.preventDefault();
    handleDrag(getTouchPos(canvas, e));
}

function handleMouseEnd(e) {
    handleEnd(getMousePos(canvas, e));
}

function handleTouchEnd(e) {
    handleEnd(getTouchPos(canvas, e));
}

function getMousePos(canvasDom, mouseEvent) {
    let rect = canvasDom.getBoundingClientRect();
    return {
        x: mouseEvent.clientX - rect.left,
        y: mouseEvent.clientY - rect.top
    };
}

function getTouchPos(canvasDom, touchEvent) {
    let rect = canvasDom.getBoundingClientRect();
    return {
        x: touchEvent.touches[0].clientX - rect.left,
        y: touchEvent.touches[0].clientY - rect.top
    };
}

/**********************************/
/* Player "type"                  */
/**********************************/
function Player(x, y, width, height, color) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.color = color;
    this.goal = null;
    this.clickQueue = new Queue();
    this.clickStack = [];
}

//tells the player to render itself on the screen
Player.prototype.render = function() {
    context.fillStyle = this.color;
    context.fillRect(this.x - this.width / 2, this.y - this.height / 2, this.width, this.height);


    context.fillStyle = "red";
    context.strokeStyle = "black";

    if (this.goal != null) {
        context.fillRect(this.goal.x - 2, this.goal.y - 2, 5, 5);

        context.beginPath();
        context.moveTo(this.x, this.y);
        context.lineTo(this.goal.x, this.goal.y);
        context.stroke();
    }

    let last = this.goal;
    if (last != null) {
        this.clickQueue.list.iterate(function() {
            context.fillRect(this.x - 2, this.y - 2, 5, 5);

            context.beginPath();
            context.moveTo(last.x, last.y);
            context.lineTo(this.x, this.y);
            context.stroke();

            last = this;
        });
    }

    context.fillStyle = "cyan";
    last = this.goal;
    if (last == null) {
        last = {
            x: this.x,
            y: this.y
        };
    }
    for (let i = this.clickStack.length - 1; i >= 0; i--) {
        let current = this.clickStack[i];
        context.beginPath();
        context.moveTo(last.x, last.y);
        context.lineTo(current.x, current.y);
        context.stroke();
        last = current;
    }
    context.fillStyle = "red";
    context.strokeStyle = "black";

    if (this.goal != null) {
        context.fillRect(this.goal.x - 2, this.goal.y - 2, 5, 5);

        context.beginPath();
        context.moveTo(this.x, this.y);
        context.lineTo(this.goal.x, this.goal.y);
        context.stroke();

    }

}

//tells the player to update
Player.prototype.update = function() {
    if (this.goal == null && !this.clickQueue.isEmpty() == true) {
        this.clickStack.push({
            x: this.x,
            y: this.y
        });
        this.goal = this.clickQueue.dequeue();
    }
    if (this.goal != null) {
        if (this.moveTowards(this.goal.x, this.goal.y, 1)) {
            this.goal = null; //we reached the goal
        }
    }
}

Player.prototype.hitMaze = function() {

    let ulx = this.x - this.width / 2;
    let uly = this.y - this.height / 2;

    let urx = ulx + this.width - 1;
    let ury = uly;

    let llx = ulx;
    let lly = uly + this.height - 1;

    let lrx = urx;
    let lry = lly;

    return pointIsInWall(ulx, uly) ||
        pointIsInWall(urx, ury) ||
        pointIsInWall(llx, lly) ||
        pointIsInWall(lrx, lry);
}

function pointIsInWall(x, y) {

    col = Math.floor(x / boxWidth);
    row = Math.floor(y / boxHeight);

    if (col < 0 || col >= maze[0].length || row < 0 || row >= maze.length)
        return false;

    return maze[row][col] == 0;
}

Player.prototype.hitRect = function(x, y, width, height) {
    if (this.x > x + width || x > this.x + this.width)
        return false;

    if (this.y > y + height || y > this.y + this.height)
        return false;

    return true;
}

//newX and newY are where the player is traveling towards
//delta is how far the player can move in one time step
//in both the x and y direction (could try to get fancy
//and cap the hypotenuse instead)
//returns true if the player reaches the new location
//returns false otherwse
Player.prototype.moveTowards = function(newX, newY, delta) {

    let xDis = Math.abs(newX - this.x);
    let yDis = Math.abs(newY - this.y);
    let hyp = Math.sqrt(xDis * xDis + yDis * yDis);

    //must have made it...
    if (hyp == 0) {
        return true;
    }

    let deltaX = xDis * delta / hyp;
    let deltaY = yDis * delta / hyp;

    this.x = clampMovement(this.x, newX, deltaX);
    this.y = clampMovement(this.y, newY, deltaY);
    return this.x == newX && this.y == newY;
}

//returns the new 1D position of an object if it moves
//toward the new 1D position a positive delta distance
function clampMovement(currentPos, newPos, delta) {
    if (currentPos < newPos) {
        currentPos += delta;
        if (currentPos > newPos) {
            currentPos = newPos;
        }
    } else if (currentPos > newPos) {
        currentPos -= delta;
        if (currentPos < newPos) {
            currentPos = newPos;
        }
    }
    return currentPos;
}

/***********************************/
/* Procedural Maze Generation      */
/* Uses a depth first search       */
/***********************************/

//firstRow is first row where there is maze components
//lastRow is the last row where there is maze components
function generateMaze(rows, cols, firstRow, lastRow) {

    let grid = [];
    for (let i = 0; i < rows; i++) {
        grid.push([]);
    }

    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
            if (r >= firstRow && r <= lastRow)
                grid[r][c] = 0; //0 => can't walk
            else
                grid[r][c] = 1; //1 => walkable
        }
    }

    //open up the top middle
    grid[firstRow][cols / 2] = 1;

    let locs = [];
    locs.push({
        row: firstRow,
        col: cols / 2
    });

    while (locs.length != 0) {
        let next = locs.pop();

        let around = [{
                row: next.row - 1,
                col: next.col
            },
            {
                row: next.row + 1,
                col: next.col
            },
            {
                row: next.row,
                col: next.col - 1
            },
            {
                row: next.row,
                col: next.col + 1
            }
        ];

        let candidates = [];

        //randomize direction we try next
        shuffleArray(around);

        for (let i = 0; i < around.length; i++) {
            let spot = around[i];

            //in bounds and not on edge
            if (spot.row > firstRow && spot.col > 0 && spot.row < lastRow && spot.col < cols - 1) {


                //already broken down
                if (grid[spot.row][spot.col] == 1) {
                    continue;
                }

                //don't want to form an open square
                let makesSquare = false;
                for (let startRow = spot.row - 1; startRow <= spot.row; startRow++) {
                    for (let startCol = spot.col - 1; startCol <= spot.col; startCol++) {

                        let count = 0;
                        for (let r = startRow; r <= startRow + 1; r++) {
                            for (let c = startCol; c <= startCol + 1; c++) {
                                if (grid[r][c] == 1) {
                                    count++;
                                }
                            }
                        }

                        if (count == 3) {
                            makesSquare = true;
                            startCol = spot.col + 1;
                            startRow = spot.row + 1; //ends loops
                        }

                    }
                }

                if (!makesSquare) {
                    candidates.push(spot);
                }
            }
        }

        if (candidates.length != 0) {
            locs.push(next);

            let randomCand = candidates[Math.floor(Math.random() * candidates.length)];
            locs.push(randomCand);

            grid[randomCand.row][randomCand.col] = 1;
        }
    }

    let colExitA = Math.floor(cols / 4);
    let colExitB = Math.floor(3 * cols / 4);

    let r = lastRow;
    while (grid[r][colExitA] == 0) {
        grid[r][colExitA] = 1;
        r--;
    }

    r = lastRow;
    while (grid[r][colExitB] == 0) {
        grid[r][colExitB] = 1;
        r--;
    }

    return grid;
}

//Good algorithm from StackOverflow: https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        let temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
}
function Bat(x, y, width, height, color) {
  this.x = x;
  this.y = y;
  this.width = width;
  this.height = height;
  this.color = color;
}
Bat.prototype.render = function() {
  context.fillStyle = this.color;
  context.fillRect(this.x-this.width/2, this.y-this.height/2, this.width, this.height )
}
Bat.prototype.update = function() {
  this.moveTowards(player.x, player.y, 0.15);
  
}
Bat.prototype.moveTowards = Player.prototype.moveTowards; 

/******************************************/
/* Zombie "type"                          */
/******************************************/
function Zombie(x, y, width, height, color)
{
  this.x = x;
  this.y = y;
  this.row = Math.floor(y / boxHeight);
  this.col = Math.floor(x / boxWidth);
  this.width = width;
  this.height = height;
  this.color = color;
  this.nextLoc = null;

}
Zombie.prototype.render = function() 
{
  context.fillStyle = this.color;
  context.fillRect(this.x-this.width/2, this.y-this.height/2, this.width, this.height);
}
Zombie.prototype.update = function() {
  if(this.nextLoc == null) {
    this.row = Math.floor(this.y / boxHeight);
    this.cold = Math.floor(this.y / boxWidth);
    this.nextLoc = findPath(this.row, this.col, Math.floor(player.y/boxHeight), Math.floor(player.x/boxWidth), maze);

  }
  if(this.moveTowards(this.nextLoc.col * boxWidth + boxWidth/2, this.nextLoc.row * boxHeight + boxHeight/2, 0.25)) {
    this.nextLoc = null; 
  }
}
//everything moves towards an object like a player 
Zombie.prototype.moveTowards = Player.prototype.moveTowards;
