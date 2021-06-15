let inputValue = "Nigeria";
let key = "661984f378bc7b8bb29169ab2d7c6b6e";

function getData() {
  fetch(
    "api.openweathermap.org/data/2.5/weather?q=London&appid=661984f378bc7b8bb29169ab2d7c6b6e&units=metric"
  )
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
    })
    .catch((err) => console.log(err));
}
getData();
