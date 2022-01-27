var fname = document.forms["form"]["fname"];
var lname = document.forms["form"]["lname"];
var email = document.forms["form"]["email"];
var password = document.forms["form"]["password"];
const input = [fname, lname, email, password];

function validateForm() {
    let counter = 0;

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

        if (inputValue.length === 0) {
            emptyField();

            // Highlight empty field when enter is being pressed.
            box.style.outline = "transparent";
            function focusEmptyField() {
                box.style.outline = "1px solid var(--blue)";
            }
            input[i].addEventListener("focus", focusEmptyField, true);
            input[i].addEventListener("keyup", focusEmptyField, true);

            // Hover all fields.
            input[i].addEventListener("mouseenter", focusEmptyField, true);
            input[i].addEventListener("mouseleave", function () {
                box.style.outline = "transparent";
            });

        } else if (inputValue.length > 0) {
            correctField();
            counter = counter + 1;

            // Highlight next empty field.
            input[i].addEventListener("keyup", function (e) {
                if (e.keyCode === 13) {
                    box.style.outline = "transparent";
                    input[i + 1].focus();
                    let nextBox = input[i + 1].parentNode;
                    nextBox.style.outline = "1px solid var(--blue)";
                }
            })
        }
    }
    
    if (counter === input.length) {
        return true;
    } else {
        return false;
    }
}
