# web-design-project-group-29

# 🌍 Nomad – A journey through authentic cuisine from around the world.

**Nomad** is a UX/UI-focused recipe website that showcases authentic cultural cuisines from around the world. Discover dishes from 5 continents, explore culinary diversity, and enjoy a user-friendly experience designed for food lovers and cultural explorers alike.

---

## Features

- **Multi-Level Drop-Down Menu**  
  Browse cuisines by continent, region, or country with an intuitive, tiered navigation system.

- **Recipe Filtering**  
  Refine your search using filters by categories.

- **Live Search**  
  Type a letter to instantly see all recipes that start with that letter — quick and responsive.

- **Profile Generation**  
  Create an account and get a personalized, illustrated profile avatar generated via a public API.

- **Dynamic Recipe Loading**  
  Recipes are loaded dynamically using JSON files and rendered via JavaScript.

- **Add to favorites**  
  Save favorite recipes

- **About Page**
- Editorial content with food stories and features

- **Review section integrated into detailed recipes**
  Allowing users to read and write feedback on dishes

- **Recent Logic**  
  The most recently visited recipes are loaded dynamically using JSON files and rendered via JavaScript, they then show up on the profile page.

  **Detailed recipe page (when you press the recipe cards)**  
  View detailed recipe pages with step-by-step instructions

- **Responsivness**  
  Responsive design for mobile, tablet, and desktop

  ## Tech Stack

- **HTML**
- **CSS**
- **JavaScript(JS)**
- Public Avatar API

1. **Navigation:**

   - Open the website in a browser.
   - Hover over the multi-level drop-down menu and navigate to a region then a country.
   - Click a category (a country: Japan, Algeria, Nigeria, Somalia, Sweden, Peru, Cuba) and ensure recipes update accordingly.
   - You click on the specific recipe card that you like and it takes you to the detailed recipe page.

2. **Filtering:**

   - Use the filter options by category. All, dinner, lunch, snack, desserts, drinks.
   - Verify that only the relevant recipes are displayed.

3. **Live Search:**

   - Type a letter in the search bar.
   - Confirm that recipes beginning with that letter appear in real time.

4. **Profile Creation:**

   - Click the "Sign Up" button.
   - Enter your name, surname, email, password and confirm password.
   - Submit.
   - Check that a profile image is generated via the avatar API.

5. **Dynamic Data Loading:**
   - Refresh the page.
   - Ensure all recipes still load correctly from the JSON files.'

nomad/
├── assets/
│ └── images/ # All your image files
│
├── css/ # All CSS stylesheets
│ ├── detail-recipe.css
│ ├── footer.css
│ ├── index.css
│ ├── live-search.css
│ ├── navbar.css
│ ├── overview-recipe-page.css
│ ├── profile.css
│ ├── recipe-background.css
│ ├── review.css # Styles for review page
│ ├── editorial.css # Styles for editorial page
│ ├── favorites.css # Styles for favorites page
│ └── signup.css
│
├── data/ # JSON data files
│ ├── detailed-recipe.json
│ ├── instructions.json
│ ├── recipe-backdrop.json
│ └── recipe-card.json
│
├── js/ # JavaScript files
│ ├── detailed-recipe.js
│ ├── live-search.js
│ ├── load-navbar.js
│ ├── profile-api.js
│ ├── profile.js
│ ├── recipe-background.js
│ ├── recipe-card.js
│ ├── review.js # Logic for review page
│ ├── editorial.js # Logic for editorial page
│ ├── favorites.js # Logic for favorites page
│ └── signup.js
│
├── components/ # Reusable HTML parts
│ ├── footer.html
│ └── navbar.html
│
├── pages/ # Main HTML pages
│ ├── index.html
│ ├── overview-recipe-page.html
│ ├── profile.html
│ ├── sambusa.html
│ ├── signup.html
│ ├── review.html # New review page
│ ├── editorial.html # New editorial content page
│ └── favorites.html # New saved recipes page
│
└── README.md # Project documentation
