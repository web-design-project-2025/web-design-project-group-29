document.addEventListener("DOMContentLoaded", () => {
  fetch('recipe-card.json')
    .then(response => response.json())
    .then(recipesByCountry => {
      const params = new URLSearchParams(window.location.search);
      const country = params.get("country") || "nigeria";
      const container = document.getElementById("recipeContainer");

      if (!container) {
        console.error("No container with id 'recipeContainer' found.");
        return;
      }

      if (country && recipesByCountry[country]) {
        const recipes = recipesByCountry[country];

        recipes.forEach(recipe => {
          const recipeBox = document.createElement('div');
          recipeBox.classList.add('recipe-box');
          recipeBox.setAttribute('data-recipe', JSON.stringify(recipe));

          recipeBox.innerHTML = `
            <img src="./img/${recipe.image}" id="recipe-box-img" alt="${recipe.name}">
            <div class="recipe-box-title">
              <h5>${recipe.name}</h5>
              <div id="star">
                ${'<i class="fa-solid fa-star"></i>'.repeat(recipe.rating)}
              </div>
            </div>
            <div class="recipe-box-content">
              <div class="clock-heart">
                <i class="far fa-clock"> : ${recipe.time}</i>
                <i class="far fa-heart"></i>
              </div>
              <i class="fas fa-signal"> : ${recipe.difficulty}</i>
            </div>
          `;

          // Add click listener to save this recipe to profile
          recipeBox.addEventListener('click', () => {
            const recipeData = JSON.parse(recipeBox.getAttribute('data-recipe'));
            saveRecipeToProfile(recipeData);
            console.log("Saved recipe to profile:", recipeData);
          });

          const recipeSection = document.createElement('section');
          recipeSection.classList.add('recipes');
          recipeSection.appendChild(recipeBox);
          container.appendChild(recipeSection);
        });
      } else {
        container.innerHTML = "<p>No recipes found for this country.</p>";
      }
    })
    .catch(error => console.error("Error fetching recipes:", error));
});

function saveRecipeToProfile(recipe) {
  let userProfile = JSON.parse(localStorage.getItem('userProfile'));

  if (userProfile) {
    if (!userProfile.recentRecipes) {
      userProfile.recentRecipes = [];
    }

    // Avoid duplicates
    userProfile.recentRecipes = userProfile.recentRecipes.filter(
      r => r.name !== recipe.name
    );

    // Add to front
    userProfile.recentRecipes.unshift(recipe);

    // Limit to 10
    if (userProfile.recentRecipes.length > 10) {
      userProfile.recentRecipes = userProfile.recentRecipes.slice(0, 10);
    }

    localStorage.setItem('userProfile', JSON.stringify(userProfile));
  } else {
    alert("No user profile found. Please sign up or log in.");
  }
}
