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
let resultButton = document.querySelector('section + div span');
let ul = document.querySelector('ul');

let image1 = document.querySelector('section img:first-child');
let image2 = document.querySelector('section img:nth-child(2)');
let image3 = document.querySelector('section img:nth-child(3)');

let allProducts = [];
let Globeclicks = 0;
let clickAllowed = 5;

let prodViews = [];
let prodNames = [];
let prodClicks = [];

//canvas

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

    // console.log(prod1, prod2, prod3);
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
  // console.log(allProducts);
}



function handleProductClick(event) {
  if (event.target === productContainer) {
    alert('Please click on an image');
  }
  Globeclicks++;
  let clickedProd = event.target.alt;
  // console.log(clickedProd);

  for (let i = 0; i < allProducts.length; i++) {
    if (clickedProd === allProducts[i].name) {
      allProducts[i].clicks++;
      break;
    }
  }
  if (Globeclicks === clickAllowed) {
    resultButton.className = 'clicks-allowed';
    productContainer.removeEventListener('click', handleProductClick);
    resultButton.addEventListener('click', handleButtonClick);
  }
  renderProducts();
}


// If you click the button, it creates a list, then removes the ability to click in again.
function handleButtonClick() {
  renderResults();
  resultButton.removeEventListener('click', handleButtonClick);
}


// Sorts array with the first index having most clicks
function arraySort() {
  let arrPush = [];
  while (allProducts.length > 0) {
    let check = allProducts[0].clicks;
    let arrIndex = allProducts[0];
    let k = 0;
    for (let i = 0; i < allProducts.length; i++) {
      if (check < allProducts[i].clicks) {
        check = allProducts[i].clicks;
        arrIndex = allProducts[i];
        k = i;
      }
    }
    arrPush.push(arrIndex);
    allProducts.splice(k, 1);
    // console.log(arr.length);
  }
  allProducts = arrPush;
}


// Capitalized first letter of each product
function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}


function renderResults() {
  arraySort(allProducts);
  // for each  prod in my array, generate a LI
  // ex: name had X views and was clicked on X times
  for (let i = 0; i < allProducts.length; i++) {
    prodClicks.push(allProducts[i].clicks);
    prodNames.push(allProducts[i].name);
    prodViews.push(allProducts[i].views);
    let li =document.createElement('li');
    li.textContent = `${allProducts[i].name}: ${allProducts[i].views} views & ${allProducts[i].clicks}`;
    ul.appendChild(li);
  }
  console.log('this is a test' + prodNames);
  console.log('this is a test' + prodClicks);
  console.log('this is a test' + prodViews);
  renderChart();
}
function renderChart(){
  const ctx = document.getElementById('myChart').getContext('2d');
  const myChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: prodNames,
      datasets: [{
        label: '# of Votes',
        data: prodClicks,
        backgroundColor: 'rgba(0,0,255,0.2)',
        borderColor: 'rgba(0,0,255,1)',
        borderWidth: 1
      },
      {
        label: '# of Views',
        data: prodViews,
        backgroundColor: 'rgba(255, 99, 132, 0.8)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1
      }]
    }, options: {
      indexAxis: 'x',
      legend: {
          fontColor: "white",
          fontSize: 18
      },
      maintainAspectRatio: false,
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  })
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

