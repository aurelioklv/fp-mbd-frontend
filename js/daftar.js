const submitFormButton = document.getElementById("submit-button");
const form = document.getElementById("registration-form");
const emailInput = document.getElementById("email-input");
const ktpInput = document.getElementById("ktp-input");
const salaryInput = document.getElementById("salary-input");
const passwordInput = document.getElementById("password-input");

document.addEventListener("DOMContentLoaded", () => {
  const emailValidationState = localStorage.getItem("emailValidationState");
  const ktpValidationState = localStorage.getItem("ktpValidationState");
  if (emailValidationState === "exists") {
    emailInput.setCustomValidity("Email sudah terdaftar");
  }
  if (ktpValidationState === "exists") {
    ktpInput.setCustomValidity("KTP sudah terdaftar");
  }
});

submitFormButton.addEventListener("click", function () {
  form.submit();
});

function formatNumber(input) {
  const value = input.value.replace(/[.,]/g, "");
  const formattedValue = new Intl.NumberFormat("id-ID").format(value);

  input.value = formattedValue;
}

// Debounce function
function debounce(func, delay) {
  let timerId;

  return function (...args) {
    clearTimeout(timerId);

    timerId = setTimeout(() => {
      func.apply(this, args);
    }, delay);
  };
}

emailInput.addEventListener(
  "input",
  debounce(async () => {
    const email = emailInput.value;
    const emailExists = await checkEmailExists(email);

    if (emailExists) {
      console.log("Email already exists");
      emailInput.setCustomValidity("Email sudah terdaftar");
    } else {
      emailInput.setCustomValidity("");
    }
    localStorage.setItem("emailValidationState", emailExists ? "exists" : "available");
  }, 300)
);

ktpInput.addEventListener(
  "input",
  debounce(async () => {
    const ktp = ktpInput.value;
    const ktpExists = await checkKtpExists(ktp);

    if (ktpExists) {
      console.log("ktp already exists");
      ktpInput.setCustomValidity("KTP sudah terdaftar");
    } else {
      ktpInput.setCustomValidity("");
    }
    localStorage.setItem("ktpValidationState", ktpExists ? "exists" : "available");
  }, 300)
);

async function checkEmailExists(email) {
  return await fetch(`http://localhost:5000/account?email=${encodeURIComponent(email)}`)
    .then((response) => response.json())
    .then((data) => {
      return data.email_exists;
    })
    .catch((error) => {
      console.error("An error occurred during the email existence check:", error);
    });
}

async function checkKtpExists(ktp) {
  return await fetch(`http://localhost:5000/account?ktp=${encodeURIComponent(ktp)}`)
    .then((response) => response.json())
    .then((data) => {
      return data.ktp_exists;
    })
    .catch((error) => {
      console.error("An error occurred during the ktp existence check:", error);
    });
}

form.addEventListener("submit", async (event) => {
  event.preventDefault();

  let salary = salaryInput.value;
  salary = salary.replace(/\./g, "");
  salaryInput.value = salary;

  let password = passwordInput.value;
  let hashedPassword = CryptoJS.SHA256(password).toString();
  passwordInput.value = hashedPassword;

  form.submit();
});
