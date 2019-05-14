change_favicon(coinImage);

var apiError = document.getElementById('apiError')
var coinRankDiv = document.getElementById('coinRank')
var coinNameDiv = document.getElementById('coinName')
var coinImageSRC = document.getElementById('coinImage')
var coinPriceDiv = document.getElementById('coinPrice')
var instructionsDiv = document.getElementById('instructions')
var mainContainerDiv = document.getElementById('mainContainer')

document.addEventListener('wheel', coinIncrement);
document.addEventListener("keydown", coinIncrement);
document.addEventListener("dblclick", toggleInfo);
document.addEventListener("keydown", hideMC);

var coinIndex = 0;
var errorVal = 0;


mainContainerDiv.style.display = "none"
mainContainerDiv.style.visibility = "hidden"
mainContainerDiv.style.opacity = "0"



getData()

setInterval(getData, 45000);

function getData() {
  fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=200&page=1&sparkline=false')
    .then(response => {
      return response.json()
    })
    .then(data => {
      errorVal = 0;
      // Work with JSON data here
      coinRank = data[coinIndex].market_cap_rank;
      coinRankDiv.innerHTML = coinRank;

      coinName = data[coinIndex].name;
      coinNameDiv.innerHTML = coinName;

      coinImage = data[coinIndex].image;
      coinImageSRC.src = coinImage;

      coinPrice = '$'+ data[coinIndex].current_price;
      coinPriceDiv.innerHTML = coinPrice;

      change_favicon(coinImage);
      bulgeAnimation();
    })
    .catch(err => {
      errorVal = 1;
      instructionsDiv.style.display = "none"
      apiError.innerHTML = 'Something seems to be wrong... Check back in a few minutes.';
    })
}

function coinIncrement(e) {
  Y = e.deltaY;
  // console.log(Y);
  if ((Y > 0 || e.which == 40 || e.which == 39) && coinIndex != 199 && window.getComputedStyle(mainContainerDiv).display == "flex") {
    coinIndex++;
    console.log(coinIndex);
    getData()
    bulgeAnimation()
  }
  if ((Y < 0 || e.which == 38 || e.which == 37) && coinIndex != 0 && window.getComputedStyle(mainContainerDiv).display == "flex") {
    coinIndex--;
    console.log(coinIndex);
    getData()
    bulgeAnimation()
  }  
}

function hideMC(e) {
  if (e.which == 13 && window.getComputedStyle(mainContainerDiv).display == "flex" && window.getComputedStyle(coinRankDiv).fontSize == "30px") {
    coinRankDiv.style.fontSize = "0px"
  }
  else if (e.which == 13 && window.getComputedStyle(mainContainerDiv).display == "flex" && window.getComputedStyle(coinRankDiv).fontSize == "0px") {
    coinRankDiv.style.fontSize = "30px"
    }

}


function bulgeAnimation() {
  // coinNameDiv.classList.add("coinNameBulge");
  // coinImageSRC.classList.add("coinNameBulge");
  coinPriceDiv.classList.add("coinNameBulge");
  setTimeout(function () {
    // coinNameDiv.classList.remove("coinNameBulge");
    // coinImageSRC.classList.remove("coinNameBulge");
    coinPriceDiv.classList.remove("coinNameBulge");
  }, 175);

}


function change_favicon(img) {
  var favicon = document.querySelector('link[rel="shortcut icon"]');
  
  if (!favicon) {
      favicon = document.createElement('link');
      favicon.setAttribute('rel', 'shortcut icon');
      var head = document.querySelector('head');
      head.appendChild(favicon);
  }
  
  
  favicon.setAttribute('type', 'image/png');
  favicon.setAttribute('href', img);
}


function toggleInfo(){
  if (window.getComputedStyle(instructionsDiv).display == "block" && errorVal == 0){
    instructionsDiv.style.display = "none"
    instructionsDiv.style.visibility = "hidden"
    instructionsDiv.style.opacity = "0"
    
    mainContainerDiv.style.display = "flex"
    mainContainerDiv.style.visibility = "visible"
    mainContainerDiv.style.opacity = "1"
    

    console.log('ping')
  }
  else if (errorVal == 1){
    instructionsDiv.style.display = "none"
    instructionsDiv.style.visibility = "hidden"
    instructionsDiv.style.opacity = "0"

    mainContainerDiv.style.display = "none"
    mainContainerDiv.style.visibility = "hidden"
    mainContainerDiv.style.opacity = "0"

  }
  else {
    instructionsDiv.style.display = "block"
    instructionsDiv.style.visibility = "visible"
    instructionsDiv.style.opacity = "1"

    mainContainerDiv.style.display = "none"
    mainContainerDiv.style.visibility = "hidden"
    mainContainerDiv.style.opacity = "0"

    console.log('pong')
  }
  
  
}









// https://www.googleapis.com/webfonts/v1/webfonts?key=AIzaSyBtgkAcjjtzW6xntin6hpv6dQhmK5s1xqU