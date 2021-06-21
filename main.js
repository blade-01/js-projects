// Variables
const form = document.querySelector("form");
const input = document.querySelector("#weather");
const timeStamp = document.querySelector(".time");
const dayStamp = document.querySelector(".day");
const body = document.querySelector("body");
const temp = document.querySelector(".temp-details h2");
const greet = document.querySelector(".temp-details p");
const country = document.querySelector(".details h1");
const weatherData = document.querySelector(".weather-data");
const dataImg = document.querySelector(".data-icon");

// Event Listener
form.addEventListener("submit", fetchProfile);

// Fetch Function
function fetchProfile(e) {
  e.preventDefault();
  const key = "661984f378bc7b8bb29169ab2d7c6b6e";
  const inputValue = input.value;
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${inputValue}&appid=${key}&units=metric`
  )
    .then((res) => {
      if (res.status !== 200) {
        // Show Error Alert
        showAlert("Please provide a valid location", "error");
        throw Error(res.statusText);
      } else {
        return res.json();
      }
    })
    .then((data) => {
      const { main, name, sys, weather } = data;
      country.textContent = `${name}, ${sys.country}`;
      temp.textContent = `${Math.round(main.temp)}°C`;
      weatherData.style.opacity = 1;
      dataImg.src = `http://openweathermap.org/img/wn/${weather[0].icon}@2x.png`;
      greet.textContent = `${weather[0].main}`;
    })
    .catch((err) => console.log(err));
  document.querySelector("#weather").value = "";
}

function showAlert(message, alert) {
  const div = document.createElement("div");
  div.setAttribute("class", `alert ${alert}`);
  div.appendChild(document.createTextNode(message));
  const container = document.querySelector(".container");
  const form = document.querySelector("form");
  container.insertBefore(div, form);
  setTimeout(() => {
    document.querySelector(".alert").remove();
  }, 2000);
}

// Time
function showTime() {
  let time = new Date(),
    day = time.getDay(),
    days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ],
    hour = time.getHours(),
    mins = time.getMinutes();
  // Set AM PM
  const amPm = hour >= 12 ? "PM" : "AM";
  //  12hr Format
  hour = hour % 12 || 12;
  // Add to HTML
  timeStamp.textContent = `${hour}:${addZero(mins)} ${amPm}`;
  dayStamp.textContent = `${days[day]}`;

  setTimeout(showTime, 1000);
}

// Add Zero to minutes
function addZero(n) {
  return (parseInt(n, 10) < 10 ? "0" : "") + n;
}

// Add Daytime or Nighttime
function setByGreet() {
  const time = new Date(),
    hour = time.getHours();
  if (hour < 12) {
    body.style.cssText =
      "background: url('/img/morning.jpg') center center/cover;";
  } else if (hour < 18) {
    body.style.cssText =
      "background: url('/img/afternoon.jpg') center center/cover;";
  } else {
    body.style.cssText =
      "background: url('/img/evening.jpg') center center/cover;";
  }
}

// Call
showTime();
setByGreet();
