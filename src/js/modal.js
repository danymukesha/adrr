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
// Proxy endpoint — replace with your real server URL when deployed
const proxyEndpoint = 'https://your-proxy-server.com/submit-issue';

document.getElementById("resource-form").addEventListener("submit", async function (e) {
    e.preventDefault();

    const category = document.getElementById("resource-category").value;
    const subcategory = document.getElementById("resource-subcategory").value;
    const otherSub = document.getElementById("other-subcategory").value;
    const name = document.getElementById("resource-name").value;
    const url = document.getElementById("resource-url").value;
    const description = document.getElementById("resource-description").value;

    const finalSubcategory = subcategory === "Other" ? otherSub : subcategory;

    const issueTitle = `New Resource: ${name}`;
    const issueBody = `
**Name**: ${name}
**URL**: ${url}
**Description**: ${description}
**Category**: ${category}
**Subcategory**: ${finalSubcategory}
`;

    const payload = {
        title: issueTitle,
        body: issueBody,
        labels: ['new-resource']
    };

    try {
        const response = await fetch(proxyEndpoint, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
        });

        const result = await response.json();

        if (result.success) {
            alert("✅ Resource submitted for review! View it: " + result.issue_url);
        } else {
            alert("⚠️ Submission failed: " + result.error);
        }
    } catch (error) {
        console.error("Error submitting resource:", error);
        alert("🚫 Submission error. Try again later.");
    }
});
