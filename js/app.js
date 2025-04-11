document.addEventListener("DOMContentLoaded", async () => {
  const categoriesMenu = document.getElementById("categories-menu");
  const contentArea = document.getElementById("content-area");
  const searchInput = document.querySelector(".search-input");
  const resourceForm = document.getElementById("resource-form");
  const resourceCategorySelect = document.getElementById("resource-category");
  const modal = document.getElementById("edit-modal");
  const modalClose = document.querySelector(".modal .close");
  const editButton = document.getElementById("edit-button");

  let resourceDatabase = {};

  // Load initial data
  async function loadResourcesData() {
    try {
      const response = await fetch('/js/resources.json');
      if (!response.ok) throw new Error('Network response was not ok');
      resourceDatabase = await response.json();
      loadCategories();
    } catch (error) {
      console.error('Error loading resources:', error);
      handleLoadingError();
    }
  }

  function handleLoadingError() {
    categoriesMenu.innerHTML = '<li class="menu-item error">Failed to load categories. Please try again later.</li>';
    contentArea.innerHTML = '<div class="error-message"><p>Error loading resources. Please refresh the page.</p></div>';
  }

  function loadCategories() {
    categoriesMenu.innerHTML = '';
    
    for (let categoryKey in resourceDatabase) {
      const category = resourceDatabase[categoryKey];
      const categoryItem = createCategoryItem(categoryKey, category);
      categoriesMenu.appendChild(categoryItem);
      
      // Add to form select
      const option = new Option(category.name, categoryKey);
      resourceCategorySelect.appendChild(option);
    }

    loadDefaultCategory();
  }

  function createCategoryItem(categoryKey, category) {
    const categoryItem = document.createElement("li");
    categoryItem.className = "menu-item category-item";
    
    const categoryLink = document.createElement("a");
    categoryLink.className = "category-link";
    categoryLink.textContent = category.name;
    categoryLink.href = "#";
    categoryLink.dataset.category = categoryKey;
    
    categoryItem.appendChild(categoryLink);

    if (category.subcategories) {
      const subList = createSubcategoryList(categoryKey, category.subcategories);
      categoryItem.appendChild(subList);
      setupCategoryHover(categoryItem, subList);
    }

    return categoryItem;
  }

  function createSubcategoryList(categoryKey, subcategories) {
    const subList = document.createElement("ul");
    subList.className = "subcategory-list";
    
    for (let subKey in subcategories) {
      const sub = subcategories[subKey];
      const subItem = document.createElement("li");
      subItem.className = "subcategory-item";
      
      const subLink = document.createElement("a");
      subLink.href = "#";
      subLink.dataset.category = categoryKey;
      subLink.dataset.subcategory = subKey;
      subLink.textContent = sub.name;
      subLink.addEventListener("click", (e) => {
        e.preventDefault();
        loadResources(categoryKey, subKey);
      });
      
      subItem.appendChild(subLink);
      subList.appendChild(subItem);
    }
    
    return subList;
  }

  function setupCategoryHover(categoryItem, subList) {
    categoryItem.addEventListener("mouseenter", () => {
      subList.style.display = "block";
    });

    categoryItem.addEventListener("mouseleave", () => {
      subList.style.display = "none";
    });
  }

  function loadDefaultCategory() {
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
        contentArea.innerHTML = createResourceHTML(category, sub);
      } catch (error) {
        console.error('Error loading resources:', error);
        contentArea.innerHTML = '<div class="error-message"><p>Error loading resources.</p></div>';
      }
    }, 300);
  }

  function createResourceHTML(category, sub) {
    return `
      <h2 class="resource-title">${category.name} <span class="divider">/</span> ${sub.name}</h2>
      <div class="resource-list">
        ${sub.resources?.length ? 
          sub.resources.map(res => resourceCardHTML(res)).join('') : 
          '<p class="no-resources">No resources found</p>'}
      </div>
    `;
  }

  function resourceCardHTML(res) {
    return `
      <div class="resource-card">
        <h3><a href="${res.url}" target="_blank" rel="noopener">${res.name}</a></h3>
        <p class="resource-description">${res.description}</p>
      </div>
    `;
  }

  // Search functionality
  searchInput.addEventListener("input", () => {
    const query = searchInput.value.trim().toLowerCase();
    
    if (query.length < 2) {
      loadDefaultCategory();
      return;
    }
    
    contentArea.innerHTML = '<div class="loading"><p>Searching...</p></div>';
    
    setTimeout(() => {
      const results = [];
      for (let categoryKey in resourceDatabase) {
        const subcats = resourceDatabase[categoryKey].subcategories;
        for (let subKey in subcats) {
          const resources = subcats[subKey].resources;
          if (resources) {
            results.push(...resources.filter(r =>
              (r.name?.toLowerCase().includes(query)) ||
              (r.description?.toLowerCase().includes(query))
            ));
          }
        }
      }
      
      contentArea.innerHTML = createSearchResultsHTML(query, results);
    }, 300);
  });

  function createSearchResultsHTML(query, results) {
    return `
      <h2 class="search-results-title">Search Results for "${query}"</h2>
      <div class="resource-list">
        ${results.length ? 
          results.map(res => resourceCardHTML(res)).join('') : 
          '<p class="no-results">No matches found</p>'}
      </div>
    `;
  }

  // Modal handling
  editButton.addEventListener("click", () => modal.style.display = "block");
  modalClose.addEventListener("click", () => modal.style.display = "none");
  window.addEventListener("click", (e) => {
    if (e.target === modal) modal.style.display = "none";
  });

  // Form submission
  resourceForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    
    const formData = {
      name: document.getElementById('resource-name').value.trim(),
      url: document.getElementById('resource-url').value.trim(),
      category: document.getElementById('resource-category').value,
      subcategory: document.getElementById('resource-subcategory').value.trim(),
      description: document.getElementById('resource-description').value.trim()
    };
  
    // Basic validation
    if (!formData.name || !formData.url || !formData.category || !formData.description) {
      alert('Please fill in all required fields');
      return;
    }
  
    try {
      const response = await fetch('http://localhost:5500/api/resources', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to save resource');
      }
  
      const result = await response.json();
      alert(result.message);
      modal.style.display = 'none';
      resourceForm.reset();
      
      // Refresh data
      await loadResourcesData();
      
    } catch (error) {
      console.error('Submission error:', error);
      alert(`Error: ${error.message}`);
    }
  });

  function validateForm({ name, url, category, description }) {
    if (!name || !url || !category || !description) {
      alert("Please fill in all required fields");
      return false;
    }
    if (!isValidUrl(url)) {
      alert("Please enter a valid URL");
      return false;
    }
    return true;
  }

  function isValidUrl(string) {
    try {
      new URL(string);
      return true;
    } catch (_) {
      return false;
    }
  }

  // Initialize
  loadResourcesData();
});