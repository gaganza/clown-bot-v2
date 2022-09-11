const axios = require("axios");
const express = require("express");

const PORT = 3000;

let auth;
try {
  auth = require("./auth.json");
} catch (error) {
  auth = { token: process.env.TOKEN, public_key: process.env.PUBLIC_KEY };
}

const app = express();

const {
  InteractionType,
  InteractionResponseType,
  verifyKeyMiddleware,
} = require("discord-interactions");

const DiscordApi = axios.create({
  baseURL: "https://discordapp.com/api/",
  timeout: 3000,
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE",
    "Access-Control-Allow-Headers": "Authorization",
    Authorization: `Bot ${auth.token}`,
  },
});

console.log(auth.public_key);

app.post(
  "/interactions",
  verifyKeyMiddleware(auth.public_key),
  async (req, res) => {
    const interaction = req.body;

    if (interaction.type === InteractionType.MESSAGE_COMPONENT) {
      console.log(interaction.data.name);
    }
  }
);

app.listen(PORT, () => {});
