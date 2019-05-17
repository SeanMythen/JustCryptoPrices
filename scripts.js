
change_favicon(coinImage);

var apiError = document.getElementById('apiError')
var coinRankDiv = document.getElementById('coinRank')
var coinNameDiv = document.getElementById('coinName')
var coinImageSRC = document.getElementById('coinImage')
var coinPriceDiv = document.getElementById('coinPrice')
var instructionsDiv = document.getElementById('instructions')
var mainContainerDiv = document.getElementById('mainContainer')
var wholePage = document.body;

var leftTap = document.getElementById('leftTap')
var rightTap = document.getElementById('rightTap')


document.addEventListener('wheel', coinIncrement);
document.addEventListener("keydown", coinIncrement);

document.addEventListener("keydown", fontSizeChange);

if(!(navigator.userAgent.match(/Android/i)
 || navigator.userAgent.match(/webOS/i)
 || navigator.userAgent.match(/iPhone/i)
 || navigator.userAgent.match(/iPad/i)
 || navigator.userAgent.match(/iPod/i)
 || navigator.userAgent.match(/BlackBerry/i)
 || navigator.userAgent.match(/Windows Phone/i)))
 {
document.addEventListener("dblclick", toggleInfo);
 }

document.addEventListener("keydown", hideMC);

document.addEventListener("keydown", backToOne);

firstVisit();

var coinIndex = 0;
var errorVal = 0;
var scaleVar = 90;
var scaleVarMC = 30;

getData()

setInterval(getData, 60000);

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





if (navigator.userAgent.match(/Android/i)
 || navigator.userAgent.match(/webOS/i)
 || navigator.userAgent.match(/iPhone/i)
 || navigator.userAgent.match(/iPad/i)
 || navigator.userAgent.match(/iPod/i)
 || navigator.userAgent.match(/BlackBerry/i)
 || navigator.userAgent.match(/Windows Phone/i))

 {

  var mc = new Hammer(wholePage);

  var leftTapHammer = new Hammer.Manager(leftTap);
  var rightTapHammer = new Hammer.Manager(rightTap);

  leftTapHammer.add( new Hammer.Tap({ event: 'doubletap', taps: 2 }) );
  leftTapHammer.get('doubletap').set({ event: 'doubletap' });

  rightTapHammer.add( new Hammer.Tap({ event: 'doubletap', taps: 2 }) );
  rightTapHammer.get('doubletap').set({ event: 'doubletap' });


  leftTapHammer.on("doubletap", function(ev)  {

    console.log('pep');
    if (coinIndex <= 199 && coinIndex >= 15 && window.getComputedStyle(mainContainerDiv).display == "flex") {
      coinIndex = coinIndex - 15;
      console.log(coinIndex);
      console.log('hey')
      getData()
      bulgeAnimation()
    }
    else if (coinIndex < 15 && window.getComputedStyle(mainContainerDiv).display == "flex") {
      var x = (15 - coinIndex);
      coinIndex = 200 - x;
      console.log(coinIndex);
      console.log('he')
      getData()
      bulgeAnimation()
    }
  });

  rightTapHammer.on("doubletap", function(ev)  {

    console.log('pop');
    if (coinIndex >= 0 && coinIndex <= 184 && window.getComputedStyle(mainContainerDiv).display == "flex") {
      coinIndex = coinIndex + 15;
      console.log(coinIndex);
      console.log('hey')
      getData()
      bulgeAnimation()
    }
    else if (coinIndex > 184 && window.getComputedStyle(mainContainerDiv).display == "flex") {
      var x = (200 - coinIndex);
      coinIndex = 15 - x;
      console.log(coinIndex);
      console.log('he')
      getData()
      bulgeAnimation()
    }
  });



  // mc.add( new Hammer.Swipe({ event: 'panleft', threshold: 1000, pointers: 1, velocity: 0.3}) );
  // mc.add( new Hammer.Swipe({ event: 'panright', threshold: 1000, pointers: 1, velocity: 0.3}) );

  // mc.add( new Hammer.Swipe({ event: 'swipeleft', threshold: 15, pointers: 1}) );
  // mc.add( new Hammer.Swipe({ event: 'swiperight', threshold: 15, pointers: 1}) );

  // mc.add( new Hammer.Swipe({ event: 'swipedown', threshold: 15, pointers: 1}) );
  // mc.add( new Hammer.Swipe({ event: 'swipeup', threshold: 15, pointers: 1}) );


  mc.get('press').set({ time: 700 });

  mc.on("press", function(ev)  {
    if (coinIndex != 0 && window.getComputedStyle(mainContainerDiv).display == "flex") {
      coinIndex = 0;
      console.log('hey')
      getData()
      bulgeAnimation()
    }
  });


  mc.get('pan').set({ direction: Hammer.DIRECTION_ALL });
  mc.get('swipe').set({ direction: Hammer.DIRECTION_ALL });

  mc.get('swipe').set({ threshold: 20});




  mc.on("swipeleft", function(ev)  {
    if (coinIndex != 199 && window.getComputedStyle(mainContainerDiv).display == "flex") {
      coinIndex++;
      console.log(coinIndex);
      console.log('hey')
      getData()
      bulgeAnimation()
    }
    else if (window.getComputedStyle(instructionsDiv).display == "block" && errorVal == 0){
      instructionsDiv.style.display = "none"
      instructionsDiv.style.visibility = "hidden"
      instructionsDiv.style.opacity = "0"
      
      mainContainerDiv.style.display = "flex"
      mainContainerDiv.style.visibility = "visible"
      setTimeout(function(){ mainContainerDiv.style.opacity = "1" }, 30);    
  
      console.log('ping')
    }
    else if (coinIndex == 199 && window.getComputedStyle(mainContainerDiv).display == "flex") {
      coinIndex = 0;
      console.log(coinIndex);
      console.log('back')
      getData()
      bulgeAnimation()
    }
  });

  mc.on("swiperight", function(ev)  {
    if (coinIndex != 0 && window.getComputedStyle(mainContainerDiv).display == "flex") {
      coinIndex--;
      console.log(coinIndex);
      console.log('back')
      getData()
      bulgeAnimation()
    }
    else if (window.getComputedStyle(instructionsDiv).display == "block" && errorVal == 0){
      instructionsDiv.style.display = "none"
      instructionsDiv.style.visibility = "hidden"
      instructionsDiv.style.opacity = "0"
      
      mainContainerDiv.style.display = "flex"
      mainContainerDiv.style.visibility = "visible"
      setTimeout(function(){ mainContainerDiv.style.opacity = "1" }, 30);    
  
      console.log('ping')
    }
    else if (coinIndex == 0 && window.getComputedStyle(mainContainerDiv).display == "flex") {
      coinIndex = 199;
      console.log(coinIndex);
      console.log('back')
      getData()
      bulgeAnimation()
    }
  });

  mc.on("swipeup", function(ev)  {

    if (window.getComputedStyle(mainContainerDiv).display == "flex" && window.getComputedStyle(coinRankDiv).fontSize == "0px") {
      coinRankDiv.style.fontSize = "6vw"
    }
    else if (window.getComputedStyle(mainContainerDiv).display == "flex" && window.getComputedStyle(coinRankDiv).fontSize < "6vw") {
      coinRankDiv.style.fontSize = "0px"
      }
      console.log('test')

  });

  mc.on("swipedown", function(ev)  {

    console.log('pep');
    toggleInfo();
  });

}


  

function coinIncrement(e) {
  Y = e.deltaY;
  // console.log(Y);
  if ((Y > 0 || e.which == 39) && coinIndex != 199 && window.getComputedStyle(mainContainerDiv).display == "flex") {
    coinIndex++;
    console.log(coinIndex);
    getData()
    bulgeAnimation()
  }
  else if ((Y > 0 || e.which == 39) && coinIndex == 199 && window.getComputedStyle(mainContainerDiv).display == "flex") {
    coinIndex = 0;
    console.log(coinIndex);
    getData()
    bulgeAnimation()
  }
  else if ((Y < 0 || e.which == 37) && coinIndex != 0 && window.getComputedStyle(mainContainerDiv).display == "flex") {
    coinIndex--;
    console.log(coinIndex);
    getData()
    bulgeAnimation()
  }  
  else if ((Y < 0 || e.which == 37) && coinIndex == 0 && window.getComputedStyle(mainContainerDiv).display == "flex") {
    coinIndex = 199;
    console.log(coinIndex);
    getData()
    bulgeAnimation()
  }  
}

function fontSizeChange(e) {  

  if ((e.which == 38 ) && scaleVar < 140 && window.getComputedStyle(mainContainerDiv).display == "flex") {
    scaleVar = scaleVar + 5;
    scaleVarMC = scaleVarMC + 1.5;

    coinRankDiv.style.fontSize = scaleVarMC + "px"
    coinNameDiv.style.fontSize = scaleVar + "px"
    coinImageSRC.style.fontSize = scaleVar + "px"
    coinPriceDiv.style.fontSize = scaleVar + "px"
    console.log('up')
    console.log(scaleVar)
  }  
  else if (( e.which == 40 ) && scaleVar > 30 && window.getComputedStyle(mainContainerDiv).display == "flex") {
    scaleVar = scaleVar - 5;
    scaleVarMC = scaleVarMC - 1.5;
    
    coinRankDiv.style.fontSize = scaleVarMC + "px"
    coinNameDiv.style.fontSize = scaleVar + "px"
    coinImageSRC.style.fontSize = scaleVar + "px"
    coinPriceDiv.style.fontSize = scaleVar + "px"
    console.log('down')
    console.log(scaleVar)
  }
}





function hideMC(e) {
  if (e.which == 13 && window.getComputedStyle(mainContainerDiv).display == "flex" && window.getComputedStyle(coinRankDiv).fontSize > "0px") {
    coinRankDiv.style.fontSize = "0px"
  }
  else if (e.which == 13 && window.getComputedStyle(mainContainerDiv).display == "flex" && window.getComputedStyle(coinRankDiv).fontSize == "0px") {
    coinRankDiv.style.fontSize = scaleVarMC + "px"
    }

}

function backToOne(e) {
  if (e.which == 32 && coinIndex != 0 && window.getComputedStyle(mainContainerDiv).display == "flex") {
    coinIndex = 0;
    console.log('hey')
    getData()
    bulgeAnimation()
  }

}


function bulgeAnimation() {
  coinPriceDiv.classList.add("coinNameBulge");
  setTimeout(function () {
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


function firstVisit(){
  if(localStorage.getItem("firstVisitToPage")==null){
    console.log('DOM fully loaded and parsed');
    instructionsDiv.style.display = "block"
    instructionsDiv.style.visibility = "visible"
    instructionsDiv.style.opacity = "1"

    mainContainerDiv.style.display = "none"
    mainContainerDiv.style.visibility = "hidden"
    mainContainerDiv.style.opacity = "0"
    localStorage.setItem("firstVisitToPage","done");
  }
}


function toggleInfo(){
  if (window.getComputedStyle(instructionsDiv).display == "block" && errorVal == 0){
    instructionsDiv.style.display = "none"
    instructionsDiv.style.visibility = "hidden"
    instructionsDiv.style.opacity = "0"
    
    mainContainerDiv.style.display = "flex"
    mainContainerDiv.style.visibility = "visible"
    setTimeout(function(){ mainContainerDiv.style.opacity = "1" }, 30);    

    console.log('ping')
  }
  else if (errorVal == 1){
    instructionsDiv.style.display = "none"
    instructionsDiv.style.visibility = "hidden"
    instructionsDiv.style.opacity = "0"

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






if( navigator.userAgent.match(/Android/i)
 || navigator.userAgent.match(/webOS/i)
 || navigator.userAgent.match(/iPhone/i)
 || navigator.userAgent.match(/iPad/i)
 || navigator.userAgent.match(/iPod/i)
 || navigator.userAgent.match(/BlackBerry/i)
 || navigator.userAgent.match(/Windows Phone/i))
 {

  instructionsDiv.style.fontSize=('4.1vw');
  coinNameDiv.style.fontSize=('12vw');
  coinPriceDiv.style.fontSize=('12vw');
  coinRankDiv.style.fontSize=('6vw');
  coinRankDiv.style.marginBottom=('-15px');

  instructionsDiv.innerHTML = 
  `Hello!
  This is just a simple price tracker for cryptocurrencies created by me, <a href="https://seanmythen.net/" target="_blank">Sean Mythen</a>! <br> <br>
  Data is retrieved from <a href="https://www.coingecko.com" target="_blank">CoinGecko</a> every minute. <br> <br>
  Swipe LEFT or RIGHT to browse the top 200 coins by market cap. <br> <br>
  DOUBLE TAP on the LEFT or RIGHT of your screen to jump up or down 15 coins respectively. <br> <br>
  Tap and HOLD to jump back to the 1st coin. <br> <br>
  Swipe UP to toggle market cap ranking visibility. <br> <br>
  Swipe DOWN to hide/show these instruction.`
 }