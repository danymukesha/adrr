document.addEventListener("DOMContentLoaded", async () => {
  const categoriesMenu = document.getElementById("categories-menu");
  const contentArea = document.getElementById("content-area");
  const searchInput = document.querySelector(".search-input");
  const resourceForm = document.getElementById("resource-form");
  const resourceCategorySelect = document.getElementById("resource-category");
  const otherSubcategoryInput = document.getElementById("other-subcategory");
  const resourceSubcategorySelect = document.getElementById("resource-subcategory");
  const modal = document.getElementById("edit-modal");
  const modalClose = document.querySelector(".modal .close");
  const editButton = document.getElementById("edit-button");
  const newsContent = document.getElementById("news-content");

  let resourceDatabase = {};
  let newsDatabase = {};

  resourceCategorySelect.addEventListener("change", function () {
    updateSubcategoryOptions(this.value);
  });

  resourceSubcategorySelect.addEventListener("change", function () {
    toggleOtherSubcategoryInput(this.value);
  });

  try {
    const res = await fetch("./src/data/resources.json");
    if (!res.ok) throw new Error("Failed to load resources.");
    resourceDatabase = await res.json();
    loadCategories();
    initializeCategoryDropdown();
  } catch (error) {
    console.error("Error loading resources:", error);
    categoriesMenu.innerHTML = '<li class="menu-item error">Failed to load categories.</li>';
    contentArea.innerHTML = '<div class="error-message"><p>Error loading resources.</p></div>';
  }

  try {
    const res = await fetch("./src/data/news.json");
    if (!res.ok) throw new Error("Failed to load news.");
    newsDatabase = await res.json();
    loadNews();
  } catch (error) {
    console.error("Error loading news:", error);
    newsContent.innerHTML = '<p>Error loading news. Please try again later.</p>';
  }

  function initializeCategoryDropdown() {
    resourceCategorySelect.innerHTML = '<option value="">Select a category</option>';
    Object.entries(resourceDatabase).forEach(([key, category]) => {
      resourceCategorySelect.appendChild(new Option(category.name, key));
    });
  }

  function updateSubcategoryOptions(selectedCategory) {
    resourceSubcategorySelect.innerHTML = '<option value="">Select subcategory</option>';
    otherSubcategoryInput.parentElement.style.display = "none";
    otherSubcategoryInput.required = false;

    if (selectedCategory && resourceDatabase[selectedCategory]?.subcategories) {
      const subcategories = resourceDatabase[selectedCategory].subcategories;
      Object.entries(subcategories).forEach(([subKey, sub]) => {
        resourceSubcategorySelect.appendChild(new Option(sub.name, subKey));
      });
      resourceSubcategorySelect.appendChild(new Option("Other (specify below)", "other"));
    }
  }

  function toggleOtherSubcategoryInput(selectedValue) {
  const otherContainer = otherSubcategoryInput.parentElement;
  if (selectedValue === "other") {
    otherContainer.style.display = "block";
    otherSubcategoryInput.required = true;
  } else {
    otherContainer.style.display = "none";
    otherSubcategoryInput.required = false;
  }
}


  function loadCategories() {
    categoriesMenu.innerHTML = "";
    Object.entries(resourceDatabase).forEach(([categoryKey, category]) => {
      const categoryItem = document.createElement("li");
      categoryItem.className = "menu-item category-item";
      categoryItem.innerHTML = `<a href="#" class="category-link" data-category="${categoryKey}">${category.name}</a>`;

      if (category.subcategories) {
        const subList = document.createElement("ul");
        subList.className = "subcategory-list";

        Object.entries(category.subcategories).forEach(([subKey, sub]) => {
          const subItem = document.createElement("li");
          subItem.className = "subcategory-item";
          subItem.innerHTML = `<a href="#" data-category="${categoryKey}" data-subcategory="${subKey}">${sub.name}</a>`;
          subItem.querySelector("a").addEventListener("click", (e) => {
            e.preventDefault();
            loadResources(categoryKey, subKey);
          });
          subList.appendChild(subItem);
        });

        categoryItem.appendChild(subList);
        categoryItem.addEventListener("mouseover", () => subList.style.display = "block");
        categoryItem.addEventListener("mouseout", () => subList.style.display = "none");

        categoryItem.querySelector(".category-link").addEventListener("click", (e) => {
          e.preventDefault();
          const firstSubKey = Object.keys(category.subcategories)[0];
          loadResources(categoryKey, firstSubKey);
        });
      }

      categoriesMenu.appendChild(categoryItem);
    });

    const firstCategory = Object.keys(resourceDatabase)[0];
    if (firstCategory) {
      const firstSub = Object.keys(resourceDatabase[firstCategory].subcategories)[0];
      loadResources(firstCategory, firstSub);
    }
  }

  function loadResources(categoryKey, subKey) {
    contentArea.innerHTML = '<div class="loading"><p>Loading resources...</p></div>';
    setTimeout(() => {
      try {
        const category = resourceDatabase[categoryKey];
        const sub = category.subcategories[subKey];
        let html = `<h2>${category.name} / ${sub.name}</h2><div class="resource-list">`;

        if (sub.resources?.length) {
          html += sub.resources.map(res => `
            <div class="resource-card">
              <h3><a href="${res.url}" target="_blank" rel="noopener noreferrer">${res.name}</a></h3>
              <p>${res.description}</p>
              <!-- <button class="edit-resource-btn" data-category="${categoryKey}" data-subcategory="${subKey}" data-index="${sub.resources.indexOf(res)}">
                <i class="fas fa-edit"></i> Edit
              </button> -->
            </div>`).join("");
        } else {
          html += '<p>No resources found in this category.</p>';
        }

        html += "</div>";
        contentArea.innerHTML = html;
      } catch (error) {
        console.error("Error loading resources:", error);
        contentArea.innerHTML = '<div class="error-message">Error loading resources.</div>';
      }
    }, 300);
  }

  function loadNews() {
    newsContent.innerHTML = "";
    Object.values(newsDatabase.subcategories).forEach(subcategory => {
      const subcatDiv = document.createElement("div");
      subcatDiv.innerHTML = `<h4>${subcategory.name}</h4>`;
      subcategory.resources.forEach(resource => {
        const itemDiv = document.createElement("div");
        itemDiv.className = "news-item";
        itemDiv.innerHTML = `
          <h5><a href="${resource.url}" target="_blank" rel="noopener">${resource.name}</a></h5>
          <p>${resource.description}</p>
        `;
        subcatDiv.appendChild(itemDiv);
      });
      newsContent.appendChild(subcatDiv);
    });
  }

  function debounce(func, delay) {
    let timeout;
    return (...args) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => func.apply(this, args), delay);
    };
  }

  searchInput.addEventListener("input", debounce(() => {
    const query = searchInput.value.trim().toLowerCase();
    if (query.length < 2) {
      const firstCategory = Object.keys(resourceDatabase)[0];
      const firstSub = Object.keys(resourceDatabase[firstCategory].subcategories)[0];
      return loadResources(firstCategory, firstSub);
    }

    const results = [];
    for (const category of Object.values(resourceDatabase)) {
      for (const sub of Object.values(category.subcategories)) {
        if (sub.resources) {
          results.push(...sub.resources.filter(r =>
            r.name?.toLowerCase().includes(query) ||
            r.description?.toLowerCase().includes(query)
          ));
        }
      }
    }

    let html = `<h2>Search Results for "${query}"</h2><div class="resource-list">`;
    html += results.length
      ? results.map(res => `
        <div class="resource-card">
          <h3><a href="${res.url}" target="_blank" rel="noopener noreferrer">${res.name}</a></h3>
          <p>${res.description}</p>
        </div>`).join("")
      : '<p>No resources found.</p>';
    html += "</div>";
    contentArea.innerHTML = html;
  }, 300));

  editButton.addEventListener("click", () => modal.style.display = "block");
  modalClose.addEventListener("click", () => modal.style.display = "none");
  window.addEventListener("click", e => {
    if (e.target === modal) modal.style.display = "none";
  });

  function resetModalForm() {
    resourceForm.reset();
    document.getElementById('resource-id').value = '';
    modal.style.display = 'none';
  }

  resourceForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const resourceId = document.getElementById("resource-id").value;
    const formData = {
      category: resourceCategorySelect.value,
      subcategory: resourceSubcategorySelect.value === "other"
        ? otherSubcategoryInput.value.trim()
        : resourceSubcategorySelect.value,
      name: document.getElementById("resource-name").value.trim(),
      url: document.getElementById("resource-url").value.trim(),
      description: document.getElementById("resource-description").value.trim()
    };

    if ([formData.name, formData.url, formData.category, formData.description].some(v => !v)) {
      return alert("Please fill in all required fields.");
    }

    function slugify(str) {
      return str.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '');
    }
    formData.subcategory = slugify(formData.subcategory);

    try {
      const method = resourceId ? "PUT" : "POST";
      const url = resourceId
        ? `http://localhost:3000/api/resources/${resourceId}`
        : "http://localhost:3000/api/resources";

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });

      if (!response.ok) throw new Error("Failed to save resource");

      alert(resourceId ? "Resource updated successfully!" : "Resource submitted successfully! \
        \nNow the team will review it add publish it to the site later.\
        \n\nIf you have any questions, please contact us at: \
        \ndanymukesha@gmail.com \
        \n\nThank you for your contribution!");
      resetModalForm();

      const refreshResponse = await fetch("./src/data/resources.json");
      resourceDatabase = await refreshResponse.json();
      loadCategories();

    } catch (error) {
      console.error("Submission error:", error);
      alert(`Error: ${error.message}`);
    }
  });

  function attachEditResourceEvents() {
    document.querySelectorAll('.edit-resource-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const category = btn.dataset.category;
        const subcategory = btn.dataset.subcategory;
        const index = btn.dataset.index;
        const resource = resourceDatabase[category].subcategories[subcategory].resources[index];

        // Fill modal form
        resourceCategorySelect.value = category;
        updateSubcategoryOptions(category);
        resourceSubcategorySelect.value = subcategory;
        document.getElementById("resource-name").value = resource.name;
        document.getElementById("resource-url").value = resource.url;
        document.getElementById("resource-description").value = resource.description;
        document.getElementById("resource-id").value = resource.id || ""; // Ensure resources have an id

        modal.style.display = "block";
      });
    });
  }

  // Call this at the end of loadResources
  attachEditResourceEvents();
});
