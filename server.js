const express = require('express');
const fs = require('fs').promises;
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;
const DATA_PATH = path.join(__dirname, '.', 'js', 'resources.json');

app.use(cors());
app.use(express.json());
app.use(express.static('.'));

app.get('/api/resources', async (req, res) => {
    try {
        const data = await fs.readFile(DATA_PATH, 'utf8');
        res.json(JSON.parse(data));
    } catch (error) {
        res.status(500).json({ error: 'Error reading resources' });
    }
});

app.post('/api/resources', async (req, res) => {
    try {
        const { category, subcategory, ...resource } = req.body;
        const data = JSON.parse(await fs.readFile(DATA_PATH, 'utf8'));

        if (!data[category]?.subcategories[subcategory]) {
            return res.status(400).json({ error: 'Invalid category/subcategory' });
        }

        data[category].subcategories[subcategory].resources.push({
            id: Date.now().toString(),
            ...resource
        });

        await fs.writeFile(DATA_PATH, JSON.stringify(data, null, 2));
        res.json({ success: true });
    } catch (error) {
        res.status(500).json({ error: 'Error saving resource' });
    }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));