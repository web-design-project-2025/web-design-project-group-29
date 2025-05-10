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
   leftContainer.appendChild(ingredientsSection);
 
   //Instructions lower right section
   const rightContainer = document.createElement("div");
   rightContainer.classList.add("instructions-right");
 
   // how to text img
   const howToImage = document.createElement("img");
   howToImage.src = "img/howto.svg";
   howToImage.alt = "'How to' writtten in handwriting";
   howToImage.classList.add("how-to-image");
   rightContainer.appendChild(howToImage);

  // INSSTRUCTIONS 
  const instructionsContainer = document.createElement("div");
  instructionsContainer.classList.add("instructions-container");

   const instructionsSection = document.createElement("div");
   instructionsSection.classList.add("instructions");

   //finding instruction by id
   const instructionData = instructions.find(inst => inst.id === recipe.id);

   if (Array.isArray(instructionData.steps) && instructionData.steps.length > 0) {
      const instructionList = document.createElement("ol");
      instructionList.classList.add("instructions-list");
      
      instructionData.steps.forEach(step => {
        const listItem = document.createElement("li");
        listItem.innerText = step;
        instructionList.appendChild(listItem);
      });
      instructionsContainer.appendChild(instructionList);

    } else if (Array.isArray(instructionData.sections) && instructionData.sections.length > 0) {
      instructionData.sections.forEach(section => {
        const sectionTitle = document.createElement("h4");
        sectionTitle.innerText = section.name;
        instructionsContainer.appendChild(sectionTitle);

        const sectionList = document.createElement("ol");
        sectionList.classList.add("instructions-list");
        
        if (Array.isArray(section.steps) && section.steps.length > 0) {
        section.steps.forEach(step => {
          const item = document.createElement("li");
          item.innerText = step;
          sectionList.appendChild(item);
        });
      }
        instructionsContainer.appendChild(sectionList);
      });
    
  } else  {
    const noInstructions = document.createElement("p");
    noInstructions.innerText = "No instructions available for this recipe.";
    instructionsContainer.appendChild(noInstructions);
  }

  rightContainer.appendChild(instructionsContainer);

  // Tips Section
  if (recipe.tips) {
    const tipsContainer = document.createElement("div");
    tipsContainer.classList.add("tips-container");

    const tipsTitle = document.createElement("h3");
    tipsTitle.innerText = "Tips";
    tipsContainer.appendChild(tipsTitle);

    const tipsList = document.createElement("ul");
    tipsList.classList.add("tips-list");

    recipe.tips.forEach(tip => {
      const tipItem = document.createElement("li");
      tipItem.innerText = tip;
      tipsList.appendChild(tipItem);
    });

    tipsContainer.appendChild(tipsList);
    rightContainer.appendChild(tipsContainer);
  }

  // Append all sections
  recipeElement.appendChild(heroLeft);
  recipeElement.appendChild(heroRight);
  recipeElement.appendChild(leftContainer);
  recipeElement.appendChild(rightContainer);
 
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