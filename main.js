// Variables
const form = document.querySelector("form");
const input = document.querySelector("#user");
// Event Listener
form.addEventListener("submit", fetchData);
// Fetch Data
function fetchData(e) {
  e.preventDefault();
  const username = input.value;
  fetchInfo(username);
  input.value = "";
}
// Fect All Data
function fetchInfo(username) {
  const userInfo = fetch(`https://api.github.com/users/${username}`).then(
    (res) => validateInput(res)
  );
  const userRepo = fetch(`https://api.github.com/users/${username}/repos`).then(
    (res) => validateInput(res)
  );
  Promise.all([userInfo, userRepo])
    .then((values) => {
      const data = { user: values[0], repo: values[1] };
      const { user, repo } = data;
      console.log(repo);
      showUser(user);
      showRepos(repo);
    })
    .catch((err) => console.log(err));
}
// Show User
function showUser(users) {
  let output = "";
  const {
    avatar_url,
    bio,
    followers,
    following,
    html_url,
    login,
    public_repos,
  } = users;
  output += `<img src="${avatar_url}" alt="profile+img" />
                <a href="${html_url}" target="_blank"><h3>@${login}</h3></a>
                <p class="bio">
                  ${bio ? bio : "No bio attached"}
                </p>
                <div class="profile-tags">
                  <div class="tag">
                    <h4>${followers}</h4>
                    <p>Followers</p>
                  </div>
                  <div class="tag">
                    <h4>${following}</h4>
                    <p>Following</p>
                  </div>
                  <div class="tag">
                    <h4>${public_repos}</h4>
                    <p>Repositories</p>
                  </div>
                </div>`;
  document.querySelector(".profile").innerHTML = output;
}
// Show Repos
function showRepos(repos) {
  repos.sort((a, b) => (a.created_at < b.created_at ? 1 : -1));
  let output = "";
  repos.forEach((repo) => {
    output += `<div class="card">
                  <a href="${repo.html_url}" target="_blank"><h4>${
      repo.name
    }</h4></a>
                  <p>${
                    repo.description
                      ? repo.description
                      : "No description attached"
                  }</p>
                  <ul class="star-fork">
                    <li>
                      <span><i class="fa fa-star"></i></span>
                      <span>${repo.stargazers_count}</span>
                    </li>
                    <li>
                      <span><i class="fa fa-code-branch"></i></span>
                      <span>${repo.forks_count}</span>
                    </li>
                  </ul>
                </div>`;
  });
  document.querySelector(".cards").innerHTML = output;
}
// Remove Search
function removeSearch() {
  document.querySelector(".searchbox").style.left = "-100%";
}
// Show Error
function validateInput(res) {
  if (res.status !== 200) {
    document.querySelector(".err").style.opacity = 1;
    setTimeout(() => (document.querySelector(".err").style.opacity = 0), 3000);
  } else {
    removeSearch();
    return res.json();
  }
}
