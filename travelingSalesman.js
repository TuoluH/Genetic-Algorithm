const width = window.innerWidth;
const height = window.innerHeight;
const popSize = 100;
const mutationRate = 0.01;
let currLetter = 65;
let gens = 0;
let cities = []
let population = [];
let shortestDist = "";

function setup() {
  createCanvas(width, height);
  for (let i = 0; i < 20; i++) {
    (cities.push(new City));
  }
  createInitialPop();
  console.log(cities);
}

function draw() {
  background(255);
  fill(0)
  cities.forEach(c => circle(c.x, c.y, 10));
  //   textSize(50);
  //   textAlign(LEFT, TOP);
  //   text("Current Best:", 10, 10);
  //   textSize(12);
  //   text(population.join("\n"), width * 0.75, 0);
  //   textSize(20);
  //   text("Target Phrase: " + phrase, 10, height * 0.5);
  //   text("Generations: " + gens, 10, height * 0.5 + 30);
  //   text("Mutation Rate: " + mutationRate, 10, height * 0.5 + 60);
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

class Route {
  constructor() {
    this.route = makeRoute(cities);
    this.dist = 0;
  }

  calcDist() {
    let totalDist = 0;
    for (let c = 1; c < this.length; c++) {
      
    }
  }
}

function createInitialPop() {
  for (let r = 0; r < popSize; r++) {
    population.push(new Route);
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
  let bestFitScore = 0;

  population.forEach(p => {
    let fitness = 0;
    for (let l = 0; l < p.length; l++) {
      p[l] == phrase[l] ? fitness++ : null;
    }

    if (fitness > bestFitScore) {
      bestFitScore = fitness;
      shortestDist = p;
    }

    shortestDist == phrase ? noLoop() : null;
    matingPool.push(...Array(Math.floor(fitness)).fill(p));
  })

  gens++;
  return matingPool;
}

// function createNewPop(matingPool) {
//   population = [];
//   for (let i = 0; i < popSize; i++) {
//     let p1 = random(matingPool);
//     let p2 = random(matingPool);
//     let elem = "";
//     for (let p = 0; p < phrase.length; p++) {
//       random(0, 1) < mutationRate ? elem += String.fromCharCode(floor(random(32, 126))) :
//         Math.floor(random(0, 10)) % 2 == 0 ? elem += p1[p] : elem += p2[p];
//     }
//     population.push(elem);
//   }
// }