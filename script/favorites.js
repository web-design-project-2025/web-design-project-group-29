
let recipes = [];

async function loadFavoritesData() {
  const response = await fetch("detailed-recipe.json");
  const json = await response.json();
  recipes = json.recipes;

  const favoriteIds = JSON.parse(localStorage.getItem("favorites")) || [];

  const favoriteRecipes = recipes.filter((recipe) =>
    favoriteIds.includes(recipe.id)
  );

  renderFavorites(favoriteRecipes);
}
document.addEventListener("visibilitychange", () => {
  if (document.visibilityState === "visible") {
    loadFavoritesData();
  }
});

function renderFavorites(favoriteRecipes) {
  const container = document.getElementById("recipeContainer");

  if (favoriteRecipes.length === 0) {
    container.innerHTML =
      "<p style='padding: 2rem;'>You have no favorite recipes yet.</p>";
    return;
  }

  container.innerHTML = "";
// Recipe cards on favorite page 
  favoriteRecipes.forEach((recipe) => {
        const recipeHTML = `
          <a href="sambusa.html?id=${recipe.id}" class="recipe-box-link">
            <div class="recipe-box">
              <img src="${recipe.image}" id="recipe-box-img" alt="${recipe.name}">
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
              </div>
            </div>
          </a>
        `;
        container.innerHTML += recipeHTML;
      });

}

loadFavoritesData();

window.addEventListener("storage", (event) => {
  if (event.key === "favorites") {
    loadFavoritesData(); // Refresh the list
  }
});



  