 function loadProfile() {
    const userProfile = JSON.parse(localStorage.getItem('userProfile'));
  
    if (userProfile) {
      document.getElementById('name').textContent = userProfile.name;
      document.getElementById('surname').textContent = userProfile.surname;
    } else {
      alert("Oops! No user profile found.");
      window.location.href = 'signup.html'; // Or your account creation page
    }
  }
  document.addEventListener("DOMContentLoaded", loadProfile);
  