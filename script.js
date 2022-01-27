var fname = document.forms["form"]["fname"];
var lname = document.forms["form"]["lname"];
var email = document.forms["form"]["email"];
var password = document.forms["form"]["password"];
const input = [fname, lname, email, password];

function validateForm() {
    let counter = 0;
    let validEmail = false;

    for (let i = 0; i < input.length; i++) {
        let inputValue = input[i].value.trim();
        let image = input[i].nextElementSibling;
        let box = input[i].parentNode;
        let message = box.nextElementSibling;

        function emptyField() {
            box.style.marginBottom = "0";
            image.style.display = "flex";
            message.style.display = "block";
        }

        function correctField() {
            box.style.marginBottom = "1em";
            image.style.display = "none";
            message.style.display = "none";
        }

        function focusEmptyField() {
            box.style.outline = "1px solid var(--blue)";
        }

        function focusInvalidField() {
            box.style.outline = "transparent";
            input[i].addEventListener("focus", focusEmptyField, true);
            input[i].addEventListener("keyup", focusEmptyField, true);
        }

        function focusNextField() {
            box.style.outline = "transparent";
            input[i + 1].focus();
            let nextBox = input[i + 1].parentNode;
            nextBox.style.outline = "1px solid var(--blue)";
        }

        // Hover all fields.
        input[i].addEventListener("mouseenter", focusEmptyField, true);
        input[i].addEventListener("mouseleave", function () {
            box.style.outline = "transparent";
        });

        // Remove/add error when typing.
        input[i].addEventListener("keyup", function (e) {
            let value = e.target.value.trim()
            if (value.length > 0) {
                correctField();
            } else if (e.keyCode === 8 && value.length === 0) {
                if (input[i] === email) {
                    message.innerHTML = "Email Address cannot be empty";
                }
                emptyField();
            }
        })

        // Show/remove error.
        if (inputValue.length === 0) {
            emptyField();
            focusInvalidField();

        } else if (inputValue.length > 0) {

            if (input[i] === email) {
                let at = inputValue.indexOf("@");
                let dot = inputValue.lastIndexOf(".");

                if (!(inputValue.includes("@") &&
                    inputValue.includes(".") &&
                    !inputValue.startsWith("@") &&
                    !inputValue.endsWith("@") &&
                    !inputValue.startsWith(".") &&
                    !inputValue.endsWith(".") &&
                    (dot - at > 2))
                ) {
                    message.innerHTML = "Looks like this is not an email";
                    emptyField();
                    focusInvalidField();

                } else {
                    validEmail = true;
                    correctField();
                }

            } else {
                correctField();
            }

            // Highlight next empty field.
            input[i].addEventListener("keyup", function (e) {
                if (e.keyCode === 13) {
                    if (input[i + 1] !== password) {
                        focusNextField();

                    } else if (input[i] === email) {
                        if (!validEmail) {
                            emptyField();
                        } else {
                            focusNextField();
                        }
                    }
                }
            })

            counter = counter + 1;
        }
    }

    // Submits only when all fields are correctly filled in.
    if (counter === input.length && validEmail === true) {
        return true;
    } else {
        return false;
    }
}
