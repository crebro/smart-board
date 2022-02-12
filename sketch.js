/* eslint-disable no-undef, no-unused-vars */

let paths = [];
let currentPath;
let currentSurface;

function setup() {
  createCanvas(windowWidth, windowHeight);
  currentSurface = createGraphics(10, 10);
  // Put setup code here
}

function draw() {
  background(220);
  noFill();

  if (mouseIsPressed) {
    const point = {
      x: mouseX,
      y: mouseY
    }
    currentPath.push(point);
  }

  paths.forEach((path) => {
    beginShape();
    path.forEach((point) => {
      vertex(point.x, point.y);
    })
    endShape();
  })

  if (currentPath && currentPath.length > 10)  {
    let lowestX = {x: Number.POSITIVE_INFINITY, y: null };
    let highestX = {x: Number.NEGATIVE_INFINITY, y: null };
    let lowestY = {x: null, y: Number.POSITIVE_INFINITY }
    let highestY = {x: null, y: Number.NEGATIVE_INFINITY };

    for (let i = 0; i < currentPath.length; i++) {
      item = currentPath[i];
      if (item.x > highestX.x) {
        highestX = item;
      } if (item.x < lowestX.x) {
        lowestX = item;
      }

      if (item.y > highestY.y) {
        highestY = item;
      } if (item.y < lowestY.y) {
        lowestY = item;
      }
    }

    let width = highestX.x - lowestX.x + 1;
    let height = highestY.y - lowestY.y + 1;
    currentSurface = createGraphics(width, height);
    currentSurface.background(255);

    currentSurface.beginShape();
    currentPath.forEach((point) => {
      currentSurface.strokeWeight(10);
      currentSurface.vertex(point.x - lowestX.x, point.y - lowestY.y);
    })
    currentSurface.endShape();
  }


  image(currentSurface, 0, 0);

}

function mousePressed () {
  currentPath = [];
  paths.push(currentPath);
}

// This Redraws the Canvas when resized
windowResized = function() {
  resizeCanvas(windowWidth, windowHeight);
};
