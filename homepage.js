document.addEventListener("DOMContentLoaded", () => {
  const apiUrl = "https://localhost:7131";
  const token = localStorage.getItem("token");

  if (!token) {
    alert("You must be logged in to access this page.");
    window.location.href = "/index.html";
    return;
  }

  // Create product form submission
  document
    .getElementById("create-form")
    .addEventListener("submit", async (e) => {
      e.preventDefault();
      const name = document.getElementById("name").value;
      const price = document.getElementById("price").value;
      const stock = document.getElementById("stock").value;

      const data = {
        name,
        price: parseInt(price),
        stock: parseInt(stock),
      };

      const response = await fetch(`${apiUrl}/products`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        alert("Product created successfully!");
        document.getElementById("create-form").reset();
      } else {
        alert("Failed to create product.");
      }
    });

  // Read many products form submission
  document
    .getElementById("read-many-form")
    .addEventListener("submit", async (e) => {
      e.preventDefault();
      const name = document.getElementById("name-search").value;
      const priceMin = document.getElementById("price-min").value;
      const priceMax = document.getElementById("price-max").value;
      const stockMin = document.getElementById("stock-min").value;
      const stockMax = document.getElementById("stock-max").value;

      const queryParams = new URLSearchParams({
        name,
        priceMin,
        priceMax,
        stockMin,
        stockMax,
      });

      const response = await fetch(`${apiUrl}/products?${queryParams}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const products = await response.json();

      const productsList = document.getElementById("products-list");
      productsList.innerHTML = "";

      products.forEach((product) => {
        const productDiv = document.createElement("div");
        productDiv.textContent = `ID: ${product.id}, Name: ${product.name}, Price: ${product.price}, Stock: ${product.stock}`;
        productsList.appendChild(productDiv);
      });
    });

  // Read one product form submission
  document
    .getElementById("read-one-form")
    .addEventListener("submit", async (e) => {
      e.preventDefault();
      const productId = document.getElementById("product-id").value;

      const response = await fetch(`${apiUrl}/products/${productId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (response.ok) {
        const product = await response.json();
        const productDetails = document.getElementById("product-details");
        productDetails.innerHTML = `ID: ${product.id}, Name: ${product.name}, Price: ${product.price}, Stock: ${product.stock}`;
      } else {
        alert("Product not found.");
      }
    });

  // Update product form submission
  document
    .getElementById("update-form")
    .addEventListener("submit", async (e) => {
      e.preventDefault();
      const productId = document.getElementById("update-id").value;
      const newName = document.getElementById("update-name").value;
      const newPrice = document.getElementById("update-price").value;
      const newStock = document.getElementById("update-stock").value;

      const response = await fetch(`${apiUrl}/products/${productId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name: newName,
          price: newPrice,
          stock: newStock,
        }),
      });

      if (response.ok) {
        alert("Product updated successfully!");
        document.getElementById("update-form").reset();
      } else {
        alert("Failed to update product.");
      }
    });

  // Delete product form submission
  document
    .getElementById("delete-form")
    .addEventListener("submit", async (e) => {
      e.preventDefault();
      const productId = document.getElementById("delete-id").value;

      const response = await fetch(`${apiUrl}/products/${productId}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.ok) {
        alert("Product deleted successfully!");
        document.getElementById("delete-form").reset();
      } else {
        alert("Failed to delete product.");
      }
    });
});
