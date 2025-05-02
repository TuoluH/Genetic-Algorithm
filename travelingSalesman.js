const width = window.innerWidth;
const height = window.innerHeight;
const numCities = 15;
const maxDist = (((width ** 2) + (height ** 2)) ** 0.5) * numCities;
const popSize = 100;
const mutationRate = 0.10;
let currLetter = 65;
let gens = 0;
let cities = []
let population = [];
let bestRoute;
let shortestDist = maxDist;

function setup() {
  createCanvas(width, height);
  for (let i = 0; i < numCities; i++) {
    (cities.push(new City));
  }
  createInitialPop();
}

function draw() {
  background(255);
  fill(0);
  textSize(50);
  textAlign(LEFT, TOP);
  text("Current Best:", 10, 10);
  textSize(20);
  text("Generations: " + gens, 10, height * 0.5 + 30);
  text("Mutation Rate: " + mutationRate, 10, height * 0.5 + 60);
  textSize(40);
  text(shortestDist, 10, 60);
  createNewPop(calcFitness());
  drawBest();
  stroke(0);
  strokeWeight(1);
  textAlign(CENTER, CENTER);
  textSize(9);
  cities.forEach(c => {
    fill(0);
    circle(c.x, c.y, 10);
    fill(255, 0, 0);
    text(c.name, c.x, c.y);
  });
  
}

class City {
  constructor() {
    this.name = String.fromCharCode(currLetter);
    this.x = random(0, width);
    this.y = random(0, height);
    currLetter++;
  }
}

function createInitialPop() {
  for (let r = 0; r < popSize; r++) {
    let citiesLeft = cities;
    let route = [];
    for (let c = 0; c < numCities; c++) {
      route.push(random(citiesLeft));
      citiesLeft = citiesLeft.filter(city => !route.includes(city));
    }
    population.push(route);
  }
}

function calcFitness() {
  let matingPool = [];

  population.forEach(p => {
    let dist = 0;
    for (let c = 0; c < p.length - 1; c++) {
      dist += (((p[c].x - p[c + 1].x) ** 2) + ((p[c].y - p[c + 1].y) ** 2)) ** 0.5;
    }

    if (dist < shortestDist) {
      bestRoute = p;
      shortestDist = dist;
    }

    matingPool.push(...Array(Math.floor((maxDist - dist) / 100)).fill(p));
  })

  gens++;
  gens > 1000 ? noLoop() : null;
  return matingPool;
}

function createNewPop(matingPool) {
  population = [];
  for (let i = 0; i < popSize; i++) {
    let p1 = random(matingPool);
    let p2 = random(matingPool);
    population.push(random([partiallyMapped, order, cycle])(p1, p2));
  }
}

function drawBest() {
  stroke("green");
  strokeWeight(3);
  for (let i = 0; i < numCities - 1; i++) {
    line(bestRoute[i].x, bestRoute[i].y, bestRoute[i + 1].x, bestRoute[i + 1].y);
  }
}