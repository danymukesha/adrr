document.addEventListener("DOMContentLoaded", async () => {
  // DOM Elements
  const categoriesMenu = document.getElementById("categories-menu");
  const contentArea = document.getElementById("content-area");
  const searchInput = document.querySelector(".search-input");
  const resourceForm = document.getElementById("resource-form");
  const resourceCategorySelect = document.getElementById("resource-category");
  const modal = document.getElementById("edit-modal");
  const modalClose = document.querySelector(".modal .close");
  const editButton = document.getElementById("edit-button");

  // Load resources data
  let resourceDatabase = {};
  
  try {
      const response = await fetch('./js/resources.json');
      if (!response.ok) throw new Error('Network response was not ok');
      resourceDatabase = await response.json();
      loadCategories();
  } catch (error) {
      console.error('Error loading resources:', error);
      categoriesMenu.innerHTML = '<li class="menu-item error">Failed to load categories. Please try again later.</li>';
      contentArea.innerHTML = '<div class="error-message"><p>Error loading resources. Please refresh the page or try again later.</p></div>';
  }

  // Populate categories and sidebar
  function loadCategories() {
      categoriesMenu.innerHTML = ''; // Clear loading message
      
      for (let categoryKey in resourceDatabase) {
          const category = resourceDatabase[categoryKey];
          
          // Create category list item
          const categoryItem = document.createElement("li");
          categoryItem.className = "menu-item category-item";
          categoryItem.innerHTML = `<a href="#" class="category-link" data-category="${categoryKey}">${category.name}</a>`;
          
          // Create subcategories list if they exist
          if (category.subcategories && Object.keys(category.subcategories).length > 0) {
              const subList = document.createElement("ul");
              subList.className = "subcategory-list";
              
              for (let subKey in category.subcategories) {
                  const sub = category.subcategories[subKey];
                  const subItem = document.createElement("li");
                  subItem.className = "subcategory-item";
                  subItem.innerHTML = `<a href="#" data-category="${categoryKey}" data-subcategory="${subKey}">${sub.name}</a>`;
                  subItem.querySelector("a").addEventListener("click", (e) => {
                      e.preventDefault();
                      loadResources(categoryKey, subKey);
                  });
                  subList.appendChild(subItem);
              }
              
              categoryItem.appendChild(subList);
              
              // Add click event to category link
              categoryItem.querySelector(".category-link").addEventListener("click", (e) => {
                  e.preventDefault();
                  const firstSubKey = Object.keys(category.subcategories)[0];
                  loadResources(categoryKey, firstSubKey);
              });
          }
          
          categoriesMenu.appendChild(categoryItem);

          // Add to form select
          const option = document.createElement("option");
          option.value = categoryKey;
          option.textContent = category.name;
          resourceCategorySelect.appendChild(option);
      }
      
      // Load first category by default if available
      const firstCategory = Object.keys(resourceDatabase)[0];
      if (firstCategory) {
          const firstSub = Object.keys(resourceDatabase[firstCategory].subcategories)[0];
          loadResources(firstCategory, firstSub);
      }
  }

  // Load resources for a category + subcategory
  function loadResources(categoryKey, subKey) {
      contentArea.innerHTML = '<div class="loading"><p>Loading resources...</p></div>';
      
      setTimeout(() => {
          try {
              const category = resourceDatabase[categoryKey];
              const sub = category.subcategories[subKey];
              
              let contentHTML = `
                  <h2 class="resource-title">${category.name} <span class="divider">/</span> ${sub.name}</h2>
                  <div class="resource-list">
              `;
              
              if (sub.resources && sub.resources.length > 0) {
                  sub.resources.forEach(res => {
                      contentHTML += `
                          <div class="resource-card">
                              <h3><a href="${res.url}" target="_blank" rel="noopener noreferrer">${res.name}</a></h3>
                              <p class="resource-description">${res.description}</p>
                              ${res.additionalInfo ? `<p class="resource-meta">${res.additionalInfo}</p>` : ''}
                          </div>
                      `;
                  });
              } else {
                  contentHTML += '<p class="no-resources">No resources found in this category.</p>';
              }
              
              contentHTML += '</div>';
              contentArea.innerHTML = contentHTML;
          } catch (error) {
              console.error('Error loading resources:', error);
              contentArea.innerHTML = '<div class="error-message"><p>Error loading resources. Please try again.</p></div>';
          }
      }, 300); // Small delay for better UX
  }

  // Search functionality
  searchInput.addEventListener("input", () => {
      const query = searchInput.value.trim().toLowerCase();
      
      if (query.length < 2) {
          // Reset to default view if search query is too short
          const firstCategory = Object.keys(resourceDatabase)[0];
          if (firstCategory) {
              const firstSub = Object.keys(resourceDatabase[firstCategory].subcategories)[0];
              loadResources(firstCategory, firstSub);
          }
          return;
      }
      
      contentArea.innerHTML = '<div class="loading"><p>Searching resources...</p></div>';
      
      setTimeout(() => {
          const results = [];
          
          for (let categoryKey in resourceDatabase) {
              const subcats = resourceDatabase[categoryKey].subcategories;
              for (let subKey in subcats) {
                  const resources = subcats[subKey].resources;
                  if (resources) {
                      results.push(...resources.filter(r =>
                          (r.name && r.name.toLowerCase().includes(query)) ||
                          (r.description && r.description.toLowerCase().includes(query))
                      ));
                  }
              }
          }
          
          let resultsHTML = `
              <h2 class="search-results-title">Search Results for "${query}"</h2>
              <div class="resource-list">
          `;
          
          if (results.length === 0) {
              resultsHTML += '<p class="no-results">No resources found matching your search.</p>';
          } else {
              results.forEach(res => {
                  resultsHTML += `
                      <div class="resource-card">
                          <h3><a href="${res.url}" target="_blank" rel="noopener noreferrer">${res.name}</a></h3>
                          <p class="resource-description">${res.description}</p>
                      </div>
                  `;
              });
          }
          
          resultsHTML += '</div>';
          contentArea.innerHTML = resultsHTML;
      }, 300);
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
      
      // Basic form validation
      const name = document.getElementById("resource-name").value.trim();
      const url = document.getElementById("resource-url").value.trim();
      const category = document.getElementById("resource-category").value;
      const description = document.getElementById("resource-description").value.trim();
      
      if (!name || !url || !category || !description) {
          alert("Please fill in all required fields (marked with *)");
          return;
      }
      
      // In a real app, you would send this data to a server
      console.log("Form submitted:", {
          name,
          url,
          category,
          subcategory: document.getElementById("resource-subcategory").value.trim(),
          description
      });
      
      alert("Thank you for your submission! In a production environment, this would be saved to our database.");
      modal.style.display = "none";
      resourceForm.reset();
  });
});