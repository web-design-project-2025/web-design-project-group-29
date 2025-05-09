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

            recipes.forEach(recipe => {
              const recipeHTML = `
              <section class="recipes">
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
              </section>
            `;
                container.innerHTML += recipeHTML;
              });              
        } else {
            container.innerHTML = "<p>No recipes found for this country<p>";
        }
    })
    .catch (error => console.error("Error fetching recipes:", error))
})