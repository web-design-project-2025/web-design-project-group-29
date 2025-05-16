//https://chatgpt.com/share/6820c3e1-f89c-8007-893d-04d4c3774281

const stars = document.querySelectorAll("#star-rating span");
const ratingInput = document.getElementById("rating");
const reviewForm = document.getElementById("review-form");
const reviewsContainer = document.getElementById("reviews-container");

// Star interactivity
stars.forEach((star) => {
  star.addEventListener("mouseenter", () => {
    const val = parseInt(star.dataset.value);
    highlightStars(val);
  });

  star.addEventListener("mouseleave", () => {
    highlightStars(parseInt(ratingInput.value));
  });

  star.addEventListener("click", () => {
    const selected = parseInt(star.dataset.value);
    ratingInput.value = selected;
    highlightStars(selected);
  });
});

function highlightStars(rating) {
  stars.forEach((star) => {
    const val = parseInt(star.dataset.value);
    star.classList.toggle("selected", val <= rating);
    star.classList.toggle("hover", false); // clear hover effect
  });
}

//  Add form submission handler to display reviews
reviewForm.addEventListener("submit", function (e) {
  e.preventDefault();

  const name = document.getElementById("reviewer").value.trim();
  const comment = document.getElementById("comment").value.trim();
  const rating = parseInt(ratingInput.value);

  if (!name || !comment || !rating) {
    alert("Please complete all fields and select a rating.");
    return;
  }

  // Create review display
  const reviewDiv = document.createElement("div");
  reviewDiv.classList.add("review");

  // Create stars display
  let starsHTML = "";
  for (let i = 1; i <= 5; i++) {
    starsHTML += `<span class="${i <= rating ? "selected" : ""}">★</span>`;
  }

  reviewDiv.innerHTML = `
    <h3>${name}</h3>
    <div class="stars">${starsHTML}</div>
    <p>${comment}</p>
  `;

  reviewsContainer.appendChild(reviewDiv);

  // Clear form
  reviewForm.reset();
  ratingInput.value = 0;
  highlightStars(0);
});
