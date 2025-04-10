const width = window.innerWidth
const height = window.innerHeight
const phrase = "To be or not to be";
const popSize = 1000;
const mutationRate = 0.01;
let population = [];

function setup() {
  createCanvas(width, height);
  createInitialPop();
  textSize(50);
  textAlign(LEFT, TOP);
  text("Current Best:", 10, 10);
}

function draw() {
  textSize(12);
  text(population.join("\n"), width * 0.75, 0);
  createNewPop(calcFitness());

}

function createInitialPop() {
  for (let i = 0; i < popSize; i++) {
    let p = "";
    for (let i = 0; i < phrase.length; i++) {
      p += String.fromCharCode(floor(random(32, 126)));
    }
    population.push(p);
  }
}

function calcFitness() {
  let matingPool = [];
  population.forEach( p => {
    let fitness = 0;
    for (let l = 0; l < p.length; l++) {
      p[l] == phrase[l] ? fitness ++ : null;
    }
    matingPool.push(...Array(Math.floor(fitness)).fill(p))
  })

  return matingPool;
}

function createNewPop() {
  
}