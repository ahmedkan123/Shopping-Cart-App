let userinfo = document.querySelector("#user_info");
let user = document.querySelector("#user");
let links = document.querySelector("#links");
let logoutBtn = document.querySelector("#logout");

let username = localStorage.getItem("username");

if (username) {
  links.remove();
  userinfo.style.display = "flex";
  user.innerHTML = username;
}

logoutBtn.addEventListener("click", function () {
  localStorage.clear();
  setTimeout(() => {
    window.location = "register.html";
  }, 1500);
});
