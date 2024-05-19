document.addEventListener("DOMContentLoaded", () => {
  const apiUrl = "https://localhost:7131";

  document
    .getElementById("login-form")
    .addEventListener("submit", async (e) => {
      e.preventDefault();
      const username = document.getElementById("login-username").value;
      const password = document.getElementById("login-password").value;

      const response = await fetch(`${apiUrl}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem("token", data.token);
        alert("Login successful!");
        document.getElementById("login-form").reset();
        window.location.href = "homepage.html";
      } else {
        alert("Failed to login.");
      }
    });
});
