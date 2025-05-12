
function loadProfile() {
  const userProfile = JSON.parse(localStorage.getItem('userProfile'));

  if (!userProfile) {
    alert("Oops! No user profile found.");
    window.location.href = 'signup.html';
    return;
  }

  document.getElementById('name').textContent = userProfile.name;
  document.getElementById('surname').textContent = userProfile.surname;

  const container = document.getElementById('recentRecipesContainer');

  if (!container) return;

  container.innerHTML = '';

  if (userProfile.recentRecipes && userProfile.recentRecipes.length > 0) {
    userProfile.recentRecipes.forEach(recipe => {
      const recipeHTML = `
        <div class="profile-recipe-card">
          <img src="./img/${recipe.image}" alt="${recipe.name}">
          <h4>${recipe.name}</h4>
          <p>${recipe.time} • ${recipe.difficulty}</p>
        </div>
      `;
      container.innerHTML += recipeHTML;
    });
  } else {
    container.innerHTML = "<p>No recent recipes yet.</p>";
  }
}

document.addEventListener("DOMContentLoaded", loadProfile);


  