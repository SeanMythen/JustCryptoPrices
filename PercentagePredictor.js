
var DateArray = [];
var priceArray = [];



getPercentageData()


  function getPercentageData() {
    fetch('https://api.coingecko.com/api/v3/coins/avalanche-2/market_chart?vs_currency=usd&days=max&interval=daily')
      .then(response => {
        return response.json()
      })
      .then(data => {
        errorVal = 0;
        // Work with JSON data here
        coinRank = data.prices;

        for (let i = 0; i < coinRank.length; i++) {

            let unix_timestamp = coinRank[i][0];

                // Create a new JavaScript Date object based on the timestamp
                // multiplied by 1000 so that the argument is in milliseconds, not seconds.
                var date = new Date(unix_timestamp);
                // Hours part from the timestamp
                var hours = date.getHours();
                // Minutes part from the timestamp
                var year = date.getFullYear();
                var month = date.getMonth();
                var day = date.getDay();

                var minutes = "0" + date.getMinutes();
                // Seconds part from the timestamp
                var seconds = "0" + date.getSeconds();

                // Will display time in 10:30:23 format
                var formattedTime = month +' '+ day +' '+ year;


            DateArray.push(formattedTime);



          }



          for (let i = 0; i < coinRank.length; i++) {

            let avax_price = coinRank[i][1];




            priceArray.push(avax_price);


            
          }


          myChart.update();
        

        // coinRankDiv.innerHTML = coinRank;
  
        // coinName = data[coinIndex].name;
        // coinNameDiv.innerHTML = coinName;
  
        // coinImage = data[coinIndex].image;
        // coinImageSRC.src = coinImage;
  
        // coinPrice = '$'+ data[coinIndex].current_price;
        // coinPriceDiv.innerHTML = coinPrice;
  
        // change_favicon(coinImageSRC.src);
        // bulgeAnimation();
      })
      .catch(err => {
        errorVal = 1;
        apiError.innerHTML = 'Something seems to be wrong... Check back in a few minutes.';
      })
  }


/**
 * Calculates in percent, the change between 2 numbers.
 * e.g from 1000 to 500 = -50%
 * 
 * @param oldNumber The initial value
 * @param newNumber The newer value
 */
function getPercentageChange(oldNumber, newNumber){
    var numberDifference = newNumber - oldNumber;
    var percentageChange = (numberDifference / oldNumber) * 100;
    return percentageChange;
    console.log(percentageChange);
}


