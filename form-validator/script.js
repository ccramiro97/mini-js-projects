const form = document.getElementById("form");
const username = document.getElementById("username");
const email = document.getElementById("email");
const password = document.getElementById("password");
const password2 = document.getElementById("confirm_password");

function showError(input, message) {
    const formControl = input.parentElement;
    formControl.className = "form-control error";
    const small = formControl.querySelector("small");
    small.innerText = message;
}

function showSuccess(input) {
    const formControl = input.parentElement;
    formControl.className = "form-control success";
}

function getInputName(element) {
    const elementId = element.id;
    const labelSibling = element.parentElement.querySelector(`label[for="${elementId}"]`);
    return labelSibling.innerText;
}

function isValidEmail(value) {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(String(value).toLowerCase());
}

function checkRequired(inputs) {
    inputs.forEach(element => {
        if (element.value.trim() === "") {
            showError(element, `${getInputName(element)} is required`);
        } else {
            showSuccess(element);
        }
    });
}

function checkValidEmail(inputs) {
    inputs.forEach(element => {
        if (!isValidEmail(element.value)) {
            showError(element, "Email address is invalid");
        } else {
            showSuccess(element);
        }
    });
}

function checkEquals(primaryInput, sourceEqualInput, errorLabel) {
    if (primaryInput.parentElement.classList.contains("error")) {
        return;
    }

    if (primaryInput.value !== sourceEqualInput.value) {
        showError(primaryInput, errorLabel);
    } else {
        showSuccess(primaryInput);
    }
}

function checkLength(input, min, max) {
    if (input.parentElement.classList.contains("error")) {
        return;
    }

    if (input.value.length < min) {
        showError(input, `${getInputName(input)} must be at least ${min} characters`);
    } else if (input.value.length > max) {
        showError(input, `${getInputName(input)} must be at less than ${max} characters`);
    } else {
        showSuccess(input);
    }
}

form.addEventListener("submit", function (e) {
    e.preventDefault();
    checkRequired([username, email, password, password2]);
    checkLength(username, 3, 15);
    checkLength(password, 8, 20);
    checkValidEmail([email]);
    checkEquals(password2, password, "Passwords do not match");
});
