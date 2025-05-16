//https://chatgpt.com/share/6821c27b-1b54-8007-a3fc-2d350eb9d0f2
function generateAvatar() {
  const userProfile = JSON.parse(localStorage.getItem("userProfile"));
  const style = "adventurer"; // You can try others like 'bottts', 'pixel-art', etc.

  if (!userProfile || !userProfile.name) {
    alert("User profile is missing. Cannot generate avatar.");
    return;
  }

  const seed = `${userProfile.name}-${userProfile.surname || ""}`;
  const avatarUrl = `https://api.dicebear.com/7.x/${style}/svg?seed=${encodeURIComponent(seed)}`;

  // Update avatar and store URL
  document.getElementById("avatarImage").src = avatarUrl;
  localStorage.setItem("avatarUrl", avatarUrl);
}

// Load saved avatar or generate new one on page load
document.addEventListener("DOMContentLoaded", () => {
  const savedAvatar = localStorage.getItem("avatarUrl");
  const avatarImg = document.getElementById("avatarImage");

  if (savedAvatar) {
    avatarImg.src = savedAvatar;
  } else {
    generateAvatar(); // Generate one on first load
  }
});
