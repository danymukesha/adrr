const express = require('express');
const fs = require('fs').promises;
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');



const app = express();
const PORT = process.env.PORT || 3000;
app.use(express.static(__dirname + '/'));
const DATA_FILE = path.join(__dirname, 'js', 'resources.json');

app.use(cors());
app.use(bodyParser.json());

app.get('/', async(req, res) => {
  res.sendFile(path.join(__dirname, '', 'index.html'));
});

app.get("/status", (req, res) => {
    res.json({ status: "Server is running" });
});

// call get to obtain all resources
app.get('/api/resources', async (req, res) => {
    try {
        const data = await fs.readFile(DATA_FILE, 'utf8');
        res.json(JSON.parse(data));
    } catch (error) {
        res.status(500).json({ error: 'Error reading resources' });
    }
});

// if the user wants to add new resource
app.post('/api/resources', async (req, res) => {
    try {
        const newResource = req.body;
        const data = JSON.parse(await fs.readFile(DATA_FILE, 'utf8'));
        
        if (!data[newResource.category]) {
            return res.status(400).json({ error: 'Invalid category' });
        }

        const subcategory = data[newResource.category].subcategories[newResource.subcategory];
        if (!subcategory) {
            return res.status(400).json({ error: 'Invalid subcategory' });
        }

        data[category].subcategories[subcategory].resources.push({
            id: Date.now().toString(),
            name: newResource.name,
            description: newResource.description,
            url: newResource.url
        });

        await fs.writeFile(DATA_FILE, JSON.stringify(data, null, 2));
        res.json({ success: true, message: 'Resource added successfully', newResource: resource});
    } catch (error) {
        console.error('Server error:', error);  
        res.status(500).json({ error: 'Error saving resource' });
    }
});

app.listen(PORT, () => {
    console.log(`Server successfully running on port ${PORT}`);
});
