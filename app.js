'use strict';
var productInfo = [];

var productsNames = ['bag', 'banana', 'bathroom', 'boots', 'breakfast', 'bubblegum', 'chair', 'cthulhu', 'dog-duck', 'drangon', 'pen', 'pet-sweep', 'scissors', 'shark', 'sweep', 'tauntaun', 'unicorn', 'usb', 'water-can', 'wine-glass'];

var productImages = ['bag.jpg', 'banana.jpg', 'bathroom.jpg', 'boots.jpg', 'breakfast.jpg', 'bubblegum.jpg', 'chair.jpg', 'cthulhu.jpg', 'dog-duck.jpg', 'dragon.jpg', 'pen.jpg', 'pet-sweep.jpg', 'scissors.jpg', 'shark.jpg', 'sweep.png', 'tauntaun.jpg', 'unicorn.jpg', 'usb.gif', 'water-can.jpg', 'wine-glass.jpg'];
var img1 = document.getElementById('Picture1');
var img2 = document.getElementById('Picture2');
var img3 = document.getElementById('Picture3');

function ProductPictures(itemName, imagePath) {
  this.itemName = itemName;
  this.imagePath = imagePath;
  this.imageClick = 0;
  this.imageShown = 0;
  productInfo.push(this);
};
// for loop to run thru the product images array
for (var i = 0; i < productImages.length; i++) {
  var filePath = './assets/' + productImages[i];
  new ProductPictures(productsNames[i], filePath);
}
// generate random images
function randomImgIndex(){
  console.log('It works');
  return Math.floor(Math.random() * productImages.length);
};
//funtion to get images to change on click.
function onClick() {
  var selectImg1 = productInfo[randomImgIndex()];
  var selectImg2 = productInfo[randomImgIndex()];
  var selectImg3 = productInfo[randomImgIndex()];
  img1.src = selectImg1.imagePath;
  img2.src = selectImg2.imagePath;
  img3.src = selectImg3.imagePath;
  selectImg1.imageShown++;
  selectImg2.imageShown++;
  selectImg3.imageShown++;
}
onClick();
//event lisener
Picture1.addEventListener('click', onClick);
Picture2.addEventListener('click', onClick);
Picture3.addEventListener('click', onClick);
