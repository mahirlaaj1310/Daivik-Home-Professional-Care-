// Firebase config
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT.firebaseapp.com",
  projectId: "YOUR_PROJECT",
  appId: "YOUR_APP_ID"
};

// Init firebase (safe)
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const auth = firebase.auth();

// Open login popup
function openLogin() {
  document.getElementById("loginModal").style.display = "block";
  window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier(
    "recaptcha-container",
    { size: "invisible" }
  );
}

// Send OTP
function sendOTP() {
  const phone = "+91" + document.getElementById("phone").value;
  auth.signInWithPhoneNumber(phone, window.recaptchaVerifier)
    .then(res => {
      window.confirmationResult = res;
      document.getElementById("step-phone").style.display = "none";
      document.getElementById("step-otp").style.display = "block";
    })
    .catch(err => alert(err.message));
}

// Verify OTP (same page)
function verifyOTP() {
  confirmationResult.confirm(document.getElementById("otp").value)
    .then(result => {
      localStorage.setItem("loggedInUser", result.user.phoneNumber);
      document.getElementById("loginModal").style.display = "none";
      document.getElementById("bookBtn").innerText = "Continue Booking";
    })
    .catch(() => alert("Invalid OTP"));
}

// On load check
window.onload = function () {
  if (localStorage.getItem("loggedInUser")) {
    document.getElementById("bookBtn").innerText = "Continue Booking";
  }
};