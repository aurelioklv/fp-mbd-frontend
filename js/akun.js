const locale = "id-ID";
const dateOptions = {
  year: "numeric",
  month: "long",
  day: "numeric",
};

const formatter = new Intl.NumberFormat(locale, {
  style: "currency",
  currency: "IDR",
});

fetch("http://localhost:5000/account")
  .then((response) => response.json())
  .then((data) => {
    data = data[0];

    const ktpElement = document.getElementById("acc_ktp_num");
    const nameElement = document.getElementById("acc_name");
    const emailElement = document.getElementById("acc_email");
    const phoneNumberElement = document.getElementById("acc_phone_num");
    const addressElement = document.getElementById("acc_address");
    const bankNumberElement = document.getElementById("acc_bank_num");
    const bankElement = document.getElementById("acc_bank");
    const jobElement = document.getElementById("acc_job");
    const salaryElement = document.getElementById("acc_salary");
    const emergencyPhoneElement = document.getElementById("acc_emergency_phone_num");
    const emergencyRelationElement = document.getElementById("acc_emergency_contact_relationship");
    const biologicalMotherElement = document.getElementById("acc_biological_mother_name");
    // const regDateElement = document.getElementById("acc_reg_date");
    // const ratingElement = document.getElementById("acc_rating");

    ktpElement.innerText = data.acc_ktp_num;
    nameElement.innerText = data.acc_name;
    emailElement.innerText = data.acc_email;
    phoneNumberElement.innerText = data.acc_phone_num;
    addressElement.innerText = data.acc_address;
    bankNumberElement.innerText = data.acc_bank_num;
    bankElement.innerText = data.acc_bank;
    jobElement.innerText = data.acc_job;
    salaryElement.innerText = formatter.format(data.acc_salary);
    emergencyPhoneElement.innerText = data.acc_emergency_phone_num;
    emergencyRelationElement.innerText = data.acc_emergency_contact_relationship;
    biologicalMotherElement.innerText = data.acc_biological_mother_name;
    // regDateElement.innerText = data.acc_reg_date;
    // ratingElement.innerText = data.acc_rating;
  })
  .catch((error) => {
    console.error("Error:", error);
  });
