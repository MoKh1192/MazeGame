//Requires PriorityQueue to be included first

//maze: 0 means a wall, 1 means open
function findPath(startRow, startCol, goalRow, goalCol, maze) {

  let start = new Location(startRow, startCol, 0);
  let goal = new Location(goalRow, goalCol);

  let frontier = new PriorityQueue(function(a, b) {
    return a.cost - b.cost;
  });

  frontier.enqueue(start);
  let cameFrom = {};
  let costSoFar = {};

  cameFrom[start.toString()] = start; //or None?
  costSoFar[start.toString()] = 0;

  while(!frontier.isEmpty()) {
    current = frontier.dequeue();

    if(current.equals(goal)) {
      break;
    }

    neighbors(current, maze).forEach(function(next) {
      let newCost = costSoFar[current.toString()] + walkCost(current, next);

      if(!(next.toString() in costSoFar) || newCost < costSoFar[next.toString()]) {
        costSoFar[next.toString()] = newCost;
        next.cost = newCost + next.heuristicDistance(goal);
        frontier.enqueue(next);
        cameFrom[next.toString()] = current;
      }
    });
  }

  //uh oh - how is it unreachable
  if(!(goal.toString() in cameFrom)) {
    console.log("The goal was unreachable...!  Something broke...");
    
    //get all the neighbors that are in bounds
    //and our current position
    //and pick one at random
    //THIS SHOULDN'T HAPPEN!
    let nei = neighbors(start);
    nei.push(start);

    return nei[Math.floor(Math.random()*nei.length)];
  }

  let temp = goal;
  while(!cameFrom[temp.toString()].equals(start))
    temp = cameFrom[temp.toString()];
  
  return temp;
}

//only walkable areas are 1 (clear)
//can change to support other things that can be walked on
//such as water, quicksand etc
function walkable(row, col, maze) {
  return maze[row][col] == 1;
}

//current and next need to be adjacent
//always 1
//could be changed to higher value if walking on something
//else like water, quicksand, etc
function walkCost(current, next) {
  return 1;
}

//the inbound neighbors of the current location in the maze
//above, below, left and right
//Could change more to make it walkable only from certain areas to others
//Like maybe you can't walk from water to ice?
function neighbors(loc, maze) {
  let row = loc.row;
  let col = loc.col;
  let answer = [];

  if(inBounds(row-1, col, maze) && walkable(row-1, col, maze)) {
    answer.push(new Location(row-1, col));
  }

  if(inBounds(row+1, col, maze) && walkable(row+1, col, maze)) {
    answer.push(new Location(row+1, col));
  }

  if(inBounds(row, col-1, maze) && walkable(row, col-1, maze)) {
    answer.push(new Location(row, col-1));
  }

  if(inBounds(row, col+1, maze) && walkable(row, col+1, maze)) {
    answer.push(new Location(row, col+1));
  }

  return answer;
}

function inBounds(row, col, maze) {
  return row >= 0 && col >= 0 && row < maze.length && col < maze[row].length;
}

//internal Location type for associating costs
function Location(row, col, cost) {
  this.row = row;
  this.col = col;
  this.cost = cost;
}

Location.prototype.equals = function(other) {
  return this.row == other.row && this.col == other.col;
}

//manhatten distance between two points
Location.prototype.heuristicDistance = function(other) {
  return Math.abs(this.row - other.row) + Math.abs(this.col - other.col);
}

Location.prototype.toString = function() {
  return this.row + ":" + this.col;
}
