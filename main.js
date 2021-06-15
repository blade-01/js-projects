// Variables
const form = document.querySelector("form");
const input = document.querySelector("#weather");

// Event Listener
form.addEventListener("submit", fetchWeather);

// Fetch Function
function fetchWeather(e) {
  e.preventDefault();
  const key = "661984f378bc7b8bb29169ab2d7c6b6e";
  const inputValue = input.value;
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${inputValue}&appid=${key}&units=metric`
  )
    .then((res) => {
      if (res.status !== 200) {
        // Show Output
        throw Error(res.statusText);
      } else {
        return res.json();
      }
    })
    .then((data) => {
      const { main, name, sys, weather } = data;
      console.log(Math.round(main.temp));
      console.log(name, sys.country);
      console.log(weather[0].main);
    })
    .catch((err) => console.log(err));
  document.querySelector("#weather").value = "";
}
