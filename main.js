// function fetchMovie() {
//   let key = "683fa3d8c5f2bf2d5c60a5256d795c04";
//   let movie = input.value;
//   fetch(
//     `https://api.themoviedb.org/3/search/tv?query=${movie}&api_key=${key}&language=en-US&page=1&include_adult=false`
//   )
//     .then((res) => {
//       if (res.status !== 200) {
//         // Show Error Message
//         throw Error(res.statusText);
//       } else {
//         return res.json();
//       }
//     })
//     .then((data) => {
//       let output = "";
//       data.results.forEach((result) => {
//         console.log(result);
//         const backdrop = document.querySelector(".backdrop");
//         const poster = document.querySelector(".poster");
//         output += `<h1>${result.name}</h1>
//                   <img src="${result.poster_path}" alt="img">`;
//       });
//       document.querySelector(".container").innerHTML = output;
//       // console.log(data);
//     })
//     .catch((err) => console.log(err));
// }

// fetchMovie();
