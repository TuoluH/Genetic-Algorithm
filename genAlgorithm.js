const phrase = "To be or not to be";
const popSize = 1000;
const mutationRate = 0.01;
let population = [];

function setup() {
  createCanvas(window.innerWidth, window.innerHeight);
  createInitialPop();
}

function draw(){
  
}

function createInitialPop() {
  for (let i = 0; i < popSize; i++) {
    population.push(createRandomPhrase());
  }
}

function createRandomPhrase() {
  let p = ""
  for (let i = 0; i < phrase.length; i++) {
    p += String.fromCharCode(floor(random(32, 126)));
  }
}