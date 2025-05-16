// creating the reusable function that will load our navbar
function loadNavigation() {
  try {
    // html file that will hold our navbar
    const navContainer = document.createElement("header");
    navContainer.id = "navbar-container";

    // getting the html file for the navbar
    fetch("navbar.html")
      .then((response) => response.text()) // so the HTML is used as text
      .then((html) => {
        // putting the navbar HTML inside the empty countainer
        navContainer.innerHTML = html;

        // Insert it at the top of the body
        document.body.prepend(navContainer);

        // calling the funtion for the dropdown
        initDropdowns();
        initMobileMenu();
      })
      //debugger
      .catch((error) => console.error("Error loading navbar:", error));
  } catch (err) {
    console.error("Failed to load navigation:", err);
  }
}

function initDropdowns() {
  try {
    // Continent dropdown
    const dropdowns = document.querySelectorAll(".dropdown"); // calling every item in the class .dropdown
    dropdowns.forEach((dropdown) => {
      // managing the hovering
      dropdown.addEventListener("mouseenter", () => {
        dropdown.querySelector(".continent-menu").style.display = "flex";
      });
      dropdown.addEventListener("mouseleave", () => {
        dropdown.querySelector(".continent-menu").style.display = "none";
      });
    });
  } catch (err) {
    console.error("Dropdown initialization failed:", err);
  }
}
// doing the same for Country menus
const continents = document.querySelectorAll(".continent");
continents.forEach((continent) => {
  continent.addEventListener("mouseenter", () => {
    continent.querySelector(".country-menu").style.display = "block";
  });
  continent.addEventListener("mouseleave", () => {
    continent.querySelector(".country-menu").style.display = "none";
  });
});

function initMobileMenu() {
  try {
    const hamburger = document.getElementById("hamburger");
    const mobileMenu = document.getElementById("mobile-menu");
    const closeBtn = document.getElementById("close-menu");
    const backBtn = document.getElementById("mobile-back-button");

    // Open mobile menu
    hamburger.addEventListener("click", () => {
      mobileMenu.classList.add("active");
      hamburger.classList.add("hidden");
    });

    closeBtn.addEventListener("click", () => {
      mobileMenu.classList.remove("active");
      hamburger.classList.remove("hidden");
    });
    if (backBtn) {
      //back logic  https://www.w3schools.com/jsref/met_his_back.asp
      backBtn.addEventListener("click", () => {
        window.history.back();
      });
    }
    // SUBMENU OPEN
    const mobileDropdowns = mobileMenu.querySelectorAll(".mobile-dropdown > a");
    mobileDropdowns.forEach((link) => {
      link.addEventListener("click", (e) => {
        e.preventDefault();
        const parentLi = link.parentElement;
        parentLi.classList.toggle("active");
      });
    });
  } catch (err) {
    console.error("Mobile meu initializtion failed:", err);
  }
}
function loadFooter() {
  try {
    const footerContainer = document.createElement("div");
    footerContainer.id = "footer-container";

    fetch("footer.html")
      .then((response) => response.text())
      .then((html) => {
        footerContainer.innerHTML = html;
        document.body.appendChild(footerContainer); // adds at the end
      })
      .catch((error) => console.error("Error loading footer:", error));
  } catch (err) {
    console.error("Failed to load footer", err);
  }
}
function loadFooter() {
  const footerContainer = document.createElement("div");
  footerContainer.id = "footer-container";

  fetch("footer.html")
    .then((response) => response.text())
    .then((html) => {
      footerContainer.innerHTML = html;
      document.body.appendChild(footerContainer); // adds at the end
    })
    .catch((error) => console.error("Error loading footer:", error));
}

// making sur the JS in not run before the DOM is fully loaded so navbar appears fully
document.addEventListener("DOMContentLoaded", () => {
  loadNavigation();
  loadFooter();
});
