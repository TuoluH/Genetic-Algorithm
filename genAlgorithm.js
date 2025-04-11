const width = window.innerWidth
const height = window.innerHeight
const phrase = "To be or not to be";
const popSize = 100;
const mutationRate = 0.01;
let gens = 0;
let population = [];
let bestPhrase = "";

function setup() {
  createCanvas(width, height);
  createInitialPop();
  
}

function draw() {
  background(255);
  textSize(50);
  textAlign(LEFT, TOP);
  text("Current Best:", 10, 10);
  textSize(12);
  text(population.join("\n"), width * 0.75, 0);
  textSize(20)
  text("Target Phrase: " + phrase, 10, height * 0.5);
  text("Generations: " + gens, 10, height * 0.5 + 30)
  createNewPop(calcFitness());
  textSize(40);
  text(bestPhrase, 10, 60);
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
  let bestFitScore = 0;
  
  population.forEach(p => {
    let fitness = 0;
    for (let l = 0; l < p.length; l++) {
      p[l] == phrase[l] ? fitness++ : null;
    }

    if (fitness > bestFitScore) {
      bestFitScore = fitness;
      bestPhrase = p;
    }
    matingPool.push(...Array(Math.floor(fitness)).fill(p))
  })

  gens ++
  return matingPool;
}

function createNewPop(matingPool) {
  population = []
  for (let i = 0; i < popSize; i++) {
    let p1 = random(matingPool);
    let p2 = random(matingPool);
    let elem = ""
    for (let p = 0; p < phrase.length; p++) {
      random(0, 1) < mutationRate ? elem += String.fromCharCode(floor(random(32, 126))) :
      random(0, 10) % 2 == 0 ? elem += p1[p] : elem += p2[p];
    }
    population.push(elem);
  }
}