const express = require('express');
const fetch = require('node-fetch'); // Make sure to install node-fetch@2
const cors = require('cors');

const app = express();
app.use(cors()); // Allow your frontend to fetch from this server

// Use Render's PORT environment variable, default to 3000
const PORT = process.env.PORT || 3000;

// Proxy endpoint
app.get('/proxy', async (req, res) => {
    const target = req.query.url;
    if(!target) return res.status(400).send("Missing URL");

    try {
        const response = await fetch(target);
        const html = await response.text();
        res.send(html);
    } catch(err) {
        res.status(500).send("Failed to fetch: " + err.message);
    }
});

// Start server
app.listen(PORT, () => console.log(`Proxy server running on port ${PORT}`));
