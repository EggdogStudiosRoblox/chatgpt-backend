const express = require("express");
const axios = require("axios");
const app = express();

app.use(express.json());

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

app.post("/chat", async (req, res) => {
  const message = req.body.message;

  try {
    const openaiRes = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      {
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: message }]
      },
      {
        headers: {
          "Authorization": `Bearer ${OPENAI_API_KEY}`,
          "Content-Type": "application/json"
        }
      }
    );

    res.json({ reply: openaiRes.data.choices[0].message.content });
  } catch (err) {
    console.error(err.response?.data || err.message);
    res.status(500).json({ error: "OpenAI error" });
  }
});

app.get("/", (req, res) => {
  res.send("ChatGPT backend is live!");
});

app.listen(process.env.PORT || 3000, () => {
  console.log("Server started.");
});
