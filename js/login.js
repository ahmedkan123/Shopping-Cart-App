let username = document.querySelector("#username");
let password = document.querySelector("#password");
let signBtn = document.querySelector("#sign_in");

let getuser = localStorage.getItem("username");
let getpassword = localStorage.getItem("password");

signBtn.addEventListener("click", function(e) {
    e.preventDefault();
    if(username.value === "" || password.value === "") {
        alert("please fill data");
    } else {
        if(getuser && getuser.trim() === username.value.trim() &&
         getpassword && getpassword.trim() === password.value) {
             setTimeout( () => {
                 window.location = "index.html";
             }, 1500);
         } else {
             console.log("username or password is wrong..!!");
         }
    }

});