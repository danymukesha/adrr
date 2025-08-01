const express = require('express');
const fs = require('fs').promises;
const path = require('path');
const cors = require('cors');

const toTitleCase = str => str.replace(/\w\S*/g, w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase());

const axios = require('axios');
require('dotenv').config();  // Load .env variables

// Enable CORS for local testing and GitHub Pages domain
app.use(cors());
app.use(express.json());

const app = express();
const port = process.env.PORT || 3000;

const RESOURCES_PATH = path.join(__dirname, '../data', 'resources.json');
const NEWS_PATH = path.join(__dirname, '../data', 'news.json');

// middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '../..'))); // serve static files from project root

// helper to read JSON file
const readJsonFile = async (filePath) => {
  const data = await fs.readFile(filePath, 'utf8');
  return JSON.parse(data);
};

// =helper to write JSON file
const writeJsonFile = async (filePath, data) => {
  await fs.writeFile(filePath, JSON.stringify(data, null, 2), 'utf8');
};

// GET -> News
app.get('/api/news', async (req, res) => {
  try {
    const news = await readJsonFile(NEWS_PATH);
    res.json(news);
  } catch (err) {
    console.error('Error reading news:', err.message);
    res.status(500).json({ error: 'Failed to load news data.' });
  }
});

// GET -> Resources
app.get('/api/resources', async (req, res) => {
  try {
    const resources = await readJsonFile(RESOURCES_PATH);
    res.json(resources);
  } catch (err) {
    console.error('Error reading resources:', err.message);
    res.status(500).json({ error: 'Failed to load resource data.' });
  }
});

// POST -> Add Resource
app.post('/api/resources', async (req, res) => {
  try {
    console.log('Received POST body:', req.body);

    const { category, subcategory, ...resource } = req.body;
    if (!category || !subcategory) {
      return res.status(400).json({ error: 'Missing category or subcategory.' });
    }

    const data = await readJsonFile(RESOURCES_PATH);

    if (!data[category]) {
      return res.status(400).json({ error: 'Invalid category.' });
    }

    // Sanitize subcategory key:
    const subcatKey = subcategory.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '');

    if (!data[category].subcategories[subcatKey]) {
      data[category].subcategories[subcatKey] = {
        name: toTitleCase(subcategory),
        resources: []
      };
    }

    const newResource = {
      id: Date.now().toString(),
      ...resource
    };

    data[category].subcategories[subcatKey].resources.push(newResource);
    await writeJsonFile(RESOURCES_PATH, data);

    res.status(201).json({ success: true, resource: newResource });
  } catch (err) {
    console.error('Error saving resource:', err);
    res.status(500).json({ error: 'Failed to save resource.' });
  }
});

// POST -> Add News
app.post('/api/news', async (req, res) => {
  try {
    const { subcategory, ...resource } = req.body;
    const data = await readJsonFile(NEWS_PATH);

    // Create subcategory if it doesn't exist
    if (!data.subcategories[subcategory]) {
      data.subcategories[subcategory] = {
        name: toTitleCase(subcategory),
        resources: []
      };
    }

    const newNewsItem = {
      id: Date.now().toString(),
      ...resource
    };

    data.subcategories[subcategory].resources.push(newNewsItem);
    await writeJsonFile(NEWS_PATH, data);

    res.status(201).json({ success: true, news: newNewsItem });
  } catch (err) {
    console.error('Error saving news:', err.message);
    res.status(500).json({ error: 'Failed to save news item.' });
  }
});

// PUT (edit resource)
app.put('/api/resources/:id', async (req, res) => {
  const id = req.params.id;
  const updated = req.body;

  try {
    const data = await readJsonFile(RESOURCES_PATH);

    // Find and update resource by id
    let resourceFound = false;
    Object.keys(data).forEach(category => {
      const subcategories = data[category].subcategories;
      Object.keys(subcategories).forEach(subcatKey => {
        const resources = subcategories[subcatKey].resources;
        const resourceIndex = resources.findIndex(r => r.id === id);
        if (resourceIndex !== -1) {
          resources[resourceIndex] = { ...resources[resourceIndex], ...updated };
          resourceFound = true;
        }
      });
    });

    if (!resourceFound) {
      return res.status(404).json({ error: 'Resource not found.' });
    }

    await writeJsonFile(RESOURCES_PATH, data);
    res.json({ success: true, updatedResource: { id, ...updated } });
  } catch (err) {
    console.error('Error updating resource:', err);
    res.status(500).json({ error: 'Failed to update resource.' });
  }
});

// DELETE (remove resource)
app.delete('/api/resources/:id', async (req, res) => {
  const id = req.params.id;

  try {
    const data = await readJsonFile(RESOURCES_PATH);

    // Find and remove resource by id
    let resourceFound = false;
    Object.keys(data).forEach(category => {
      const subcategories = data[category].subcategories;
      Object.keys(subcategories).forEach(subcatKey => {
        const resources = subcategories[subcatKey].resources;
        const resourceIndex = resources.findIndex(r => r.id === id);
        if (resourceIndex !== -1) {
          resources.splice(resourceIndex, 1);
          resourceFound = true;
        }
      });
    });

    if (!resourceFound) {
      return res.status(404).json({ error: 'Resource not found.' });
    }

    await writeJsonFile(RESOURCES_PATH, data);
    res.json({ success: true, id });
  } catch (err) {
    console.error('Error deleting resource:', err);
    res.status(500).json({ error: 'Failed to delete resource.' });
  }
});
// POST -> Submit Issue to GitHub

app.post('/submit-issue', async (req, res) => {
    const { title, body } = req.body;

    try {
        const response = await axios.post(
            `https://api.github.com/repos/danymukesha/adrr/issues`,
            { title, body },
            {
                headers: {
                    'Authorization': `token ${process.env.GITHUB_TOKEN}`,
                    'Accept': 'application/vnd.github.v3+json',
                    'User-Agent': 'adrr-issue-bot'
                }
            }
        );
        res.status(200).json({ success: true, url: response.data.html_url });
    } catch (error) {
        console.error('Error creating issue:', error.response?.data || error.message);
        res.status(500).json({ success: false, error: error.response?.data || error.message });
    }
});

app.listen(port, () => {
  console.log(`✅ Proxy server running on http://localhost:${port}`);
});
