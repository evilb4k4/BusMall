'use strict';
var imageDiv = document.getElementById('imageDiv');

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
//funstion to get random images from the photos array.
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
try{
  if(localStorage.voteTotals){
    photos = JSON.parse(localStorage.voteTotals);
  }
} catch (error){
  console.log('Something went wrong', error);
}

var clickLimit = 25;
function voteForPic1(event) {
  photosOnScreen[0].imageClick++;
  getThreeRandomPhotos();
  totalClicks++;
  if (totalClicks === clickLimit){
    localStorage.voteTotals = JSON.stringify(productInfo);
    Picture1.removeEventListener('click', voteForPic1);
    displayResults();
    renderChart();
  }
};
function voteForPic2(event) {
  photosOnScreen[1].imageClick++;
  getThreeRandomPhotos();
  totalClicks++;
  if (totalClicks === clickLimit){
    localStorage.voteTotals = JSON.stringify(productInfo);
    Picture2.removeEventListener('click', voteForPic2);
    displayResults();
    renderChart();

  }
};
function voteForPic3(event) {
  photosOnScreen[2].imageClick++;
  getThreeRandomPhotos();
  totalClicks++;
  if (totalClicks === clickLimit){
    localStorage.voteTotals = JSON.stringify(productInfo);
    Picture3.removeEventListener('click', voteForPic3);
    displayResults();
    renderChart();

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
function renderChart(){
  // refill photos array with the photo objects we took
  // during getThreeRandomPhotos
  photos = photos.concat(photosOnScreen);
  photos = photos.concat(photosOnPreviousScreen);
  photos = photos.concat(photosOnSecondToLastScreen);

  // empty out the imageDiv div
  imageDiv.textContent = '';

  var canvas = document.createElement('canvas');
  canvas.width = imageDiv.clientWidth;
  canvas.height = imageDiv.clientWidth;
  imageDiv.appendChild(canvas);

  var ctx = canvas.getContext('2d');
  ctx.fillRect(0, 0, 50, 50);

  // create a data object to make a chart
  var data = {
    labels: [],
    datasets: [
      {
        label: 'click count',
        data: [],
        backgroundColor: 'green',
      },
      {
        label: 'display count',
        data: [],
        backgroundColor: 'red',
      },
    ],
  };

  var currentPhoto;
  for(var i = 0; i < photos.length; i++){
    currentPhoto = photos[i];
    data.labels.push(currentPhoto.itemName);
    data.datasets[0].data.push(currentPhoto.imageClick);
    data.datasets[1].data.push(currentPhoto.imageShown);
  }

  new Chart(ctx, {
    type: 'horizontalBar',
    data: data,
  });
}

Picture1.addEventListener('click', voteForPic1);
Picture2.addEventListener('click', voteForPic2);
Picture3.addEventListener('click', voteForPic3);
