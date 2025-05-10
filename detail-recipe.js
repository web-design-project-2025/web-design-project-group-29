let recipes = [];
let instructions = [];
const contentElement = document.getElementById("content");

// Fetch Json data
async function loadData() {
  const recipeResponse = await fetch("detailed-recipe.json");
  const recipesJSON = await recipeResponse.json();
  recipes = recipesJSON.recipes;

  const instructionsResponse = await fetch("instructions.json");
  const instructionsJSON = await instructionsResponse.json();
  instructions = instructionsJSON.instructions;

  renderContent();
}
function getRecipeById(id) {
  return recipes.find((recipe) => recipe.id === id);
}

// Main container for recipes
function createRecipeElement(recipe,) {
  const recipeElement = document.createElement("div");
  recipeElement.classList.add("recipe-grid");

  // Recipe hero section
  const heroLeft = document.createElement("div");
  heroLeft.classList.add("recipe-hero-left"); 

  // // recipe title container
  // const textBox = document.createElement("div");
  // textBox.classList.add("title-container");

  // Recipe tile
  const titleImage = document.createElement("img");
  titleImage.src = recipe.titleImg;
  titleImage.alt = recipe.titleAlt || recipe.name;
  titleImage.classList.add("recipe-title-image");
  heroLeft.appendChild(titleImage);
  // textBox.appendChild(titleImage);

  // Recipe description
  const description = document.createElement("p");
  description.innerText = recipe.description;
  description.classList.add("recipe-description");
  heroLeft.appendChild(description);

  // icon  container

  const iconContainer = document.createElement("div");
  iconContainer.classList.add("icon-container");

  const difficultyContainer = document.createElement("div");
  difficultyContainer.classList.add("difficulty-container");

  // Difficulty level icon
  const difficultyIcon = document.createElement("img");
  difficultyIcon.classList.add("difficulty-icon");
  difficultyIcon.src = "img/signal-solid.svg";
  difficultyIcon.alt = recipe.difficulty;
  difficultyContainer.appendChild(difficultyIcon);
 

  //Difficulty level text
  const difficultyText = document.createElement("span");
  difficultyText.classList.add("difficulty-text");
  difficultyText.innerText = recipe.difficulty;
  difficultyContainer.appendChild(difficultyText);
  iconContainer.appendChild(difficultyContainer);

  // time container
  const timeContainer = document.createElement("div");
  timeContainer.classList.add("time-container");

// time icon
  const timeIcon = document.createElement("img");
  timeIcon.classList.add("time-icon");
  timeIcon.src = "img/clock.svg";
  timeIcon.alt = recipe.time;
  timeContainer.appendChild(timeIcon);
 
  // time text
  const timeText = document.createElement("span");
  timeText.classList.add("time-text");
  timeText.innerText = recipe.time; 
  timeContainer.appendChild(timeText);
  iconContainer.appendChild(timeContainer);

  heroLeft.appendChild(iconContainer);


  // Recipe image container (upper right side)
  const heroRight = document.createElement("div");
  heroRight.classList.add("recipe-image-container");

  // Recipe image
  const recipeImage = document.createElement("img");
  recipeImage.src = recipe.image;
  recipeImage.alt = recipe.imageAlt;
  recipeImage.classList.add("recipe-image");
  heroRight.appendChild(recipeImage);

// INGREDIENTS SECTION
   // left recipe container
   const leftContainer = document.createElement("div");
   leftContainer.classList.add("left-container");
   
   // ingredient container
   const ingredientsSection = document.createElement("div");
   ingredientsSection.classList.add("ingredients-container");
 
   const ingredientsList = document.createElement("ul");
   ingredientsList.classList.add("ingredients-list");
 
   for (let section in recipe.ingredients) {
     const sectionTitle = document.createElement("h3");
     sectionTitle.classList.add("section-title");
     sectionTitle.innerText = section;
     ingredientsList.appendChild(sectionTitle);

 
     for (let item of recipe.ingredients[section]) {
      const listItem = document.createElement("li");
      listItem.classList.add("list-item");

      const checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.classList.add("checkbox-input");
      
      const label = document.createElement("label");
      label.innerText = `${item.name} - ${item.quantity}`;
      label.classList.add("ingredient-label");
      label.prepend(checkbox);

      listItem.appendChild(label);
      ingredientsList.appendChild(listItem);
     }
   }
   ingredientsSection.appendChild(ingredientsList);
   mainContainer.appendChild(ingredientsSection);
   recipeElement.appendChild(mainContainer);
   recipeElement.appendChild(ingredientsSection);
 
   //Instructions lower right section
   const lowerRight = document.createElement("div");
   lowerRight.classList.add("instructions-right");
 
   // how to text img
   const howToImage = document.createElement("img");
   howToImage.src = "img/howto.svg";
   howToImage.alt = "'How to' writtten in handwriting";
   howToImage.classList.add("how-to-image");
   lowerRight.appendChild(howToImage);

 
   const instructionsSection = document.createElement("div");
   instructionsSection.classList.add("instructions");

   //finding instruction by id
 




   
     // Add tips if available on top level
   
 
  //  const instructionList = document.createElement("ol");
  //  instructions.forEach((step) => {
  //    const listItem = document.createElement("li");
  //    console.log(instructions);
  //    listItem.innerText = step;
  //    instructionList.appendChild(listItem);
  //  });
  //  instructionsSection.appendChild(instructionList);
  //  instructionbox.appendChild(instructionList);
  //  instructionsSection.appendChild(instructionsSection);
  //  mainContainer.appendChild(instructionsSection);
  //  recipeElement.appendChild(instructionsSection);
 
  //  const tipSection = document.createElement("div");
  //  tipSection.classList.add("tip");
  //  tipSection.innerText = "Tip: " + recipe.tip;
  //  instructionsSection.appendChild(tipSection);
 
   return recipeElement;
   
}



function renderContent() {
  contentElement.innerHTML = "";

  const urlParams = new URLSearchParams(document.location.search);
  const id = parseInt(urlParams.get("id")) || 1;

  const recipe = getRecipeById(id);
  if (recipe) {
    const recipeElement = createRecipeElement(recipe);
    contentElement.appendChild(recipeElement);
  } else {
    contentElement.innerHTML = "<p>Recipe not found.</p>";
  }
}


loadData();