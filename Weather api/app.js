// instances
const ui = new UI();
const weather = new Weather();

// event listener

document.addEventListener("DOMContentLoaded", () => {
  weather.getWeather("kolkata").then((res) => {
    ui.showWeather(res);
  });
});

ui.locationForm.addEventListener("submit", (e) => {
  let location = ui.locationInput.value;
  ui.locationInput.value = "";
  weather.getWeather(location).then((res) => {
    ui.showWeather(res);
  });
  e.preventDefault();
});
