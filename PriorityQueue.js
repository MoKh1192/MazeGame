7//requires MinHeap.js to be included first

/**********************************/
/* PriorityQueue "type"           */
/**********************************/
function PriorityQueue(comparator) {
  this.heap = new MinHeap(comparator);
}

PriorityQueue.prototype.enqueue = function(value) {
  this.heap.add(value);
}


PriorityQueue.prototype.dequeue = function() {
  if(this.heap.isEmpty() == true)
  {
    throw "error";
  }
  return this.heap.remove();
}

PriorityQueue.prototype.peek = function() {
  if(this.heap.count == 0) 
  {
    throw "error";
  }
  return this.heap.array[0];
}

PriorityQueue.prototype.size = function() {
  return this.heap.size();
}

PriorityQueue.prototype.isEmpty = function() {
  if(this.heap.count == 0)
  {
    return true;
  }
  else
  {
    return false;
  }
  
}

PriorityQueue.prototype.clear = function() {
  this.heap.clear();
}

PriorityQueue.prototype.toString = function() {
  return this.heap.toString();
}

/**********************************/
/* PriorityQueue tests            */
/**********************************/

//uncomment to call the test functions
testPriorityQueueCommands();

function testPriorityQueueCommands() {
  let queue = new PriorityQueue();
  queue.enqueue(1);
  queue.enqueue(2);
  queue.enqueue(3);
  console.assert(queue.toString() == "[1, 2, 3]", "Failed enqueue test");

  let answer = queue.dequeue();
  console.assert(answer + " : " + queue.toString() == "1 : [2, 3]", "Failed dequeue test");

  answer = queue.peek();
  console.assert(answer + " : " + queue.toString() == "2 : [2, 3]", "Failed peek test")

  answer = queue.size();
  console.assert(answer + " : " + queue.toString() == "2 : [2, 3]", "Failed size test");

  queue.clear();
  answer = queue.size();
  console.assert(answer == 0, "Failed clear test");

  console.log("Finished testing PriorityQueue");
}
