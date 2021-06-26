// Variables
const input = document.querySelector("#search");
const form = document.querySelector("form");
const select = document.querySelector(".select");
const selectOptions = document.querySelectorAll(".selectdrop li");
const footer = document.querySelector(".footer-content");

// Submit Event
form.addEventListener("submit", fetchMovie);

// Fetch Data
function fetchMovie(e) {
  e.preventDefault();
  let key = "683fa3d8c5f2bf2d5c60a5256d795c04";
  let movie = input.value;
  fetch(
    `https://api.themoviedb.org/3/search/multi?query=${movie}&api_key=${key}&language=en-US&page=1&include_adult=false`
  )
    .then((res) => {
      if (res.status !== 200) {
        // Show Error Message
        throw Error(res.statusText);
      } else {
        return res.json();
      }
    })
    .then((data) => {
      let output = "";
      data.results.forEach((result) => {
        output += `<div class="card">
                    <div class="card-img">
                      <img
                        src="https://image.tmdb.org/t/p/w300${
                          result.poster_path ||
                          result.profile_path ||
                          result.backdrop_path ||
                          `https://image.tmdb.org/t/p/w500/wwemzKWzjKYJFfCeiB57q3r4Bcm.png`
                        }"
                        alt="country-img"
                        loading="lazy"
                        class="img"
                      />
                    </div>
                    <div class="card-body">
                      <h4>${
                        result.original_title || result.name || result.title
                      }</h4>
                      <p>${
                        result.overview
                          ? result.overview
                          : "No description available"
                      }</p>
                      <p><b>Release Date:</b> ${
                        result.release_date ? result.release_date : "TBD"
                      }</p>
                      <div class="media">
                        <p><b>Category:</b> <span>${
                          result.media_type
                        }</span></p>
                      </div>
                    </div>
                  </div>`;
      });
      document.querySelector(".cards").innerHTML = output;
    })
    .catch((err) => console.log(err));
  input.value = "";
  footer.style.opacity = 1;
}
