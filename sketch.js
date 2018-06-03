var maxIter = 100;
var zoom = 0.7;
var xOffset = 0;
var yOffset = 0;
var maxY = 2;
var maxX = 2;
var minY = -2;
var minX = -2;
var y = 0;


class Complex{
  constructor(real, imaginary){
    this.real = real;
    this.imaginary = imaginary;
  }
}


function setup() {
  var canvas = createCanvas(600, 600);
  canvas.mousePressed(zoomIn);
}

function draw() {
  if(y <= height){
    for(x = 0; x <= width; x++){
      var iterations = mandelbrot();
      if(iterations < maxIter){
        var mapColour = map(iterations, 0, maxIter, 0, 255);
        stroke(mapColour, mapColour, mapColour);
      }
      else{
        stroke(255)
      }
      point(x, y);
    }
  }
  y++;
}

// f(x) = x^2 + c 
function mandelbrot(){
  var result = new Complex(0.0, 0.0);
  var mapHeight = map(y, 0, height, maxY * zoom + yOffset, minY * zoom + yOffset);
  var mapWidth = map(x, 0, width, minX * zoom + xOffset, maxX * zoom + xOffset);
  var c = new Complex(mapWidth, mapHeight);

  for (var i = 0; i <= maxIter; i++){

    // calculate x squared
    xSquared = squareComplex(result);
    
    // add c to x squared
    result = addComplex(xSquared, c);

    // magnitude of result
    var magnitude = getMagnitude(result);

    // check it is bounded. If it the magnitude is > 2 return the number of iterations. 
    if(magnitude > 2){
      return i;
    }
  }
  // if max iterations reached, fn is unbounded. 
  return maxIter;
}

function addComplex(complexNum1, complexNum2){
  return new Complex((complexNum1.real + complexNum2.real), (complexNum1.imaginary + complexNum2.imaginary));
}

function squareComplex(complexNum){
  var real = (Math.pow(complexNum.real, 2) - (Math.pow(complexNum.imaginary,2)));
  var imaginary = 2 * complexNum.real * complexNum.imaginary;
  return new Complex(real, imaginary);
}

function getMagnitude(complexNum){
  return sqrt((Math.pow(complexNum.real, 2)) + (Math.pow(complexNum.imaginary, 2)));
}

function zoomIn(){

  // TODO set the offset so that the graph recenters on where the mouse was clicked.

  minX = minX * zoom;
  minY = minY * zoom;
  maxX = maxX * zoom;
  maxY = maxY * zoom;
  y = 0;
}

