const width = window.innerWidth;
const height = window.innerHeight;
const maxDist = ((((width ** 2) + (height ** 2)) ** 0.5) * 20)
const popSize = 100;
const mutationRate = 0.01;
let currLetter = 65;
let gens = 0;
let cities = []
let population = [];
let bestRoute;
let shortestDist = maxDist;

function setup() {
  createCanvas(width, height);
  for (let i = 0; i < 20; i++) {
    (cities.push(new City));
  }
  createInitialPop();
  calcFitness()
}

function draw() {
  background(255);
  fill(0)
  cities.forEach(c => circle(c.x, c.y, 10));
  textSize(50);
  textAlign(LEFT, TOP);
  text("Current Best:", 10, 10);
  textSize(20);
  text("Generations: " + gens, 10, height * 0.5 + 30);
  text("Mutation Rate: " + mutationRate, 10, height * 0.5 + 60);
  //   createNewPop(calcFitness());
  textSize(40);
  text(shortestDist, 10, 60);
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
    population.push(makeRoute(cities));
  }
}

function makeRoute(citiesLeft) {
  if (citiesLeft.length == 0) {
    return [];
  }

  let city = random(citiesLeft);
  return [city, makeRoute(citiesLeft.filter(c => c != city))].flat(20);
}

function calcFitness() {
  let matingPool = [];

  population.forEach(p => {
    let dist = 0;
    for (let c = 0; c < p.length - 1; c++) {
      dist += (((p[c].x - p[c + 1].x) ** 2) + ((p[c].y - p[c + 1].y) ** 2)) ** 0.5
    }

    if (dist < shortestDist) {
      bestRoute = p;
      shortestDist = dist;
    }

    matingPool.push(...Array(Math.floor((maxDist - dist) / 100)).fill(p));
  })
  console.log(bestRoute);
  console.log(matingPool);

  gens++;
  gens > 1000 ? noLoop() : null;
  return matingPool;
}

function createNewPop(matingPool) {
  population = [];
  for (let i = 0; i < popSize; i++) {
    let p1 = random(matingPool);
    let p2 = random(matingPool);
    let elem = "";
    for (let p = 0; p < phrase.length; p++) {
      random(0, 1) < mutationRate ? elem += String.fromCharCode(floor(random(32, 126))) :
        Math.floor(random(0, 10)) % 2 == 0 ? elem += p1[p] : elem += p2[p];
    }
    population.push(elem);
  }
}

function drawBest() {

}