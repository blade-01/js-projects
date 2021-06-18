// // Variables
const form = document.querySelector("form");
const input = document.querySelector("#search");

// Event Listener
form.addEventListener("submit", fetchPhoto);
// fetchPhoto();
// Fetch Function
function fetchPhoto(e) {
  e.preventDefault();
  const key = "4PADPOVyni-pXD_JEn8Hk36ENMebemzIz7ys9k2fH8U";
  const photo = input.value;
  fetch(
    `https://api.unsplash.com/search/photos?query=${photo}&client_id=${key}&per_page=6`
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
      // const {
      //   urls: { raw },
      //   user: { first_name },
      //   location,
      // } = data;
      // let output = "";
      // for (results in data){

      // }
      const results = data.results;
      let output = "";
      results.forEach((result) => {
        output += `<div class="card placeholder-item">
                    <img src="${result.urls.small}" loading="lazy" alt="img" />
                    <div class="card-body">
                      <h1>${result.user.first_name}</h1>
                      <p>${result.user.location}</p>
                    </div>
                  </div>`;
      });
      document.querySelector(".cards").innerHTML = output;
      console.log(results);
    })
    .catch((err) => console.log(err));
  document.querySelector("#search").value = "";
}

// // setTimeout(() => {
// //   document.querySelector(".placeholder-item").remove();
// // }, 3000);
