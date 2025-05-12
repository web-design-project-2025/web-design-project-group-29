 function loadProfile() {
    const userProfile = JSON.parse(localStorage.getItem('userProfile'));
  
    if (userProfile) {
      document.getElementById('name').textContent = userProfile.name;
      document.getElementById('surname').textContent = userProfile.surname;

      if(userProfile.recentRecipes && userProfile.recentRecipes.lenght > 0){
        const recentContainer = document.getElementById('recent-recipes');
        userProfile.recentRecipes.forEach(recipe => {
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
                    <i id="clock" class="far fa-clock"> : ${recipe.time}</i>
                    <i id="heart" class="far fa-heart"></i>
                  </div>
                  <i id="clock" class="fas fa-signal"> : ${recipe.difficulty}</i>
                </div>
              </div>
            </section>
          `;
          recentContainer.innerHTML += recipeHTML;
        });  
      }else{
        const recentContainer = document.getElementById('recent-recipes');
        recentContainer.innerHTML = "<p>No recipes saved.<p>"
      }
    } else {
      alert("Oops! No user profile found.");
      window.location.href = 'signup.html'; // Or your account creation page
    }
  }
  document.addEventListener("DOMContentLoaded", loadProfile);
  