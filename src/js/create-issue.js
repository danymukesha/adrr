document.getElementById('issue-form').addEventListener('submit', async (e) => {
    e.preventDefault();

    const title = document.getElementById('issue-title').value;
    const body = document.getElementById('issue-body').value;

    const response = await fetch('http://localhost:3001/submit-issue', {  // or your deployed server URL
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, body })
    });

    const data = await response.json();
    if (data.success) {
        alert(`Issue created! View it here: ${data.url}`);
    } else {
        alert(`Failed to create issue: ${data.error.message || data.error}`);
    }
});