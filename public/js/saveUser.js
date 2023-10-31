const nameInput = document.getElementById("fullName");
const emailInput = document.getElementById("email");
const ageInput = document.getElementById("age");
const genderInput = document.getElementById("gender");
const bioInput = document.getElementById("bio");
const API = "http://localhost:3000";

const saveButton = document.getElementById("saveBtn");

function parseJwt(token) {
  var base64Url = token.split(".")[1];
  var base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
  var jsonPayload = decodeURIComponent(
    window
      .atob(base64)
      .split("")
      .map(function (c) {
        return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
      })
      .join("")
  );

  return JSON.parse(jsonPayload);
}

window.addEventListener("DOMContentLoaded", getUserDetails);

async function getUserDetails() {
  const token = localStorage.getItem("token");
  if (token) {
    const decodedToken = parseJwt(token);
    const userId = decodedToken.id;
    const response = await axios.get(`${API}/user/getUser/${userId}`, {
      headers: { Authorization: token },
    });
    const userDetails = response.data.user;
    if (userDetails.name) {
      nameInput.value = userDetails.name;
    }
    if (userDetails.email) {
      emailInput.value = userDetails.email;
      emailInput.disabled = true;
    }
    if (userDetails.age) {
      ageInput.value = userDetails.age;
    }
    if (userDetails.gender) {
      genderInput.value = userDetails.gender;
    }
    if (userDetails.bio) {
      bioInput.value = userDetails.bio;
    }
  }
}

saveButton.addEventListener("click", async (e) => {
  e.preventDefault();
  //   console.log("inside save user button");
  const userObj = {
    name: nameInput.value,
    email: emailInput.value,
    age: ageInput.value,
    gender: genderInput.value,
    bio: bioInput.value,
  };
  const token = localStorage.getItem("token");
  if (token) {
    const decodedToken = parseJwt(token);
    const userId = decodedToken.id;
    const response = await axios.put(
      `${API}/user/saveUser/${userId}`,
      userObj,
      {
        headers: { Authorization: token },
      }
    );
    if (response.status === 200) {
      alert("User data saved successfully");
    }
  } else {
    alert("Please login again using OTP");
    window.location.href = "sendOtp.html";
  }
});
