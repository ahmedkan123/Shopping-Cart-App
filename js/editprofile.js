// get username and email
let get_username = localStorage.getItem("username");
let get_email = localStorage.getItem("email");

// variable
let userInput = document.getElementById("changeName");
let userEmailDom = document.getElementById("changeEmail");
let editForm = document.getElementById("edit-profile-form")

//setting values of input 
userInput.value = get_username;
userEmailDom.value = get_email;

//events

editForm.addEventListener("submit", editProfileData);

function editProfileData(e) {
    e.preventDefault();

    localStorage.setItem("username", userInput.value );
    localStorage.setItem("email", userEmailDom.value );

    setTimeout(() => {
        window.location = "profile.html";

    }, 500);

}

