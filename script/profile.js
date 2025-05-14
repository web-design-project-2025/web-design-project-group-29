
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
        <div class="recipe-box">
            <img src="./img/${recipe.image}" id="recipe-box-img" alt="${recipe.name}">
          <div class="recipe-box-title">
          <h5>${recipe.name}</h5>
          <div id="star">
          ${'<i class="fa-solid fa-star"></i>'.repeat(recipe.rating)}
         </div>
            </div>
            <div class="recipe-box-content">
          <div class="clock-heart">
                <i  id = "clock"class="far fa-clock"> : <h6>${recipe.time}</h6></i>
              <i  id = "clock" class="fas fa-signal"> : <h6>${recipe.difficulty}</h6></i>
            </div>
      `;
      container.innerHTML += recipeHTML;
    });
  } else {
    container.innerHTML = "<p>No recent recipes yet.</p>";
  }
}

document.addEventListener("DOMContentLoaded", loadProfile);


  