document.addEventListener("DOMContentLoaded", () => {
  fetch("recipe-card.json")
    .then((res) => res.json())
    .then((recipesByCountry) => {
      const country =
        new URLSearchParams(window.location.search).get("country") || "nigeria";
      const container = document.getElementById("recipeContainer");

      if (!container) {
        console.error("No container with id 'recipeContainer' found.");
        return;
      }

      const recipes = recipesByCountry[country];

      if (recipes) {
        // Show all recipes initially
        displayRecipes(recipes, container);

        // Enable filter buttons
        setupRecipeFilters(recipes, container, displayRecipes);
      } else {
        container.innerHTML = "<p>No recipes found for this country.</p>";
      }
    })
    .catch((err) => console.error("Error loading recipes:", err));
});

// Reusable recipe rendering function
function displayRecipes(recipes, container) {
  container.innerHTML = "";

  recipes.forEach((recipe) => {
    const recipeSection = document.createElement("section");
    recipeSection.classList.add("recipes");

    const recipeBox = document.createElement("div");
    recipeBox.classList.add("recipe-box");
    recipeBox.setAttribute("data-recipe", JSON.stringify(recipe));

    recipeBox.innerHTML = `
         
              <a href="sambusa.html?id=${recipe.id}" class="recipe-box-link">
               
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

    // Save recipe to profile when clicked
    recipeBox.addEventListener("click", () => {
      const recipeData = JSON.parse(recipeBox.getAttribute("data-recipe"));
      saveRecipeToProfile(recipeData);
      console.log("Saved recipe:", recipeData);
    });

    recipeSection.appendChild(recipeBox);
    container.appendChild(recipeSection);
  });
}

// Save clicked recipe to profile in localStorage
function saveRecipeToProfile(recipe) {
  let userProfile = JSON.parse(localStorage.getItem("userProfile"));

  if (userProfile) {
    if (!userProfile.recentRecipes) {
      userProfile.recentRecipes = [];
    }

    // Remove duplicate if it already exists
    userProfile.recentRecipes = userProfile.recentRecipes.filter(
      (r) => r.name !== recipe.name,
    );

    // Add to beginning of list
    userProfile.recentRecipes.unshift(recipe);

    // Keep only latest 10
    if (userProfile.recentRecipes.length > 10) {
      userProfile.recentRecipes = userProfile.recentRecipes.slice(0, 10);
    }

    localStorage.setItem("userProfile", JSON.stringify(userProfile));
  } else {
    alert("No user profile found. Please sign up or log in.");
  }
}

function setupRecipeFilters(recipes, container, displayFn) {
  const filterButtons = document.querySelectorAll(
    ".filter-buttons-container .filter-btn",
  );

  filterButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      // Highlight selected filter
      filterButtons.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");

      const category = btn.getAttribute("data-category");

      const filtered =
        category === "all"
          ? recipes
          : recipes.filter((recipe) => recipe.category === category);

      displayFn(filtered, container);
    });
  });
}
