// help for the data loading from chatgpt https://chatgpt.com/share/680a3ced-1890-8005-bcfd-df294cf63496
document.addEventListener ("DOMContentLoaded", () => {
    fetch('recipe-card.json')
    .then (response => response.json())
    .then(recipesByCountry =>{
        const params = new URLSearchParams(window.location.search);
        const country = params.get("country") || "nigeria";
        const container = document.getElementById("recipeContainer");

        if (country && recipesByCountry [country]){
            const recipes = recipesByCountry [country];
            let currentRecipes = recipes;
              
            // Display all recipes initially
            displayRecipes(recipes, container);
            
            // Set up filter buttons
            const filterButtons = document.querySelectorAll('.filter-btn');
            filterButtons.forEach(btn => {
                btn.addEventListener('click', () => {
                    // Update active button styling
                    filterButtons.forEach(b => b.classList.remove('active'));
                    btn.classList.add('active');

                    // Get which category to filter by
                    const category = btn.getAttribute('data-category');

                    // Filter the recipes - show all if "all" is selected
                    const filtered = category === "all"
                        ? currentRecipes
                        : currentRecipes.filter(recipe => recipe.category === category);

                    // Display the filtered recipes
                    displayRecipes(filtered, container);
                });
            });
        } else {
            // Show message if no recipes found for this country
            container.innerHTML = "<p>No recipes found for this country<p>";
        }
    })
    .catch(error => console.error("Error fetching recipes:", error));
});

// This reusable function displays recipes in the container
// It prevents us from repeating the same HTML generation code
function displayRecipes(recipes, container) {
// Clear the container first
container.innerHTML = "";

            recipes.forEach(recipe => {
              const recipeHTML = `
              <section class="recipes">
              <a href="sambusa.html?id=${recipe.id}" class="recipe-box-link">
                <div class="recipe-box">
                
                  <img src="./img/${recipe.image}" alt="${recipe.name}">
                  <div class="recipe-box-title">
                    <h5>${recipe.name}</h5>
                    <div id="star">
                      ${'<i class="fa-solid fa-star"></i>'.repeat(recipe.rating)}  
                    </div>
                  </div>
                  <div class="recipe-box-content">
                    <div class="clock-heart">
                      <i id="clock" class="far fa-clock"> :  <h6>${recipe.time}</h6></i>
                        <i id="clock" class="fas fa-signal"> : <h6>${recipe.difficulty}</h6></i>
                    </div>
                   </div>
                  </div>
                </div>
                </a>
              </section>
            `;
                container.innerHTML += recipeHTML;
              });              
        } 