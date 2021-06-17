// // Variables
const form = document.querySelector("form");
const input = document.querySelector("#search");

// Event Listener
form.addEventListener("submit", fetchPhoto);
fetchPhoto();
// Fetch Function
function fetchPhoto(e) {
  e.preventDefault();
  const key = "4PADPOVyni-pXD_JEn8Hk36ENMebemzIz7ys9k2fH8U";
  const photo = input.value;
  fetch(`https://api.unsplash.com/${photo}/photos?client_id=${key}`)
    .then((res) => {
      if (res.status !== 200) {
        // Show Output
        throw Error(res.statusText);
      } else {
        return res.json();
      }
    })
    .then((data) => {
      // const { main, name, sys, weather } = data;
      console.log(data);
    })
    .catch((err) => console.log(err));
  document.querySelector("#search").value = "";
}

// // setTimeout(() => {
// //   document.querySelector(".placeholder-item").remove();
// // }, 3000);
