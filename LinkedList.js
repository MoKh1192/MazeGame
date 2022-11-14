/**********************************/
/* LinkedList "type"              */
/* Only singly linked with tail   */
/**********************************/
function LinkedList() {
  this.head = null;
  this.tail = null;
  this.size = 0;
}

//adds to end of list
LinkedList.prototype.addToEnd = function(value) {
  let newest = new ListNode(value, null);
  if (this.size == 0)
  {
    this.head = newest;
    this.tail = newest;
  }
  else{
    this.tail.next = newest;
    this.tail = newest;
  }
  this.size++;
}

//removes from beginning of list, returning the value removed
LinkedList.prototype.removeFirst = function() {

  if(this.size == 0) {
    throw "can't removeFirst when list is empty";
  }
  let answer = this.head.value;
  this.head = this.head.next;
  this.size -= 1;
  if(this.size == 0) {
    this.tail = null;
  }
  
  return  answer; 
}

//accesses the first value in the list
LinkedList.prototype.getFirst = function() {
  if(this.size == 0) {
    throw "ERROR!!!";
  }
  return this.head.value; 
}

//returns the size of the list
LinkedList.prototype.getSize = function() {
  return this.size;
}

//returns a string representation of the list
LinkedList.prototype.toString = function() {
  let answer = "";
  let temp = this.head;
  while(temp != null) {
    answer += temp.value + " -> ";
    temp = temp.next;
  }
  answer += "null";
  return answer;
}

//empties all the values out of the list
LinkedList.prototype.clear = function() {
  this.head = null;
  this.tail = null;
  this.size = 0;
}

/**********************************/
/* LinkedList advanced functions  */
/**********************************/

//gets the value at the given position in the LinkedList
LinkedList.prototype.getAtPosition = function(pos) {

}

//replaces the value at the given position in the LinkedList
//returns the replaced value
LinkedList.prototype.setAtPosition = function(pos, value) {

}

//inserts the given value at the given position in the list
LinkedList.prototype.insertAtPosition = function(pos, value) {

}

//removes the given value from the list (if it exists)
//only removes the first match if there are multiple
LinkedList.prototype.removeValue = function(value) {
}

//removes the value at the given position from the list
LinkedList.prototype.removePosition = function(pos) {

}

/**********************************/
/* LinkedList Iterator            */
/**********************************/
LinkedList.prototype.iterate = function(fun) {
  let temp = this.head;
  while(temp != null) {
    fun.call(temp.value);
    temp = temp.next;
  }
}

/**********************************/
/* ListNode "type"                */
/**********************************/
function ListNode(value, next) {
  this.value = value;
  this.next = next;
}

/**********************************/
/* LinkedList tests               */
/**********************************/

//uncomment to call the test functions
testLinkedListCommands();
//testAdvancedLinkedListCommands();

function testLinkedListCommands() {
  let list = new LinkedList();
  list.addToEnd("A");
  list.addToEnd("B");
  list.addToEnd("C");
  console.assert(list.toString() == "A -> B -> C -> null", "Failled addToEnd test");

  let answer = list.removeFirst();
  console.assert(answer + " : " + list.toString() == "A : B -> C -> null", "Failed removeFirst test");

  answer = list.getFirst();
  console.assert(answer + " : " + list.toString() == "B : B -> C -> null", "Failed getFirst test")

  answer = list.getSize();
  console.assert(answer + " : " + list.toString() == "2 : B -> C -> null", "Failed getSize test");

  list.clear();
  console.assert(answer == 2, "Failed clear test");

  list.addToEnd("A");
  answer = list.removeFirst();
  console.assert(answer + " : " + list.toString() == "A : null", "Failed removeFirst when only one item in list");
  console.assert(list.tail == null && list.head == null && list.size == 0, "Not setting head, tail, and size correctly when removeFirst is called and only one item in list");

  console.log("Finished testing LinkedList");
}

function testAdvancedLinkedListCommands() {
  let list = new LinkedList();
  list.addToEnd("A");
  list.addToEnd("B");
  list.addToEnd("C");

  console.assert(list.getAtPosition(0) + " : " + list == "A : A -> B -> C -> null", "Failed getAtPosition(0)");
  console.assert(list.getAtPosition(1) + " : " + list == "B : A -> B -> C -> null", "Failed getAtPosition(1)");
  console.assert(list.getAtPosition(2) + " : " + list == "C : A -> B -> C -> null", "Failed getAtPosition(2)");

  console.assert(list.setAtPosition(0, "D") + " : " + list == "A : D -> B -> C -> null", "Failed setAtPosition(0, D)");
  console.assert(list.setAtPosition(1, "M") + " : " + list == "B : D -> M -> C -> null", "Failed setAtPosition(1, M)");
  console.assert(list.setAtPosition(2, "X") + " : " + list == "C : D -> M -> X -> null", "Failed setAtPosition(2, X)");

  list.insertAtPosition(0, "A");
  console.assert(list.toString() == "A -> D -> M -> X -> null", "Failled insertAtPosition(0, A");
  list.insertAtPosition(4, "B");
  console.assert(list.toString() == "A -> D -> M -> X -> B -> null", "Failled insertAtPosition(4, B");
  list.insertAtPosition(2, "C");
  console.assert(list.toString() == "A -> D -> C -> M -> X -> B -> null", "Failled insertAtPosition(2, C");

  list.removeValue("B");
  console.assert(list.toString() == "A -> D -> C -> M -> X -> null", "Failled removeValue(B)");

  list.addToEnd("A");
  list.removeValue("A");
  console.assert(list.toString() == "D -> C -> M -> X -> A -> null", "Failed removeVaule(A)");

  list.removeValue("M");
  console.assert(list.toString() == "D -> C -> X -> A -> null", "Failed removeVaule(M)");

  list.removePosition(3);
  console.assert(list.toString() == "D -> C -> X -> null", "Failed removeVaule(3)");

  list.removePosition(1);
  console.assert(list.toString() == "D -> X -> null", "Failed removeVaule(1)");

  list.removePosition(0);
  console.assert(list.toString() == "X -> null", "Failed removeVaule(0)");

  console.log("Finished testing Advanced LinkedList");
}
