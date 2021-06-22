const inputs = document.querySelectorAll(".input");
const forms = document.querySelector("form");
const smalls = document.querySelectorAll("small");

forms.addEventListener("submit", (e) => {
  e.preventDefault();

  inputs.forEach((input) => {
    if (input.value == "") {
      input.classList.add("danger");
    } else {
      input.classList.add("success");
    }
  });
});
