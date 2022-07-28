'use strict';

// GLOBAL VARIABLES
let productContainer = document.querySelector('section');
let resultButton = document.querySelector('section + div span');
let clearResults = document.getElementById('clear');
let refresh = document.querySelector('section + div span:nth-child(3)');
let ul = document.querySelector('ul');

let image1 = document.querySelector('section img:first-child');
let image2 = document.querySelector('section img:nth-child(2)');
let image3 = document.querySelector('section img:nth-child(3)');
image1.className = 'clicks-allowed';
image2.className = 'clicks-allowed';
image3.className = 'clicks-allowed';
let allProducts = [];
let Globeclicks = 0;
let clickAllowed = 25;

let prodViews = [];
let prodNames = [];
let prodClicks = [];
let randProductArr = [];
let check = [allProducts.length, allProducts.length, allProducts.length]

// CONSTRUCTOR

function Product(name, fileExtension = 'jpg') {
  this.name = name;
  this.src = `/assets/${this.name}.${fileExtension}`;
  this.clicks = 0;
  this.views = 0;
}



// FUNCTIONS
//Runs a random number for the length of the allProducts, to get a random product to display in renderProducts();
function getRandomProduct() {
  return Math.floor(Math.random() * allProducts.length);
}


//Generates three random images, and checks it compared to an array that stores the previous geneation of three random images, and generates them 
function renderProducts() {
  let prod1 = getRandomProduct();
  let prod2 = getRandomProduct();
  let prod3 = getRandomProduct();
  let checked = [prod1, prod2, prod3];
  let found = check.some(r => checked.includes(r))
  //while the two of the images are the same, or they include images from the previous generation, run it back
  while (found || prod1 === prod2 || prod1 === prod3 || prod2 === prod3) {
    prod1 = getRandomProduct();
    prod2 = getRandomProduct();
    prod3 = getRandomProduct();
    checked = [prod1, prod2, prod3];
    found = check.some(b => checked.includes(b))
  }
  //stores the current images to check next time for lack of errors.
  check = [prod1, prod2, prod3];

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


//runs a method that organizes the array, it stores the current results into the storage, fills the ul, then runs a function which fills a canvas tag with a chart.js
function renderResults() {
  storeLocale();
  arraySort(allProducts);
  // for each  prod in my array, generate a LI
  // ex: name had X views and was clicked on X times
  for (let i = 0; i < allProducts.length; i++) {
    prodClicks.push(allProducts[i].clicks);
    prodNames.push(allProducts[i].name);
    prodViews.push(allProducts[i].views);
    let li = document.createElement('li');
    li.textContent = `${allProducts[i].name}: ${allProducts[i].views} views & ${allProducts[i].clicks}`;
    ul.appendChild(li);
  }
  renderChart();
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


//After you click renderResults, it saves the data to locale storage, and pulls any stored clicks and adds them to the current clicks and views to be displayed
function storeLocale() {
  let prodsrHere = localStorage.getItem('Products')
  if (prodsrHere) {
    let parsedProds = JSON.parse(prodsrHere);
    console.log(parsedProds);
    console.log(allProducts);
    for (let i = 0; i < allProducts.length; i++) {
      for (let z = 0; z < parsedProds.length; z++) {
        if (allProducts[i].name === parsedProds[z].name) {
          allProducts[i].views += parsedProds[z].views;
          allProducts[i].clicks += parsedProds[z].clicks;
        }
      }
    }
  }
  let stringifiedProducts = JSON.stringify(allProducts);
  // set it in local storage
  localStorage.setItem('Products', stringifiedProducts)
}

//Creates a chart with the product names as the labels for the x-axis, and adds two data sets with the views and clicks of each products in the array.
function renderChart() {
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
    },
    options: {
      indexAxis: 'x',
      legend: {
        fontColor: 'white',
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
//Handlers 
//Whe you click an image, add a click to its index in the array, then if you still have votes left as defined as GlobeClicks, generate three new random images as defined in renderProducts();
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
    image1.classList.remove('clicks-allowed');
    image2.classList.remove('clicks-allowed');
    image3.classList.remove('clicks-allowed');
    productContainer.removeEventListener('click', handleProductClick);
    resultButton.addEventListener('click', handleButtonClick);
  }
  renderProducts();
}


//Runs when you click the clear results button, clears the data in local storage
function handleClickResults() {
  console.log('Yummy data, bye bye');
  localStorage.clear();
}


// If you click the button, it creates a list, then removes the ability to click in again.
function handleButtonClick() {
  renderResults();
  resultButton.removeEventListener('click', handleButtonClick);
}


//runs when you click the reload button, refreshes the page
function reload(){
  location.reload();
}
//END


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

renderProducts();

clearResults.addEventListener('click', handleClickResults);
productContainer.addEventListener('click', handleProductClick);
refresh.addEventListener('click', reload);