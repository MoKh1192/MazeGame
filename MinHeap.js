/*******************************/
/* MinHeap "type"              */
/*******************************/

//comparator is a function that determines how
//two differnet values in the heap are to be compated
function MinHeap(comparator) {
  this.comparator = comparator;
  this.count = 0;
  this.array = [];

  //if there is no comparator, default to subtraction
  if(this.comparator == undefined ||
     this.comparator == null) {
    this.comparator = function(a, b) {
      return a - b;
    }
  }
}

MinHeap.prototype.clear = function() {
  this.count = 0;
  this.array = [];
}

//returns the size of the heap
MinHeap.prototype.size = function() {
  return this.count; 
}

//returns whether the heap is empty
MinHeap.prototype.isEmpty = function() {
  if(this.count == 0) {
    return true;
  }
  else {
    return false;
  }
}

MinHeap.prototype.toString = function() {
  let answer = "[";
  for(let i = 0; i < this.size(); i++) {
    answer += this.array[i];
    if(i != this.size()-1)
      answer += ", ";
  }
  answer += "]";
  return answer;
}

//returns the smallest value in the heap
MinHeap.prototype.peek = function() {
  if(this.count == 0) {
    throw error; 
  }
  return this.array[i];
}

//adds the value to the heap, maintaining the MinHeap property
MinHeap.prototype.add = function(value) {
  let pos = this.count;
  while(pos != 0 && this.comparator(value, this.array[Math.floor((pos-1)/2)]) < 0)
  {
    this.array[pos] = this.array[Math.floor((pos-1)/2)];
    pos = Math.floor((pos-1)/2);
  }
  this.array[pos] = value;
  this.count++;

}

//removes the smallest value from the heap, maintaining the MinHeap property
MinHeap.prototype.remove = function() {
  if(this.size() == 0) {
    throw "Can't remove from MinHeap with size 0";
  }

  //the value we will return
  let minValue = this.array[0];
  
  //the value we are promoting to the root
  let parentValue = this.array[this.count-1];

  //we are currently look at the root
  let pos = 0;

  //keep going until done
  while(true) {

    //two children of the current position
    let leftChild = 2*pos + 1;
    let rightChild = 2*pos + 2;

    //no children, so we put down here!
    if(leftChild > this.count-2) {
      this.array[pos] = parentValue;
      break;
    }
    //have a left, but no right
    else if(rightChild > this.count-2) {
      //the value we're trying to place is bigger than the left - so move the left up!
      if(this.comparator(parentValue, this.array[leftChild]) > 0) {
        this.array[pos] = this.array[leftChild];
        pos = leftChild;
      }
      //the value we're trying to palce is smaller than the left - so put down here!
      else {
        this.array[pos] = parentValue;
        break;
      }
    }
    //have a left and an right
    else {
      //left is smaller
      if(this.comparator(this.array[leftChild], this.array[rightChild]) < 0) {
        if(this.comparator(parentValue, this.array[leftChild]) > 0) {
          this.array[pos] = this.array[leftChild];
          pos = leftChild;
        }
        else {
          this.array[pos] = parentValue;
          break;
        }
      }
      //right is smaller
      else {
        if(this.comparator(parentValue, this.array[rightChild]) > 0) {
          this.array[pos] = this.array[rightChild];
          pos = rightChild;
        }
        else {
          this.array[pos] = parentValue;
          break;
        }
      } 
    }
  }

  this.count--;
  return minValue;
} 

/**********************************/
/* MinHeap tests                  */
/**********************************/

//uncomment to call the test functions
testMinHeapCommands();

function testMinHeapCommands() {
  let minHeap = new MinHeap();
  minHeap.add(5);
  minHeap.add(2);
  minHeap.add(7);
  minHeap.add(1);
  console.assert(minHeap.toString() == "[1, 2, 7, 5]", "Failed add test");

  minHeap.add(9);
  minHeap.add(0);
  minHeap.add(6);
  minHeap.add(4);
  minHeap.add(10);
  minHeap.add(15);
  minHeap.add(3);
  minHeap.add(-4);
  console.assert(minHeap.toString() == "[-4, 2, 0, 4, 3, 1, 6, 5, 10, 15, 9, 7]", "Failed add test #2");

  let answer = minHeap.remove();
  console.assert(answer + " " + minHeap.toString() == "-4 [0, 2, 1, 4, 3, 7, 6, 5, 10, 15, 9]", "Failed remove test");

  answer = minHeap.remove();
  console.assert(answer + " " + minHeap.toString() == "0 [1, 2, 6, 4, 3, 7, 9, 5, 10, 15]", "Failed remove test #2");

  answer = minHeap.remove();
  console.assert(answer + " " + minHeap.toString() == "1 [2, 3, 6, 4, 15, 7, 9, 5, 10]", "Failed remove test #3");

  answer = minHeap.remove();
  console.assert(answer + " " + minHeap.toString() == "2 [3, 4, 6, 5, 15, 7, 9, 10]", "Failed remove test #4");

  answer = minHeap.remove();
  console.assert(answer + " " + minHeap.toString() == "3 [4, 5, 6, 10, 15, 7, 9]", "Failed remove test #5");

  answer = minHeap.remove();
  console.assert(answer + " " + minHeap.toString() == "4 [5, 9, 6, 10, 15, 7]", "Failed remove test #6");

  answer = minHeap.remove();
  console.assert(answer + " " + minHeap.toString() == "5 [6, 9, 7, 10, 15]", "Failed remove test #7");

  answer = minHeap.remove();
  console.assert(answer + " " + minHeap.toString() == "6 [7, 9, 15, 10]", "Failed remove test #8");

  answer = minHeap.remove();
  console.assert(answer + " " + minHeap.toString() == "7 [9, 10, 15]", "Failed remove test #9");

  answer = minHeap.remove();
  console.assert(answer + " " + minHeap.toString() == "9 [10, 15]", "Failed remove test #10");

  answer = minHeap.remove();
  console.assert(answer + " " + minHeap.toString() == "10 [15]", "Failed remove test #11");

  answer = minHeap.remove();
  console.assert(answer + " " + minHeap.toString() == "15 []", "Failed remove test #12");

  console.log("Finished testing MinHeap");
}
