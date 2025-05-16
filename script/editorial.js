try {
  const showUp = document.querySelectorAll(
    ".text,.svg, .quote1, .quote2, .quote3, .quote4, .quote5",
  );
  if (!("IntersectionObserver" in window)) {
    console.warn("IntersectionObserver is not supported in this browser.");
  } else {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("reveal");
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.4,
      },
    );

    showUp.forEach((el) => observer.observe(el));
  }
} catch (err) {
  console.error("Failed to initialize intersection observer:", err);
}
