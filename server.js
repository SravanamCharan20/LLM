require('dotenv').config();
const express = require('express');
const axios = require('axios');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 8080;

app.use(cors());
app.use(bodyParser.json());

const OLLAMA_API_URL = "http://127.0.0.1:11434/api/generate";

app.post('/chat', async (req, res) => {
    const { prompt } = req.body;

    if (!prompt) {
        return res.status(400).json({ error: "Prompt is required" });
    }

    try {
        const response = await axios.post(OLLAMA_API_URL, {
            model: "llama3.2:1b",
            prompt: prompt,
            stream: false 
        });

        res.json({ response: response.data.response });
    } catch (error) {
        console.error("Error:", error.message);
        res.status(500).json({ error: "Failed to generate response" });
    }
});

app.listen(PORT, () => {
    console.log(`🚀 Private LLM API running on http://127.0.0.1:${PORT}`);
});