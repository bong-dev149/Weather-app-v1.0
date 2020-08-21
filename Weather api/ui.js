class UI {
  constructor() {
    this.locationInput = document.querySelector(".c-location");
    this.locationForm = document.querySelector("form");
    this.container = document.querySelector(".container");
    this.locationLable = document.querySelector(".location-lead");
    this.countryCode = document.querySelector(".parent-loc");
    this.temparature = document.querySelector(".temp-lead");
    this.pressure = document.querySelector(".pres");
    this.humidity = document.querySelector(".humi");
    this.wind = document.querySelector(".wind");
    this.weatherStatus = document.querySelector(".weather-status");
    this.icon = document.querySelector(".icon");
    this.err = false;
  }

  removePreviousClass() {
    if (this.container.classList.contains("rainy"))
      this.container.classList.remove("rainy");
    if (this.container.classList.contains("sunny"))
      this.container.classList.remove("sunny");
    if (this.container.classList.contains("hrain"))
      this.container.classList.remove("hrain");
    if (this.container.classList.contains("partly"))
      this.container.classList.remove("partly");
    if (this.container.classList.contains("thunder"))
      this.container.classList.remove("thunder");
    if (this.container.classList.contains("snow"))
      this.container.classList.remove("snow");
    if (this.container.classList.contains("mist"))
      this.container.classList.remove("mist");
    if (this.container.classList.contains("haze"))
      this.container.classList.remove("haze");
  }

  clearPreviuosError() {
    let remEl = document.querySelector(".error");
    remEl.parentNode.removeChild(remEl);
  }

  showError(msg) {
    const div = document.createElement("div");
    div.className = "error";
    div.textContent = msg;
    this.container.insertBefore(div, document.querySelector(".lead"));
    this.err = true;
    // console.log("here");
    // console.log(this.err);
    setTimeout(this.clearPreviuosError, 2000);
    this.err = false;
  }

  showWeather(weatherResponse) {
    // console.log(weatherResponse);
    if (
      weatherResponse.message === "city not found" ||
      weatherResponse.message === "Nothing to geocode"
    ) {
      this.showError(weatherResponse.message);
      return;
    }

    // rendering the location name
    this.locationLable.textContent = weatherResponse.name;
    // rendering the country code
    this.countryCode.textContent = weatherResponse.sys.country;
    // rendering the temperature
    this.temparature.textContent = `${(
      parseFloat(weatherResponse.main.temp) - 273.15
    ).toFixed(1)} °C`;
    // Rendering the pressure
    this.pressure.textContent = `${weatherResponse.main.pressure} hPa`;
    // Rendering the humidity
    this.humidity.textContent = `${weatherResponse.main.humidity} %`;
    // Rendering the wind
    this.wind.textContent = `${(weatherResponse.wind.speed / 0.62137).toFixed(
      0
    )} km/h`;
    let description = weatherResponse.weather[0].description;
    let mainDescription = weatherResponse.weather[0].main;
    // console.log(mainDescription);
    this.weatherStatus.textContent = description;
    this.icon.innerHTML = `<img src='http://openweathermap.org/img/wn/${weatherResponse.weather[0].icon}@2x.png'>`;
    //changing the background
    switch (mainDescription) {
      case "Drizzle":
        this.removePreviousClass();
        this.container.classList.add("rainy");
        break;
      case "Rain":
        this.removePreviousClass();
        this.container.classList.add("rainy");
        break;

      case "Clear":
        this.removePreviousClass();
        this.container.classList.add("sunny");
        break;

      case "Haze":
        this.removePreviousClass();
        this.container.classList.add("haze");
        break;

      case "Clouds":
        this.removePreviousClass();
        this.container.classList.add("partly");
        break;
      case "Thunderstorm":
        this.removePreviousClass();
        this.container.classList.add("thunder");
        break;

      case "Snow":
        this.removePreviousClass();
        this.container.classList.add("snow");
        break;

      case "Mist" || "Fog":
        this.removePreviousClass();
        this.container.classList.add("snow");
        break;

      default:
        this.removePreviousClass();
        this.container.classList.add("default");
        break;
    }
  }
}
