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


  // Star rating 

  // STAR RATING https://chatgpt.com/share/68221f75-7734-8013-abc7-c79bc6177543
const starContainer = document.createElement("div");
starContainer.classList.add("star-container");

const ratingValue = recipe.rating || 0;
const fullStar = Math.floor(ratingValue);
const halfStar = ratingValue % 1 >= 0.25 && ratingValue % 1 < 0.75;
const totalStars = 5;

for (let i = 1; i <= totalStars; i++) {
  const starIcon = document.createElement("i");

  if (i <= fullStar) {
    starIcon.className = "fa-solid fa-star"; 
  } else if (i === fullStar + 1 && halfStar) {
    starIcon.className = "fa-solid fa-star-half-stroke"; 
  } else {
    starIcon.className = "fa-regular fa-star"; 
  }

  starContainer.appendChild(starIcon);
}

heroLeft.appendChild(starContainer);
//  category section

if (Array.isArray(recipe.category)&& recipe.category.length > 0){
  const categoryContainer = document.createElement("div");
  categoryContainer.classList.add("category-container");

  recipe.category.forEach((category) => {
    const categoryItem = document.createElement("span");
    categoryItem.classList.add("category-item");
    categoryItem.innerText = category;
    categoryContainer.appendChild(categoryItem);
  });

  heroLeft.appendChild(categoryContainer);
}

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
  const difficultyIcon = document.createElement("i");
  difficultyIcon.classList.add("fas", "fa-signal", "difficulty-icon");
 
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
  const timeIcon = document.createElement("i");
  timeIcon.classList.add("far", "fa-clock", "time-icon");
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

//FAVOURITES 


 // Heart icon 
 const heartIcon = document.createElement("i");
 heartIcon.classList.add("fa-heart", "fa-regular", "favorite-icon");
 
 let favorites = JSON.parse(localStorage.getItem("favorites")) || [];
 
 if (favorites.includes(recipe.id)) {
 heartIcon.classList.replace("fa-regular", "fa-solid");
 }
 //adding to favorites by clicking the heart
 heartIcon.addEventListener("click", () => {
 favorites = JSON.parse(localStorage.getItem("favorites")) || [];
 
 if (favorites.includes(recipe.id)) {
 favorites = favorites.filter(id => id !== recipe.id);
 heartIcon.classList.replace("fa-solid", "fa-regular");
 } else {

 favorites.push(recipe.id);
 heartIcon.classList.replace("fa-regular", "fa-solid");
 }
 localStorage.setItem("favorites", JSON.stringify(favorites));
 });
 
 heroRight.appendChild(heartIcon);




// INGREDIENTS SECTION
   // left recipe container
   const leftContainer = document.createElement("div");
   leftContainer.classList.add("left-container");

   const ingredientsTitle = document.createElement("h2");
   ingredientsTitle.classList.add("ingredients-title");
   ingredientsTitle.innerText = "INGREDIENTS";
   leftContainer.appendChild(ingredientsTitle);
   
   //Portion control
   let portionCount = 4; // default
  
   const portionControl = document.createElement("div");
   portionControl.classList.add("portion-control");
 
   const minusBtn = document.createElement("button");
   minusBtn.innerText = "-";
   minusBtn.classList.add("portion-btn");
 
   const portionLabel = document.createElement("span");
   portionLabel.innerText = `${portionCount} Portions`;
   portionLabel.classList.add("portion-label");
 
   const plusBtn = document.createElement("button");
   plusBtn.innerText = "+";
   plusBtn.classList.add("portion-btn");
 
   portionControl.appendChild(minusBtn);
   portionControl.appendChild(portionLabel);
   portionControl.appendChild(plusBtn);
   leftContainer.appendChild(portionControl);
 
   // ingredient container

   const ingredientsSection = document.createElement("div");
   ingredientsSection.classList.add("ingredients-container");
 
  //  const ingredientsList = document.createElement("ul");
  //  ingredientsList.classList.add("ingredients-list");

  //  ingredientsSection.appendChild(ingredientsList);
   leftContainer.appendChild(ingredientsSection);
   //
   function safeEvaluateQuantity(expression) {
    const cleaned = expression
    .replace("½", "0.5")
    .replace("¼", "0.25")
    .replace("¾", "0.75");
    try {
      return Function(`"use strict"; return (${cleaned})`)();
    } catch {
      return NotaNumber;
  }
  }
  function updateIngredients(){
    ingredientsSection.innerHTML = "";

   for (let section in recipe.ingredients) {
    const ingBox = document.createElement("div");
    ingBox.classList.add("ingredient-box");

     const sectionTitle = document.createElement("h3");
     sectionTitle.classList.add("section-title");
     sectionTitle.innerText = section;
     ingBox.appendChild(sectionTitle);

     const ingredientsList = document.createElement("ul");
     ingredientsList.classList.add("ingredients-list");
     
     for (let item of recipe.ingredients[section]) {
      const listItem = document.createElement("li");
      listItem.classList.add("list-item");

      const checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.classList.add("checkbox-input");

      const label = document.createElement("label");
      label.classList.add("ingredient-label")
      
      const nameIng = document.createElement("span");
      nameIng.classList.add("ingredient-name");
      nameIng.innerText = item.name;

      const quantityLabel = document.createElement("span");
      quantityLabel.classList.add("ingredient-quantity");


       //help from: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_expressions
       let quantity = item.quantity;
       const match = quantity.match(/^([\d.\/½¼¾]+)(.*)$/);

       if (match) {
         const baseValue = safeEvaluateQuantity(match[1]);
         if (!isNaN(baseValue)) {
           const scaled = baseValue * (portionCount / 4);
           quantity = scaled.toFixed(2).replace(/\.00$/, "") + match[2];
         }
       }
       quantityLabel.innerText = quantity;


      // label.innerText = `${item.name} ${quantity}`;
      label.prepend(checkbox,nameIng);
      listItem.appendChild(label);
      listItem.appendChild(quantityLabel);
      ingredientsList.appendChild(listItem);
     }
     ingBox.appendChild(ingredientsList); 
     ingredientsSection.appendChild(ingBox);
   }
 }
 updateIngredients();

//buttons logic
minusBtn.onclick = () => {
  if (portionCount > 1) {
    portionCount--;
    portionLabel.innerText = `${portionCount} Portions`;
    updateIngredients();
  }
};

plusBtn.onclick = () => {
  portionCount++;
  portionLabel.innerText = `${portionCount} Portions`;
  updateIngredients();
};


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

   // ingredient Illustrations 

   if(instructionData.illustrations) {
    const illustrationContainer = document.createElement("div");
    illustrationContainer.classList.add("illustration-container");
   
    const illustration = document.createElement("img");
    illustration.src = instructionData.illustrations;
    illustration.classList.add("recipe-illustration");
    illustrationContainer.appendChild(illustration);
    rightContainer.appendChild(illustrationContainer);

   }
   

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
        sectionTitle.classList.add("section-name");
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

  if (recipe.tips && recipe.tips.length > 0) {
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