// help for the data loading from chatgpt https://chatgpt.com/share/680c970d-03cc-8005-ac67-04fadbeec9e0
document.addEventListener("DOMContentLoaded", () => {
  fetch("recipe-backdrop.json")
    .then((response) => response.json())
    .then((recipesBckg) => {
      const params = new URLSearchParams(window.location.search);
      const country = params.get("country");
      const container = document.getElementById("recipeBackground");
      const backgroundSection = document.getElementById("recipeBackground");

      if (country && recipesBckg[country]) {
        const BckgImg = recipesBckg[country][0].image;
        backgroundSection.style.backgroundImage = `url(img/${BckgImg})`;
      } else {
        container.innerHTML = "<p>No image found for this country<p>";
      }
    })
    .catch((error) => console.error("Error fetching image:", error));
});
