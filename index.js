const content = document.getElementById("content");
let categories = [];
let products = {};

fetch("catalog.json")
  .then((response) => response.json())
  .then((data) => {
    categories = data.categories;
    products = data.products;
    renderHomePage();
  })
  .catch((error) => {
    console.error("Error loading data:", error);
    content.innerHTML =
      "<h1>Error loading catalog data. Please try again later.</h1>";
  });

document.getElementById("home").addEventListener("click", () => {
  renderHomePage();
});

document.getElementById("catalog").addEventListener("click", () => {
  renderCatalogPage();
});

function renderHomePage() {
  content.innerHTML =
    "<h1>Welcome to the Catalog</h1><p>Select a category to explore our products.</p>";
}

function renderCatalogPage() {
    let html = '<h2>Catalog</h2><div class="category-list">';
  
    categories.forEach((category) => {
      html += `<a href="#" data-category="${category.shortname}">${category.name}</a>`;
    });
  
    html += "</div>";
  
    content.innerHTML = html;
  
    document.querySelectorAll(".category-list a").forEach((link) => {
      link.addEventListener("click", (e) => {
        e.preventDefault();
        const shortname = e.target.getAttribute("data-category");
  
        if (shortname === "specials") {
          const randomCategory =
            categories[Math.floor(Math.random() * (categories.length - 1))];
          renderCategory(randomCategory);
        } else {
          const category = categories.find((c) => c.shortname === shortname);
          renderCategory(category);
        }
      });
    });
  }

function renderCategory(category) {
  const productList = products[category.shortname];

  if (!productList) {
    content.innerHTML = `<h2>No products found for category: ${category.name}</h2>`;
    return;
  }

  let html = `<h2>${category.name}</h2>`;
  productList.forEach((product) => {
    html += `
              <div class="product">
                  <img src="${product.image}" alt="${product.name}">
                  <h3>${product.name}</h3>
                  <p>${product.description}</p>
                  <p><strong>${product.price}</strong></p>
              </div>
          `;
  });

  content.innerHTML = html;
}


