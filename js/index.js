$(window).load(function() {

  var cTemp;
  var fTemp;

  //get the appropriate background image
  function backgroundImage(weather) {
    switch (weather.toLowerCase()) {
      //sunny
      case "sunny":
      case "mostly sunny":
      case "partly sunny":
      case "clear skies":
      case "clear":
        return "http://www.mikemorkes.com/codepen/weather/sunny.jpg";        
        
        
      //clouds
      case "mostly cloudy": 
      case "partly cloudy":
      case "scattered clouds":        
      case "overcast":
      case "hazy":
        return "http://www.mikemorkes.com/codepen/weather/cloudy.jpg";
        

      // rain
      case "rain":
      case "chance of rain":
        return "http://www.mikemorkes.com/codepen/weather/rainy.jpg";        

        
        //snow
      case "flurries":
      case "snow":
      case "chance of snow":
      case "sleet":
      case "chance of sleet":
        return "http://www.mikemorkes.com/codepen/weather/snowing.jpg";
        

        // extreme
      case "funnel cloud":
      case "squalls":
        return "http://www.mikemorkes.com/codepen/weather/extreme.jpg";
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
      url: "https://api.wunderground.com/api/0826b7a9293c0565/conditions/q/" + lat + "," + lon + ".json",
      contentType: "application/json",
      dataType: "jsonp",
      //success function
      success: function(response) {
        //store user location
        var userLocation = response.current_observation.display_location.city;
        //store temperature in fahrenheit
        fTemp = Math.round(response.current_observation.temp_f);
        //store temperature in celcius
        cTemp = Math.round(response.current_observation.temp_c);
        //store weather description
        var weather = response.current_observation.weather;

        //Update inner html with response data
        city.innerHTML = userLocation;
        temperature.innerHTML = fTemp + "&#8457;";
        weatherDesc.innerHTML = weather;
        $("body").css("background-image", "url(" + backgroundImage(weather) + ")");
      }
    })
  }

  //button stuff

  $('#metric').click(function(evt) {

    evt.preventDefault();

    temperature.innerHTML = cTemp + "&#8451;";

    document.getElementById("metric").style.display = "none";
    document.getElementById("imperial").style.display = "block";

  }); // end button function

  $('#imperial').click(function(evt) {

    evt.preventDefault();

    temperature.innerHTML = fTemp + "&#8457;";

    document.getElementById("metric").style.display = "block";
    document.getElementById("imperial").style.display = "none";

  }); // end button function  

});