////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////// Search //////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////

const search_input = document.getElementById("search_input");

let searchWeather = "";
// let errorYes;

if (localStorage.getItem("City") === null) {
  localStorage.setItem("City", "Jaipur");
}

function search_weather() {
  searchWeather = search_input.value;
  if (search_input.value.length > 0) {
    checkCityValidity(searchWeather);

    const preloader = document.getElementById("preloader");
    preloader.classList.remove("hide");
    setTimeout(() => {
      preloader.classList.add("hide");
    }, 2000);

    setTimeout(() => {
      window.location.reload();
    }, 1000);
  }
}

function selectText() {
  search_input.select();
}
window.addEventListener("load", function () {
  const preloader = document.getElementById("preloader");
  setTimeout(() => {
    preloader.classList.add("hide");
  }, 1000);
});

////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////// Api Fetch /////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////

function checkCityValidity(city) {
  let url = `https://api.weatherapi.com/v1/forecast.json?key=8e1d7a3f9b94452991f114814230806&q=${city}&days=1&aqi=yes&alerts=no`;

  fetch(url)
    .then((response) => {
      if (response.ok) {
        // City is valid, update localStorage and fetch data
        localStorage.setItem("City", city);

        return response.json();
      } else {
        // City is invalid, display error message
        document.getElementById("search").setAttribute("class", "search ji");
        throw new Error("Invalid city");
      }
    })
    .then((data) => {
      ////////////////////////////////////////////////////////////////////////////////////////////////////////
      //////////////////////////////////////////////////// Data //////////////////////////////////////////////
      ////////////////////////////////////////////////////////////////////////////////////////////////////////

      ///////////////////////////   LOCATION    ///////////////////////////
      // Location Data
      locationName = data.location.name;
      locationRegion = data.location.region;
      locationCountry = data.location.country;
      document.getElementById("weatherLocationName").innerText = locationName;
      document.getElementById("weatherLocation").innerText =
        locationName + ", " + locationRegion + ", " + locationCountry;

      // localTime
      localtime = data.location.localtime;
      document.getElementById("localTime").innerText = localtime;

      ///////////////////////////   CURRENT    ///////////////////////////
      // Current Temperature Data
      temp_c = data.current.temp_c;
      document.getElementById("weatherConditionTemp").innerText = temp_c;

      //Cureernt Condition Data
      text = data.current.condition.text;
      icon = data.current.condition.icon;
      document.getElementById("weatherConditionText").innerText = text;
      document.getElementById("weatherConditionicon").src = icon;

      // Current Wind Data
      wind_kph = data.current.wind_kph;
      document.getElementById("wind_now").innerText = wind_kph;

      // Current Pressure Data
      pressure_in = data.current.pressure_in;
      document.getElementById("Pressure").innerText = pressure_in;

      // Current Humidity Data
      humidity = data.current.humidity;
      document.getElementById("humidity").innerText = humidity;

      // Current Cloud Coverage Data
      cloud = data.current.cloud;
      document.getElementById("CloudCoverage").innerText = cloud;

      // Current Feels like_c Data
      feelslike_c = data.current.feelslike_c;
      document.getElementById("FeelLike").innerText = Math.round(feelslike_c);

      // Current Coverage Data
      cloud = data.current.cloud;
      document.getElementById("CloudCoverage").innerText = cloud;

      // Current Visibility Data
      vis_km = data.current.vis_km;
      document.getElementById("Visibility").innerText = vis_km;

      // Current uv Data
      uv = data.current.uv;
      const element = document.getElementById("uvNumber");
      element.dataset.value = uv;

      ///////////////////////////   Forecast   Day ///////////////////////////
      // forecast Maximum Temp Data
      maxtemp_c = data.forecast.forecastday[0].day.maxtemp_c;
      document.getElementById("DayMaxTemp").innerText = maxtemp_c;

      // forecast Minimum Temp Data
      mintemp_c = data.forecast.forecastday[0].day.mintemp_c;
      document.getElementById("DayMinTemp").innerText = mintemp_c;

      // forecast Average Temp Data
      avgtemp_c = data.forecast.forecastday[0].day.avgtemp_c;
      document.getElementById("DayAvgTemp").innerText = avgtemp_c;

      // forecast Max wind Data
      maxwind_kph = data.forecast.forecastday[0].day.maxwind_kph;
      document.getElementById("Max_wind_speed").innerText = maxwind_kph;

      // forecast Avg visibility Data
      avgvis_km = data.forecast.forecastday[0].day.avgvis_km;
      document.getElementById("AvgVisibility").innerText = avgvis_km + " ";

      // forecast Avg Humidity Data
      avghumidity = data.forecast.forecastday[0].day.avghumidity;
      document.getElementById("AvgHumidity").innerText = avghumidity;

      // forecast daily_chance_of_rain Data
      daily_chance_of_rain =
        data.forecast.forecastday[0].day.daily_chance_of_rain;
      document.getElementById("RainChance").innerText = daily_chance_of_rain;

      // forecast daily_chance_of_snow Data
      daily_chance_of_snow =
        data.forecast.forecastday[0].day.daily_chance_of_snow;
      document.getElementById("SnowChance").innerText = daily_chance_of_snow;

      // forecast uv Data
      DayUV = data.forecast.forecastday[0].day.uv;
      document.getElementById("UV_day").innerText = DayUV;

      ///////////////////////////  Forecast   Astrology    ///////////////////////////

      // forecast sunrise Data
      sunrise = data.forecast.forecastday[0].astro.sunrise;
      document.getElementById("sunrise_time").innerText = sunrise;

      // forecast sunset Data
      sunset = data.forecast.forecastday[0].astro.sunset;
      document.getElementById("sunset_time").innerText = sunset;

      ///////////////////////////  AIR QUALITY    ///////////////////////////

      // forecast sunrise Data
      air_cm = data.current.air_quality.co;
      document.getElementById("air_cm").innerText = air_cm.toFixed(1);
      // forecast sunrise Data
      air_no2 = data.current.air_quality.no2;
      document.getElementById("air_no2").innerText = air_no2.toFixed(1);
      // forecast sunrise Data
      air_o3 = data.current.air_quality.o3;
      document.getElementById("air_o3").innerText = air_o3.toFixed(1);
      // forecast sunrise Data
      air_so2 = data.current.air_quality.so2;
      document.getElementById("air_so2").innerText = air_so2.toFixed(1);
      // forecast sunrise Data
      pm2_5 = data.current.air_quality.pm2_5;
      document.getElementById("air_pm2").innerText = pm2_5.toFixed(1);
      // forecast sunrise Data
      pm10 = data.current.air_quality.pm10;
      document.getElementById("air_pm10").innerText = pm10.toFixed(1);
      // forecast sunrise Data
      air_uei = data.current.air_quality["us-epa-index"];
      document.getElementById("air_uei").innerText = air_uei;
      // forecast sunrise Data
      air_gbdi = data.current.air_quality["gb-defra-index"];
      document.getElementById("air_gbdi").innerText = air_gbdi;

      ///////////////////////////  Forecast   Astrology BY HOURS   ///////////////////////////

      setTimeout(() => {
        console.log(data.forecast.forecastday[0].hour.length);
        for (
          let forecastHour = 0;
          forecastHour < data.forecast.forecastday[0].hour.length;
          forecastHour++
        ) {
          //   const element = array[forecastHour];
          const currentTim = document
            .getElementById("localTime")
            .innerText.slice(11);

          let a;
          let b =
            data.forecast.forecastday[0].hour[forecastHour].time.slice(11);

          if (parseInt(b) >= parseInt(currentTim)) {
            if (parseInt(b) === parseInt(currentTim)) {
              a = 'class="currentWeather"';
            } else {
              a = "";
            }
          } else {
            console.log("not");
            a = 'class="ok"';
          }

          document.getElementById(
            "Forecast"
          ).innerHTML += `<div id="ForecastDiv" ${a}>
              <p id="ForecastTime">${data.forecast.forecastday[0].hour[
                forecastHour
              ].time.slice(11)}</p>
              <img id="ForecastImg" src="http:${
                data.forecast.forecastday[0].hour[forecastHour].condition.icon
              }" alt=""/>
              <p id="ForecastTemp">${
                data.forecast.forecastday[0].hour[forecastHour].temp_c
              }</p>
            </div>`;
        }
      }, 1000);

      ///////////////////////////////////////////////////////////////////////////////
    })
    .catch((error) => {
      console.log("Error occurred while fetching API: " + error);
    })
    .finally(() => {
      console.log(" ");
    });
}

setTimeout(() => {
  if (localStorage.getItem("City").length > 0) {
    search_input.value = document.getElementById(
      "weatherLocationName"
    ).innerText;
    //   console.log(document.getElementById("weatherLocationName").innerText);
  }
}, 1000);

// Fetch weather data for the saved city on page load
checkCityValidity(localStorage.getItem("City"));

////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////// Time //////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////
setTimeout(() => {
  function calculatePercentage(startTime, endTime, currentTime) {
    // Parse the given times
    const start = parseTime(startTime);
    const end = parseTime(endTime);
    const current = parseTime(currentTime);
    // console.log(current);
    // Calculate the time difference in minutes
    const totalMinutes = getTimeDifference(start, end);
    const elapsedMinutes = getTimeDifference(start, current);
    // Calculate the percentage
    const percentage = (elapsedMinutes / totalMinutes) * 100;
    // Round the percentage to two decimal places
    const roundedPercentage = Math.round(percentage * 100) / 100;

    let realTimeHourMain = current.hours;
    let realTimeMinuteMain = current.minutes;
    // console.log(realTimeHourMain);
    let realTimeHour;
    let realTimeMinute;
    if (realTimeHourMain >= 12) {
      realTimeHour = realTimeHourMain - 12;
    } else {
      realTimeHour = realTimeHourMain;
    }
    if (realTimeHour <= 9) {
      realTimeHour = "0" + realTimeHour;
    }
    if (realTimeMinuteMain <= 9) {
      realTimeMinute = "0" + realTimeMinuteMain;
    } else {
      realTimeMinute = realTimeMinuteMain;
    }
    // Display time to the bottom to Sunrise and Sunset Bar
    if (realTimeHourMain < 12) {
      document.getElementById(
        "realTime"
      ).innerText = `${realTimeHour}:${realTimeMinute} AM`;
      //  console.log(`${realTimeHour}:${realTimeMinute} AM`);
    } else {
      document.getElementById(
        "realTime"
      ).innerText = `${realTimeHour}:${realTimeMinute} PM`;
      // console.log(`${realTimeHour}:${realTimeMinute} AM`);
    }

    return roundedPercentage;
  }

  function parseTime(timeString) {
    const [hours, minutes, period] = timeString.split(/:|\s/);
    let parsedHours = parseInt(hours);
    if (period === "PM" && parsedHours < 12) {
      parsedHours += 12;
    }
    return { hours: parsedHours, minutes: parseInt(minutes) };
  }

  function getTimeDifference(start, end) {
    const startMinutes = start.hours * 60 + start.minutes;
    const endMinutes = end.hours * 60 + end.minutes;
    return endMinutes - startMinutes;
  }

  // Get real time from API
  const startTime = document.getElementById("sunrise_time").innerText;
  const endTime = document.getElementById("sunset_time").innerText; // Replace with your valid end time in the format of "hh:mm AM/PM"

  // Current time
  const currentTime = document.getElementById("localTime").innerText.slice(11);
  //   const currentTime = "2023-06-13 1:04".slice(11);
  //   console.log(currentTime);
  // console.log(`${realTimeHourMain}:${realTimeMinuteMain}`);
  const percentage = calculatePercentage(startTime, endTime, currentTime);

  /// Future errors fixing - if time is greater or less than the set time range
  let rotate;
  if (percentage >= 100 || percentage < 0) {
    rotate = 180;
  } else {
    rotate = 1.8 * percentage;
  }

  // Set value to the Sunrise and Sunset Bar
  document
    .getElementById("jkl")
    .style.setProperty("--valueForSunriseSunsetRotate", `rotate(${rotate}deg)`);

  // let realTimeHourMain = new Date().getHours();
  // let realTimeMinuteMain = new Date().getMinutes();
}, 2000);

////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////// Time //////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////
