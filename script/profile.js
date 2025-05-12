//https://chatgpt.com/share/6821c27b-1b54-8007-a3fc-2d350eb9d0f2
 function loadProfile() {
    const userProfile = JSON.parse(localStorage.getItem('userProfile'));
  
    if (userProfile) {
      document.getElementById('name').textContent = userProfile.name;
      document.getElementById('surname').textContent = userProfile.surname;
      const style = 'adventurer'; // Change style here if needed
    const seed = `${userProfile.name}-${userProfile.surname || ''}`;
    const avatarUrl = `https://api.dicebear.com/7.x/${style}/svg?seed=${encodeURIComponent(seed)}`;

    // Show avatar and store it
    const avatarImage = document.getElementById('avatarImage');
    avatarImage.src = avatarUrl;
    localStorage.setItem('avatarUrl', avatarUrl);
    } else {
      alert("Oops! No user profile found.");
      window.location.href = 'signup.html'; // Or your account creation page
    }
  }
  document.addEventListener("DOMContentLoaded", loadProfile);
  