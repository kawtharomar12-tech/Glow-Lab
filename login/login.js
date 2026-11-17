// Get the password input
const passwordInput = document.getElementById("password");

// Get the eye button
const showPasswordButton = document.getElementById("showPassword");


// When the user clicks the eye button
showPasswordButton.addEventListener("click", function () {

    // If the password is hidden
    if (passwordInput.type === "password") {

        // Show it
        passwordInput.type = "text";

    } else {

        // Hide it again
        passwordInput.type = "password";
    }



});

const createAccountButton =
    document.getElementById("createAccountButton");


createAccountButton.addEventListener(
    "click",
    function () {

        window.location.href =
            "../register/register.html";

    }
);