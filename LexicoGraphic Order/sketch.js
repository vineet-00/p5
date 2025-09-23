let vals = [0,1,2,3,4,5,6,7,8,9];
let finished = false;

function setup() {
  let canvas = createCanvas(500, 200);
  canvas.parent('canvas-container');
  textSize(72);
  textAlign(LEFT, CENTER);
  fill(255);
  frameRate(1); // Slow down to see permutations clearly
}

function draw() {
  background(30);
  if (finished) {
    text("Finished!", 20, height/2);
    noLoop();
    return;
  }

  // Display current permutation
  let s = vals.join('');
  text(s, 20, height / 2);

  // Generate next lexicographic permutation
  finished = !nextPermutation(vals);
}

/**
 * Generates the next lexicographic permutation of the array in place.
 * Returns true if next permutation was generated; false if it was the last permutation.
 */
function nextPermutation(arr) {
  let i = arr.length - 2;
  while (i >= 0 && arr[i] >= arr[i+1]) {
    i--;
  }
  if (i < 0) {
    return false; // No next permutation, arr is highest lex order
  }
  let j = arr.length - 1;
  while (arr[j] <= arr[i]) {
    j--;
  }
  swap(arr, i, j);
  reverseSubArray(arr, i + 1);
  return true;
}

function swap(arr, i, j) {
  let temp = arr[i];
  arr[i] = arr[j];
  arr[j] = temp;
}

function reverseSubArray(arr, start) {
  let i = start, j = arr.length -1;
  while(i < j) {
    swap(arr, i, j);
    i++;
    j--;
  }
}
