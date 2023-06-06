const form = document.getElementById("login-form");
const emailInput = document.getElementById("email-input");
const passwordInput = document.getElementById("password-input");
const submitFormButton = document.getElementById("submit-button");

form.addEventListener("submit", (event) => {
  event.preventDefault();

  let password = passwordInput.value;
  let hashedPassword = CryptoJS.SHA256(password).toString();
  passwordInput.value = hashedPassword;

  form.submit();
});
