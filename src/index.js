const axios = require("axios");
const express = require("express");

const PORT = process.env.PORT || 3000;

let auth;
try {
  auth = require("./auth.json");
} catch (error) {
  auth = {
    token: process.env.TOKEN,
    public_key: process.env.PUBLIC_KEY,
    application_id: process.env.APPLICATION_ID,
  };
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

const commands = [
  {
    name: "honk-honk",
    description:
      "Makes a clown honking noise in the active voice channel of the user that pings the bot.",
    options: [],
  },
];

console.log(await registerCommands(auth.application_id, commands));

app.post(
  "/interactions",
  verifyKeyMiddleware(auth.public_key),
  async (req, res) => {
    const interaction = req.body;

    console.log(interaction);

    if (interaction.type === InteractionType.APPLICATION_COMMAND) {
      console.log(interaction.data.name);

      if (interaction.data.name === "honk-honk") {
        return res.send({
          type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
          data: {
            content: "Honk honk!",
          },
        });
      }
    }
  }
);

app.listen(PORT, () => {});

async function registerCommands(applicationId, commands) {
  return await DiscordApi.put(
    `/applications/${applicationId}/commands`,
    commands
  );
}
