// 🔥 FIREBASE CONFIG
const firebaseConfig = {
  apiKey: "AIzaSyAwA5XF0VnlQC9g-XFfD-MDLujrPc0ppHs",
  authDomain: "daivik-home-professional-care.firebaseapp.com",
  projectId: "daivik-home-professional-care",
  appId: "1:617053901680:web:8ef3e6fbbf07bd69d735b5"
};

// Init Firebase
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const auth = firebase.auth();

// OPEN LOGIN
function openLogin(){
  document.getElementById("loginModal").style.display = "block";
  window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier(
    "recaptcha-container",
    { size: "invisible" }
  );
}

// SEND OTP
function sendOTP(){
  const phone = "+91" + document.getElementById("phone").value;
  auth.signInWithPhoneNumber(phone, window.recaptchaVerifier)
    .then(res => {
      window.confirmationResult = res;
      document.getElementById("step-phone").style.display = "none";
      document.getElementById("step-otp").style.display = "block";
    })
    .catch(e => alert(e.message));
}

// VERIFY OTP
function verifyOTP(){
  confirmationResult.confirm(document.getElementById("otp").value)
    .then(() => {
      window.location.href = "booking.html";
    })
    .catch(() => alert("Invalid OTP"));
}