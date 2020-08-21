class Weather {
  constructor() {
    this.api_key = "78ceb2f0053218fc1fcde7e45dd096c6";
  }

  // Get weather method
  async getWeather(location) {
    let url = `http://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${this.api_key}`;
    const apiResponse = await fetch(url);
    const weatherResponse = await apiResponse.json();
    return weatherResponse;
  }
}
