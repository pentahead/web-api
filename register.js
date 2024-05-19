document.addEventListener("DOMContentLoaded", () => {
  const apiUrl = "https://localhost:7131";
  let token = null;

  document
    .getElementById("register-form")
    .addEventListener("submit", async (e) => {
      e.preventDefault();
      const username = document.getElementById("register-username").value;
      const password = document.getElementById("register-password").value;

      const response = await fetch(`${apiUrl}/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        alert("Registration successful!");
        document.getElementById("register-form").reset();
        z;
      } else {
        alert("Failed to register.");
      }
    });
});
