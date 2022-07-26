'use strict';

/*

Goat Picker

  - I have collection of goat photos
  - user is presented the photos in 2s (2 goat photos at a time) — should be 2 different photos
  - user votes on their favorite by clicking on the photo
  - 15 match ups per round of voting (so 15 total votes)
  - at end of round display the results
  - in results I want to see
    - how many votes each goat got
    - how many times each goat photo was render


  PLAN

  Constructor — goat
    - name
    - image source
    - votes
    - views
  Global variables
    - all goat array
    - counter for the votes (number of matchups)
  method function
    render the goat image in the dom
      - can't have 2 of the same goat
    random number to use to get a goat
    display the results
  event lister
    goat clicks
      increment the vote
      triger a new set of goats

*/

console.log('hi');

// GLOBAL VARIABLES
let productContainer = document.querySelector('section');
let resultButton = document.querySelector('section + div');
let ul = document.querySelector('ul');

let image1 = document.querySelector('section img:first-child');
let image2 = document.querySelector('section img:nth-child(2)');
let image3 = document.querySelector('section img:nth-child(3)');


let allProducts = [];
let Globeclicks = 0;

let clickAllowed = 3;


// CONSTRUCTOR

function Product(name, fileExtension = 'jpg') {
  this.name = name;
  this.src = `/assets/${this.name}.${fileExtension}`;
  this.clicks = 0;
  this.views = 0;
}

// FUNCTIONS

function getRandomProduct() {
  return Math.floor(Math.random() * allProducts.length);
}

function renderProducts() {
  let prod1 = getRandomProduct();
  let prod2 = getRandomProduct();
  let prod3 = getRandomProduct();
  console.log(prod1, prod2, prod3);
  // seriously consider using an array here
  // remember how do you know if an array includes something?
  // Google it and find out
  while (prod1 === prod2 || prod1 === prod3 || prod2 === prod3) {
    prod2 = getRandomProduct();
    prod3 = getRandomProduct();

    console.log(prod1, prod2, prod3);
  }

  image1.src = allProducts[prod1].src;
  image1.alt = allProducts[prod1].name;
  allProducts[prod1].views++;
  image2.src = allProducts[prod2].src;
  image2.alt = allProducts[prod2].name;
  allProducts[prod2].views++;
  image3.src = allProducts[prod3].src;
  image3.alt = allProducts[prod3].name;
  allProducts[prod3].views++;
  console.log(allProducts);
}

function handleProductClick(event) {
  if (event.target === productContainer) {
    alert('Please click on an image');
  }
  Globeclicks ++;
  let clickedProd = event.target.alt;
  console.log(clickedProd);

  for (let i = 0; i< allProducts.length; i++) {
    if (clickedProd === allProducts[i].name) {
      allProducts[i].clicks++;
      break;
    }
  }
  if (Globeclicks === clickAllowed) {
    console.log('end this shit');
    resultButton.className = 'clicks-allowed';
    productContainer.removeEventListener('click', handleProductClick);
    resultButton.addEventListener('click', handleButtonClick);
  }
  renderProducts();
}

function handleButtonClick() {
    renderResults();
}

function renderResults() {

  // for each  prod in my array, generate a LI
  // ex: name had X views and was clicked on X times
  for (let i = 0; i < allProducts.length; i++) {
    let li = document.createElement('li');
    li.textContent = `${allProducts[i].name}: ${allProducts[i].clicks} Votes`;
    ul.appendChild(li);
  }
}

// EXCUTABLE CODE


let bag = new Product('bag');
let banana = new Product('banana');
let bathroom = new Product('bathroom');
let boots = new Product('boots');
let breakfast = new Product('breakfast');
let bubblegum = new Product('bubblegum');
let chair = new Product('chair');
let cthulhu = new Product('cthulhu');
let dog_duck = new Product('dog-duck');
let dragon = new Product('dragon');
let pen = new Product('pen');
let pet_sweep = new Product('pet-sweep');
let scissors = new Product('scissors');
let shark = new Product('shark');
let sweep = new Product('sweep', 'png');
let tauntaun = new Product('tauntaun');
let unicorn = new Product('unicorn');
let water_can = new Product('water-can');
let wine_glass = new Product('wine-glass');

allProducts.push(bag, banana, bathroom, boots, breakfast, bubblegum, chair, cthulhu, dog_duck, dragon, pen, pet_sweep, scissors, shark, sweep, tauntaun, unicorn, water_can, wine_glass);

console.log(allProducts);
renderProducts();
productContainer.addEventListener('click', handleProductClick);
