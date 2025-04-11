
document.addEventListener("DOMContentLoaded", () => {
  const categoriesMenu = document.getElementById("categories-menu");
  const contentArea = document.getElementById("content-area");
  const searchInput = document.querySelector(".search-input");
  const resourceForm = document.getElementById("resource-form");
  const resourceCategorySelect = document.getElementById("resource-category");
  const modal = document.getElementById("edit-modal");
  const modalClose = document.querySelector(".modal .close");
  const editButton = document.getElementById("edit-button");

  // Sample resource database
  function fetchData() {
    fetch('./js/resources.json')
      .then((res) => res.json())
      .then((data) => {
        console.log(data)
        let output = '<h2">Countries</h2>'
        data.forEach(function (item) {
          output += `
          <ul>
            <li>Country: ${item.Country}</li>
            <li>CODE: ${item.ISO2}</li>
          </ul>
        `
        })
        document.getElementById('country').innerHTML = output
      })
      .catch((error) => {
        console.log(`Error Fetching data : ${error}`)
        document.getElementById('country').innerHTML = 'Error Loading Data'
      })
  }
  
  resourceDatabase = fetchData()
  // Populate categories and sidebar
  function loadCategories() {
      for (let categoryKey in resourceDatabase) {
          const category = resourceDatabase[categoryKey];
          const categoryItem = document.createElement("li");
          categoryItem.innerHTML = `<strong>${category.name}</strong>`;
          
          const subList = document.createElement("ul");

          for (let subKey in category.subcategories) {
              const sub = category.subcategories[subKey];
              const subItem = document.createElement("li");
              subItem.innerHTML = `<a href="#" data-category="${categoryKey}" data-subcategory="${subKey}">${sub.name}</a>`;
              subItem.querySelector("a").addEventListener("click", (e) => {
                  e.preventDefault();
                  loadResources(categoryKey, subKey);
              });
              subList.appendChild(subItem);
          }

          categoryItem.appendChild(subList);
          categoriesMenu.appendChild(categoryItem);

          // Add to form select
          const option = document.createElement("option");
          option.value = categoryKey;
          option.textContent = category.name;
          resourceCategorySelect.appendChild(option);
      }
  }

  // Load resources for a category + subcategory
  function loadResources(categoryKey, subKey) {
      contentArea.innerHTML = ""; // Clear existing content
      const category = resourceDatabase[categoryKey];
      const sub = category.subcategories[subKey];
      const title = document.createElement("h2");
      title.textContent = `${category.name} → ${sub.name}`;
      contentArea.appendChild(title);

      const list = document.createElement("div");
      list.classList.add("resource-list");

      sub.resources.forEach(res => {
          const card = document.createElement("div");
          card.classList.add("resource-card");
          card.innerHTML = `
              <h3><a href="${res.url}" target="_blank">${res.name}</a></h3>
              <p>${res.description}</p>
          `;
          list.appendChild(card);
      });

      contentArea.appendChild(list);
  }

  // Search functionality
  searchInput.addEventListener("input", () => {
      const query = searchInput.value.toLowerCase();
      contentArea.innerHTML = "";
      const results = [];

      for (let categoryKey in resourceDatabase) {
          const subcats = resourceDatabase[categoryKey].subcategories;
          for (let subKey in subcats) {
              const resources = subcats[subKey].resources;
              results.push(...resources.filter(r =>
                  r.name.toLowerCase().includes(query) ||
                  r.description.toLowerCase().includes(query)
              ));
          }
      }

      const resultTitle = document.createElement("h2");
      resultTitle.textContent = `Search Results for "${query}"`;
      contentArea.appendChild(resultTitle);

      const list = document.createElement("div");
      list.classList.add("resource-list");

      if (results.length === 0) {
          contentArea.innerHTML += "<p>No resources found.</p>";
      } else {
          results.forEach(res => {
              const card = document.createElement("div");
              card.classList.add("resource-card");
              card.innerHTML = `
                  <h3><a href="${res.url}" target="_blank">${res.name}</a></h3>
                  <p>${res.description}</p>
              `;
              list.appendChild(card);
          });
          contentArea.appendChild(list);
      }
  });

  // Modal logic
  editButton.addEventListener("click", () => {
      modal.style.display = "block";
  });

  modalClose.addEventListener("click", () => {
      modal.style.display = "none";
  });

  window.addEventListener("click", (event) => {
      if (event.target == modal) {
          modal.style.display = "none";
      }
  });

  // Resource form submission
  resourceForm.addEventListener("submit", (e) => {
      e.preventDefault();
      alert("Submit functionality not implemented. Modify database.js manually or implement backend storage.");
      modal.style.display = "none";
  });

  // Init
  loadCategories();
});
