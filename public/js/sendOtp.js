const emailInput = document.getElementById("emailInput");
const otpInput = document.getElementById("otpInput");
const generateOTPButton = document.getElementById("generateOTPButton");
const validateOTPButton = document.getElementById("validateOTPButton");
const API = "http://localhost:3000";

let validateFlag = false;

// window.addEventListener('DOMContentLoaded')
generateOTPButton.addEventListener("click", async function () {
  const email = emailInput.value;
  if (isValidEmail(email)) {
    const response = await axios.post(`${API}/otp/sendOtp`, { email: email });
    if (response) {
      //   window.location.href = "validateOtp.html";
      otpInput.removeAttribute("disabled");
      emailInput.disabled = true;
      //   generateOTPButton.textContent = "Validate OTP";
      //   OTPInput.style.display = "block";
      otpInput.focus();
      validateFlag = true;
      generateOTPButton.disabled = true;
      generateOTPButton.className = "disabledBtn";
      validateOTPButton.removeAttribute("disabled");
      validateOTPButton.className = "";
      alert(response.data.message);
    }
  } else {
    alert("Please enter a valid email address.");
  }
});

validateOTPButton.addEventListener("click", async () => {
  const email = emailInput.value;
  const otp = otpInput.value;
  if (otp) {
    axios
      .post(`${API}/otp/validateOtp`, {
        email: email,
        otp: otp,
      })
      .then((response) => {
        if (response.status === 200) {
          localStorage.setItem("token", response.data.token);
          alert("OTP verified successfully");
          window.location.href = "userProfile.html";
        } else {
          console.log("FE Invalid otp");
        }
      })
      .catch((err) => {
        console.log("FE>>>", err);
      });
  }
});

function isValidEmail(email) {
  if (!email) {
    return false;
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function generateOTP() {
  // Generate a random 6-digit OTP
  const otp = Math.floor(100000 + Math.random() * 900000);
  return otp.toString();
}
