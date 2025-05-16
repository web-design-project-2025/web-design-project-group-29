document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("register-form");
  if (!form) {
    //   console.error("Form not found");
    return;
  }

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const user = {
      name: form.name.value,
      surname: form.surname.value,
      email: form.email.value,
      password: form.password.value,
    };

    const users = JSON.parse(localStorage.getItem("users")) || [];

    if (users.find((u) => u.email === user.email)) {
      alert("User already exists");
      return;
    }

    users.push(user);
    localStorage.setItem("users", JSON.stringify(users));
    localStorage.setItem("userProfile", JSON.stringify(user)); // Set active profile
    window.location.href = "profile.html";
  });
});
