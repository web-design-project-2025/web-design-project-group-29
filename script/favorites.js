
let recipes = [];

async function loadFavoritesData() {
  try{
  const response = await fetch("detailed-recipe.json");
  const json = await response.json();
  recipes = json.recipes;

  const favoriteIds = JSON.parse(localStorage.getItem("favorites")) || [];

  const favoriteRecipes = recipes.filter((recipe) =>
    favoriteIds.includes(recipe.id)
  );

  renderFavorites(favoriteRecipes);
} catch(error){
  console.error("Error loading faverites recipes:", error);
  const container = document.getElementById("recipeContainer");
  if(container){
    container.innerHTML =
    "<p style ='padding: 2rem; color:red;> Failed to load recipes . Plese try again later</p>";
  }
}
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
                  <div class="clock-item">
                    <i class="far fa-clock"></i>
                    <h6>${recipe.time}</h6>
                  </div>
                  <div class="clock-item">
                    <i class="fas fa-signal"></i>
                    <h6>${recipe.difficulty}</h6>
                  </div>
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



  