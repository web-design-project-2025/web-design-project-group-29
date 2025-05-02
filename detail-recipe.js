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
function createRecipeElement(recipe) {
  const recipeElement = document.createElement("div");
  recipeElement.classList.add("recipe-container");

  // Recipe hero section
  const hero = document.createElement("div");
  hero.classList.add("recipe-hero");

  // recipe title container
  const textBox = document.createElement("div");
  textBox.classList.add("title-container");

  // Recipe tile
  const titleImage = document.createElement("img");
  titleImage.src = recipe.titleImg;
  titleImage.alt = recipe.titleAlt || recipe.name;
  titleImage.classList.add("recipe-title-image");
  textBox.appendChild(titleImage);

  // Recipe description
  const description = document.createElement("p");
  description.innerText = recipe.description;
  description.classList.add("recipe-description");
  textBox.appendChild(description);

  // Difficulty level container

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
  iconContainer.appendChild(difficultyContainer);

  //Difficulty level text
  const difficultyText = document.createElement("span");
  difficultyText.classList.add("difficulty-text");
  difficultyText.innerText = recipe.difficulty;
  difficultyContainer.appendChild(difficultyText);
  textBox.appendChild(difficultyContainer);

  // time container
  const timeContainer = document.createElement("div");
  timeContainer.classList.add("time-container");

// time icon
  const timeIcon = document.createElement("img");
  timeIcon.classList.add("time-icon");
  timeIcon.src = "img/clock.svg";
  timeIcon.alt = recipe.time;
  timeContainer.appendChild(timeIcon);
  iconContainer.appendChild(timeContainer);

  // time text
  const timeText = document.createElement("span");
  timeText.classList.add("time-text");
  timeText.innerText = recipe.time; 
  iconContainer.appendChild(timeText);




  // Recipe image container
  const recipeImageContainer = document.createElement("div");
  recipeImageContainer.classList.add("recipe-image-container");

  // Recipe image
  const image = document.createElement("img");
  image.src = recipe.image;
  image.alt = recipe.imageAlt;
  image.classList.add("recipe-image");
  recipeImageContainer.appendChild(image);

  hero.appendChild(textBox);
  hero.appendChild(image);
  recipeElement.appendChild(hero);

   // Main recipe container
   const mainContainer = document.createElement("div");
   mainContainer.classList.add("main-container");
   // Ingredients
 
   // ingredient container
   const ingredientsSection = document.createElement("div");
   ingredientsSection.classList.add("ingredients-container");
 
   const ingredientsList = document.createElement("ul");
   ingredientsList.classList.add("ingredients-list");
 
   for (let section in recipe.ingredients) {
     const sectionTitle = document.createElement("h3");
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
      label.appendChild(checkbox);

      listItem.appendChild(checkbox);
      listItem.appendChild(label);
      ingredientsList.appendChild(listItem);
     }
 
     ingredientsSection.appendChild(ingredientsList);
     mainContainer.appendChild(ingredientsSection);
     recipeElement.appendChild(ingredientsSection);
   }
 
   //Instructions
   const instructionsSection = document.createElement("div");
   instructionsSection.classList.add("instructions");
 
   // how to text img
   const howToImage = document.createElement("img");
   howToImage.src = "img/howto.svg";
   howToImage.alt = "'How to' writtten in handwriting";
   howToImage.classList.add("how-to-image");
   instructionsSection.appendChild(howToImage);
 
   recipeElement.appendChild(instructionsSection);
 
   const instructionbox = document.createElement("div");
   instructionbox.classList.add("instruction-box");
 
   const instructionList = document.createElement("ol");
   instructions.forEach((step) => {
     const listItem = document.createElement("li");
     console.log(instructions);
     listItem.innerText = step;
     instructionList.appendChild(listItem);
   });
   instructionsSection.appendChild(instructionList);
   instructionbox.appendChild(instructionList);
   instructionsSection.appendChild(instructionbox);
   mainContainer.appendChild(instructionsSection);
   recipeElement.appendChild(instructionsSection);
 
   const tipSection = document.createElement("div");
   tipSection.classList.add("tip");
   tipSection.innerText = "Tip: " + recipe.tip;
   instructionsSection.appendChild(tipSection);
 
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