// dynamically injects the Add/Edit Resource modal into the DOM
const modalHTML = `
<!-- Modal for adding/editing resources -->
<div id="edit-modal" class="modal">
    <div class="modal-content">
        <span class="close">&times;</span>
        <h2>Add/Edit Resource</h2>
        <form id="resource-form">
            <div class="form-group resource-fields">
                <label for="resource-category" class="form-label">Category*</label>
                <select id="resource-category" class="form-select" required>
                    <option value="">Select a category</option>
                </select>
            </div>
            <div class="form-group">
                <label for="resource-subcategory" class="form-label">Subcategory*</label>
                <select id="resource-subcategory" class="form-select" required>
                    <option value="">Select subcategory</option>
                </select>
            </div>
            <div class="form-group other-subcategory" style="display: none;">
                <label for="other-subcategory" class="form-label">New Subcategory Name*</label>
                <input type="text" id="other-subcategory" class="form-input">
            </div>
            <div class="form-group">
                <label for="resource-name" class="form-label">Resource Name*</label>
                <input type="text" id="resource-name" class="form-input" required>
            </div>
            <div class="form-group">
                <label for="resource-url" class="form-label">URL*</label>
                <input type="url" id="resource-url" class="form-input" required>
            </div>
            <div class="form-group">
                <label for="resource-description" class="form-label">Description*</label>
                <textarea id="resource-description" class="form-textarea" required></textarea>
            </div>
            <input type="hidden" id="resource-id" value="">
            <button type="submit" class="form-submit">Save Resource</button>
        </form>
    </div>
</div>
`;

document.body.insertAdjacentHTML('beforeend', modalHTML);