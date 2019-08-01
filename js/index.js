$(window).load(function() {

  var cTemp;
  var fTemp;
  var weatherIconType;

  //get the appropriate background image
  function backgroundImage(weather) {
    switch (weather.toLowerCase()) {
      //sunny
      case "sunny":
      case "mostly sunny":
      case "partly sunny":
      case "clear skies":
      case "clear":
        return "../weather/img/sunny.jpg";        
        
        
      //clouds
      case "mostly cloudy": 
      case "partly cloudy":
      case "scattered clouds":        
      case "overcast":
      case "haze":
      case "clouds":
      case "broken clouds":
        return "../weather/img/cloudy.jpg";
        

      // rain
      case "rain":
      case "chance of rain":
        return "../weather/img/rainy.jpg";        

        
        //snow
      case "flurries":
      case "snow":
      case "chance of snow":
      case "sleet":
      case "chance of sleet":
        return "../weather/img/snowing.jpg";
        

        // extreme
      case "funnel cloud":
      case "squalls":
        return "../weather/img/extreme.jpg";
    }
  }

  $(document).ready(function() {
    getLocation();
  });

  // Run Geolocation to get user's lat and lon.
  function getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function(position) {
        var lat = position.coords.latitude;
        var lon = position.coords.longitude;
        getWeather(lat, lon);
      });
    }
  }
  //Get weather using lat and lon coordinates
  function getWeather(lat, lon) {

    //Call API
    $.ajax({
      type: 'GET',
      asynch: false,
      url: "https://fcc-weather-api.glitch.me/api/current?lat=" + lat + "&lon=" + lon,
      contentType: "application/json",
      dataType: "jsonp",
      //success function
      success: function(response) {
        //store user location
        var userLocation = response.name;
        //store temperature in celcius
        cTemp = Math.round(response.main.temp);        
        //store temperature in fahrenheit
        fTemp = cTemp * (9/5) + 32;
        //store weather description
        var weather = response.weather[0].main;
        //store weather icon
        weatherIconType = response.weather[0].icon;
        console.log(weatherIconType);

        //Update inner html with response data
        city.innerHTML = userLocation;
        temperature.innerHTML = fTemp + "&deg;F";
        if (weatherIconType == undefined) {
          weatherDesc.innerHTML = weather;
        } else {
          weatherDesc.innerHTML = "<img src='" + weatherIconType + "' width='40px' height='40px'>&nbsp;" + weather;
        };
        
        $("body").css("background-image", "url(" + backgroundImage(weather) + ")");
      }
    })
  }

  //button stuff

  $('#metric').click(function(evt) {

    evt.preventDefault();

    temperature.innerHTML = cTemp + "&deg;C";

    document.getElementById("metric").style.display = "none";
    document.getElementById("imperial").style.display = "block";

  }); // end button function

  $('#imperial').click(function(evt) {

    evt.preventDefault();

    temperature.innerHTML = fTemp + "&deg;F";

    document.getElementById("metric").style.display = "block";
    document.getElementById("imperial").style.display = "none";

  }); // end button function  

});
