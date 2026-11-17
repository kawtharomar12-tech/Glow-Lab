/* =========================================
   ELEMENTS
========================================= */

const registerForm =
    document.getElementById("registerForm");


const passwordInput =
    document.getElementById("password");


const confirmPasswordInput =
    document.getElementById("confirmPassword");


const errorMessage =
    document.getElementById("errorMessage");


const showPasswordButtons =
    document.querySelectorAll(".show-password");


/* =========================================
   SHOW / HIDE PASSWORD
========================================= */

showPasswordButtons.forEach(function (button) {


    button.addEventListener(
        "click",
        function () {


            const targetId =
                button.dataset.target;


            const input =
                document.getElementById(targetId);


            if (input.type === "password") {

                input.type = "text";

            } else {

                input.type = "password";

            }


        }
    );


});


/* =========================================
   REGISTER
========================================= */

registerForm.addEventListener(
    "submit",
    function (event) {


        event.preventDefault();


        errorMessage.textContent = "";


        /* Password length */

        if (passwordInput.value.length < 8) {

            errorMessage.textContent =
                "Password must contain at least 8 characters.";

            return;
        }


        /* Password match */

        if (
            passwordInput.value !==
            confirmPasswordInput.value
        ) {

            errorMessage.textContent =
                "Passwords do not match.";

            return;
        }


        /* Front-end demo */

        alert(
            "Account created successfully!"
        );


        window.location.href =
            "../login/login.html";


    }
);