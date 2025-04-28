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
    }