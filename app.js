'use strict';
var imageDiv = document.getElementById('imageDiv');
var pictureNames = ['bag', 'banana', 'bathroom', 'boots', 'breakfast', 'bubblegum', 'chair', 'cthulhu', 'dog-duck', 'drangon', 'pen', 'pet-sweep', 'scissors', 'shark', 'sweep', 'tauntaun', 'unicorn', 'usb', 'water-can', 'wine-glass'];
var productInfo = [];
var totalClicks = 0;
var photos = [
  new ProductPictures('bag', 'bag.jpg'),
  new ProductPictures('banana', 'banana.jpg'),
  new ProductPictures('bathroom', 'bathroom.jpg'),
  new ProductPictures('rain', 'boots.jpg'),
  new ProductPictures('breakfast', 'breakfast.jpg'),

  new ProductPictures('bubblegum', 'bubblegum.jpg'),
  new ProductPictures('chair', 'chair.jpg'),
  new ProductPictures('cthulhu', 'cthulhu.jpg'),
  new ProductPictures('dog-duck', 'dog-duck.jpg'),
  new ProductPictures('dragon', 'dragon.jpg'),

  new ProductPictures('pen', 'pen.jpg'),
  new ProductPictures('pet-sweep', 'pet-sweep.jpg'),
  new ProductPictures('scissors', 'scissors.jpg'),
  new ProductPictures('shark', 'shark.jpg'),
  new ProductPictures('tauntaun', 'tauntaun.jpg'),

  new ProductPictures('sweep', 'sweep.png'),
  new ProductPictures('unicorn', 'unicorn.jpg'),
  new ProductPictures('usb', 'usb.gif'),
  new ProductPictures('water-can', 'water-can.jpg'),
  new ProductPictures('wine-glass', 'wine-glass.jpg'),
];
var img1 = document.getElementById('Picture1');
var img2 = document.getElementById('Picture2');
var img3 = document.getElementById('Picture3');

function ProductPictures(itemName, imagePath) {
  this.itemName = itemName;
  this.imagePath = './assets/' + imagePath;
  this.imageClick = 0;
  this.imageShown = 0;
  productInfo.push(this);
};
function randomImgIndex(){
  return Math.floor(Math.random() * photos.length);
};
var photosOnSecondToLastScreen = [];
var photosOnPreviousScreen = [];
var photosOnScreen = [];

// get three random photos
function getThreeRandomPhotos(){
  photos = photos.concat(photosOnSecondToLastScreen);
  photosOnSecondToLastScreen = photosOnPreviousScreen;
  photosOnPreviousScreen = photosOnScreen;
  photosOnScreen = [];
  // create a var nextPhoto to keep track of the next Photo we take out of photos
  // splice out an photo object (wich removes it from photos)
  var nextPhoto = photos.splice(randomImgIndex(photos), 1);
  // concat the array returned by splice onto photos onScreen
  photosOnScreen = photosOnScreen.concat(nextPhoto);
  // repeat two more times to get three images
  nextPhoto = photos.splice(randomImgIndex(photos), 1);
  photosOnScreen = photosOnScreen.concat(nextPhoto);
  nextPhoto = photos.splice(randomImgIndex(photos), 1);
  photosOnScreen = photosOnScreen.concat(nextPhoto);
  var selectImg1 = photosOnScreen[0];
  var selectImg2 = photosOnScreen[1];
  var selectImg3 = photosOnScreen[2];
  img1.src = selectImg1.imagePath;
  img2.src = selectImg2.imagePath;
  img3.src = selectImg3.imagePath;
  selectImg1.imageShown++;
  selectImg2.imageShown++;
  selectImg3.imageShown++;
}
getThreeRandomPhotos();
function updatedTotal() {
  if(localStorage.sumOfDataArray){
    var someNewArray = JSON.parse(localStorage.sumOfDataArray);
    for(var i = 0; i < someNewArray.length; i++){
      productInfo[i].imageClick += someNewArray[i].imageClick;
    }
  }
  if(localStorage.sumOfDataArray){
    var someNewArray = JSON.parse(localStorage.sumOfDataArray);
    for(var i = 0; i < someNewArray.length; i++){
      productInfo[i].imageShown += someNewArray[i].imageShown;
    }
  }
}
updatedTotal();

var clickLimit = 25;
function voteForPic1(event) {
  photosOnScreen[0].imageClick++;
  getThreeRandomPhotos();
  totalClicks++;
  if (totalClicks === clickLimit){
    localStorage.sumOfDataArray = JSON.stringify(productInfo);
    Picture1.removeEventListener('click', voteForPic1);
    displayResults();
    showChart();
  }
};
function voteForPic2(event) {
  photosOnScreen[1].imageClick++;
  getThreeRandomPhotos();
  totalClicks++;
  if (totalClicks === clickLimit){
    localStorage.sumOfDataArray = JSON.stringify(productInfo);
    Picture2.removeEventListener('click', voteForPic2);
    displayResults();
    showChart();
  }
};
function voteForPic3(event) {
  photosOnScreen[2].imageClick++;
  getThreeRandomPhotos();
  totalClicks++;
  if (totalClicks === clickLimit){
    localStorage.sumOfDataArray = JSON.stringify(productInfo);
    Picture3.removeEventListener('click', voteForPic3);
    displayResults();
    showChart();
  }
};

var clickResults = [];
var productShowResults = [];
function displayResults() {
  imageDiv.textContent = '';
  for(var i = 0; i < productInfo.length; i++){
    clickResults.push(productInfo[i].imageClick);
  };
  for (var i = 0; i < productInfo.length; i++) {
    productShowResults.push(productInfo[i].imageShown);
  }
};
function showChart() {
  var ctx = canvas.getContext('2d');
  var data = {
    labels: pictureNames,
    datasets: [{
      label: 'Favorite Items',
      data: clickResults,
      backgroundColor: 'red'
    }, {
      label: 'Times Shown',
      data: productShowResults,
      backgroundColor: 'green'
    }],
  };
  var myChart = new Chart(ctx, {
    type: 'bar',
    data: data,
    options: {
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero:true,
            max: 100,
          }
        }]
      }
    }
  });
};

Picture1.addEventListener('click', voteForPic1);
Picture2.addEventListener('click', voteForPic2);
Picture3.addEventListener('click', voteForPic3);
