document.addEventListener("DOMContentLoaded", async () => {
  const categoriesMenu = document.getElementById("categories-menu");
  const contentArea = document.getElementById("content-area");
  const searchInput = document.querySelector(".search-input");
  const resourceForm = document.getElementById("resource-form");
  const resourceCategorySelect = document.getElementById("resource-category");
  const otherCategoryInput = document.getElementById("other-category");
  const resourceSubcategorySelect = document.getElementById("resource-subcategory");
  const otherSubcategoryInput = document.getElementById("other-subcategory");
  const modal = document.getElementById("edit-modal");
  const modalClose = document.querySelector(".modal .close");
  const editButton = document.getElementById("edit-button");
  const newsContent = document.getElementById("news-content");

  let resourceDatabase = {};

  // initialize category dropdown and subcategory handling
  resourceCategorySelect.addEventListener("change", function() {
      updateSubcategoryOptions(this.value);
  });

  resourceSubcategorySelect.addEventListener("change", function() {
      toggleOtherSubcategoryInput(this.value);
  });

  try {
      const response = await fetch("./src/data/resources.json");
      if (!response.ok) throw new Error("Network response was not ok");
      resourceDatabase = await response.json();
      loadCategories();
      initializeCategoryDropdown();
  } catch (error) {
      console.error("Error loading resources:", error);
      categoriesMenu.innerHTML =
          '<li class="menu-item error">Failed to load categories. Please try again later.</li>';
      contentArea.innerHTML =
          '<div class="error-message"><p>Error loading resources. Please refresh the page or try again later.</p></div>';
  }

  try {
      const response = await fetch("./src/data/news.json");
      if (!response.ok) throw new Error("Network response was not ok");
      newsDatabase = await response.json();
      loadNews();
  } catch (error) {
      console.error("Error loading news:", error);
      newsContent.innerHTML = '<p>Error loading news. Please try again later.</p>';
  }

  function initializeCategoryDropdown() {
      resourceCategorySelect.innerHTML = '<option value="">Select a category</option>';
      Object.entries(resourceDatabase).forEach(([key, category]) => {
          const option = new Option(category.name, key);
          resourceCategorySelect.appendChild(option);
      });
  }

  function updateSubcategoryOptions(selectedCategory) {
      resourceSubcategorySelect.innerHTML = '<option value="">Select subcategory</option>';
      otherSubcategoryInput.parentElement.style.display = "none";
      otherSubcategoryInput.required = false;

      if (selectedCategory && resourceDatabase[selectedCategory]?.subcategories) {
          const subcategories = resourceDatabase[selectedCategory].subcategories;

          // the addition of existing subcategories with a prior check
          Object.entries(subcategories).forEach(([subKey, sub]) => {
              const option = new Option(sub.name, subKey);
              resourceSubcategorySelect.appendChild(option);
          });
	
  	  // add "Other" option, if subcategory doesn't exist.
          const otherOption = new Option("Other (specify below)", "other");
          resourceSubcategorySelect.appendChild(otherOption);
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
      categoriesMenu.innerHTML = ""; // just here I am clearing the loading message

      for (let categoryKey in resourceDatabase) {
          const category = resourceDatabase[categoryKey];

          const categoryItem = document.createElement("li");
          categoryItem.className = "menu-item category-item";
          categoryItem.innerHTML = `<a href="#" class="category-link" data-category="${categoryKey}">${category.name}</a>`;

          if (
              category.subcategories &&
              Object.keys(category.subcategories).length > 0
          ) {
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

              // i add here click event to category link
              categoryItem.appendChild(subList);

              categoryItem.addEventListener("mouseover", () => {
                  subList.style.display = "block";
              });

              categoryItem.addEventListener("mouseout", () => {
                  subList.style.display = "none";
              });

              categoryItem
                  .querySelector(".category-link")
                  .addEventListener("click", (e) => {
                      e.preventDefault();
                      const firstSubKey = Object.keys(category.subcategories)[0];
                      loadResources(categoryKey, firstSubKey);
                  });
          }

          categoriesMenu.appendChild(categoryItem);

          // add to form select
          const option = document.createElement("option");
          option.value = categoryKey;
          option.textContent = category.name;
          resourceCategorySelect.appendChild(option);
      }

      // loading first category by default if available
      const firstCategory = Object.keys(resourceDatabase)[0];
      if (firstCategory) {
          const firstSub = Object.keys(
              resourceDatabase[firstCategory].subcategories
          )[0];
          loadResources(firstCategory, firstSub);
      }
  }

  function loadNews() {
      newsContent.innerHTML = "";
      Object.values(newsDatabase.subcategories).forEach(subcategory => {
          const subcatDiv = document.createElement("div");
          subcatDiv.innerHTML = `<h4 class="subcategory-title">${subcategory.name}</h4>`;
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
  // load resources for a category + subcategory
  function loadResources(categoryKey, subKey) {
      contentArea.innerHTML =
          '<div class="loading"><p>Loading resources...</p></div>';

      setTimeout(() => {
          try {
              const category = resourceDatabase[categoryKey];
              const sub = category.subcategories[subKey];

              let contentHTML = `
                <h2 class="resource-title">${category.name} <span class="divider">/</span> ${sub.name}</h2>
                <div class="resource-list">
            `;

              if (sub.resources && sub.resources.length > 0) {
                  sub.resources.forEach((res) => {
                      contentHTML += `
                        <div class="resource-card">
                            <h3><a href="${
                              res.url
                            }" target="_blank" rel="noopener noreferrer">${
            res.name
          }</a></h3>
                            <p class="resource-description">${
                              res.description
                            }</p>
                            ${
                              res.additionalInfo
                                ? `<p class="resource-meta">${res.additionalInfo}</p>`
                                : ""
                            }
                        </div>
                    `;
                  });
              } else {
                  contentHTML +=
                      '<p class="no-resources">No resources found in this category.</p>';
              }

              contentHTML += "</div>";
              contentArea.innerHTML = contentHTML;
          } catch (error) {
              console.error("Error loading resources:", error);
              contentArea.innerHTML =
                  '<div class="error-message"><p>Error loading resources. Please try again.</p></div>';
          }
      }, 300); // small delay for better UX
  }

  // fetching for functionality
  searchInput.addEventListener("input", () => {
      const query = searchInput.value.trim().toLowerCase();

      if (query.length < 2) {
          // reset to default view if search query is too short
          const firstCategory = Object.keys(resourceDatabase)[0];
          if (firstCategory) {
              const firstSub = Object.keys(
                  resourceDatabase[firstCategory].subcategories
              )[0];
              loadResources(firstCategory, firstSub);
          }
          return;
      }

      contentArea.innerHTML =
          '<div class="loading"><p>Searching resources...</p></div>';

      setTimeout(() => {
          const results = [];

          for (let categoryKey in resourceDatabase) {
              const subcats = resourceDatabase[categoryKey].subcategories;
              for (let subKey in subcats) {
                  const resources = subcats[subKey].resources;
                  if (resources) {
                      results.push(
                          ...resources.filter(
                              (r) =>
                              (r.name && r.name.toLowerCase().includes(query)) ||
                              (r.description && r.description.toLowerCase().includes(query))
                          )
                      );
                  }
              }
          }

          let resultsHTML = `
            <h2 class="search-results-title">Search Results for "${query}"</h2>
            <div class="resource-list">
        `;
        console.log(results);

          if (results.length === 0) {
              resultsHTML +=
                  '<p class="no-results">No resources found matching your search.</p>';
          } else {
              results.forEach((res) => {
                  resultsHTML += `
                    <div class="resource-card">
                        <h3><a href="${res.url}" target="_blank" rel="noopener noreferrer">${res.name}</a></h3>
                        <p class="resource-description">${res.description}</p>
                    </div>
                `;
              });
          }

          resultsHTML += "</div>";
          contentArea.innerHTML = resultsHTML;
      }, 300);
  });

  // modal logic
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

  // resource form submission
  resourceForm.addEventListener("submit", async (e) => {
      e.preventDefault();

      const formData = {
          category: resourceCategorySelect.value,
          customCategory: otherCategoryInput.value.trim(),
          subcategory: resourceSubcategorySelect.value,
          customSubcategory: otherSubcategoryInput.value.trim(),
          name: document.getElementById("resource-name").value.trim(),
          url: document.getElementById("resource-url").value.trim(),
          description: document.getElementById("resource-description").value.trim()
      };

      if (formData.subcategory === "other") {
          if (!formData.customSubcategory) {
              alert("Please specify a subcategory name");
              return;
          }
          formData.subcategory = formData.customSubcategory;
      }

      if (
          !formData.name ||
          !formData.url ||
          !formData.category ||
          !formData.description
      ) {
          alert("Please fill in all required fields (marked with *)");
          return;
      }

      // In a real app, you would send this data to a server
      // For now, we'll just log it to the console
      // and show a success message
      try {
          const response = await fetch("http://localhost:3000/api/resources", {
              method: "POST",
              headers: {
                  "Content-Type": "application/json",
              },
              body: JSON.stringify(formData),
          });

          if (!response.ok) {
              const error = await response.json();
              throw new Error(error.message || "Failed to save resource");
          }

          alert("Resource submitted successfully!");
          modal.style.display = "none";
          resourceForm.reset();

          const refreshResponse = await fetch("./src/data/resources.json");
          resourceDatabase = await refreshResponse.json();
          loadCategories();

          // close modal and reset form
          document.getElementById("edit-modal").style.display = "none";
          document.getElementById("resource-form").reset();

          // refresh data
          // await refreshApplicationData();
          // In a real app, you would send this data to a server
          // for now, we'll just log it to the console
          // and show a success message
          console.log("Form submitted:", {
              name: formData.name,
              category: formData.category,
              subcategory: document
                  .getElementById("resource-subcategory")
                  .value.trim(),
              description: formData.description,
          });

          alert(
              "Thank you for your submission! In a production environment, this will examined and if it is OKAY will be saved to our database."
          );
          modal.style.display = "none";
          resourceForm.reset();
      } catch (error) {
          console.error("Submission error:", JSON.stringify(formData));
          alert(`Error: ${error.message}`);
      }
  });
});
