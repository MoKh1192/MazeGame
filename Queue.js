//requires LinkedList.js to be included first

/**********************************/
/* Queue "type"                   */
/**********************************/
function Queue() {
  this.list = new LinkedList();
}
  
Queue.prototype.enqueue = function(value) {

  this.list.addToEnd(value);
}
Queue.prototype.dequeue = function() {

  if (this.list.size == 0)
  {
    throw " ERRORRRWEWVWO";
  
  }
  return this.list.removeFirst(); 
  }
Queue.prototype.peek = function() {
  if(this.list.size == 0)
  {
    throw "erororooroororororoororoorooror";
  }
  return this.list.head.value;
}
Queue.prototype.size = function() {
  return this.list.size;
}

Queue.prototype.isEmpty = function() {

  if(this.list.size == 0)
  {
    return true;
  }
  else
  {
    return false;
  }
}
Queue.prototype.clear = function() {
  this.list.clear();
}
  
Queue.prototype.toString = function() {
  return "front: " + this.list.toString();
}

/**********************************/
/* Queue tests                    */
/**********************************/

//uncomment to call the test functions
testQueueCommands();

function testQueueCommands() {
  let queue = new Queue();
  queue.enqueue("A");
  queue.enqueue("B");
  queue.enqueue("C");
  console.assert(queue.toString() == "front: A -> B -> C -> null", "Failed enqueue test");

  let answer = queue.dequeue();
  console.assert(answer + " : " + queue.toString() == "A : front: B -> C -> null", "Failed dequeue test");

  answer = queue.peek();
  console.assert(answer + " : " + queue.toString() == "B : front: B -> C -> null", "Failed peek test")

  answer = queue.size();
  console.assert(answer + " : " + queue.toString() == "2 : front: B -> C -> null", "Failed size test");

  queue.clear();
  answer = queue.size();
  console.assert(answer == 0, "Failed clear test");

  console.log("Finished testing Queue");
}
