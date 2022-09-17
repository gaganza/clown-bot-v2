import axios from "axios";
import express from "express";
import { verifyKeyMiddleware } from "discord-interactions";
import * as dotenv from "dotenv";

import { commandList } from "./commands";

dotenv.config();

const port = process.env.PORT || 3000;

const app = express();

const DiscordApi = axios.create({
  baseURL: "https://discord.com/api/v10",
  timeout: 3000,
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE",
    "Access-Control-Allow-Headers": "Authorization",
    Authorization: `Bot ${process.env.TOKEN as string}`,
  },
});

(async () => {
  await DiscordApi.put(
    `/applications/${process.env.APPLICATION_ID as string}/commands`,
    commandList.map(({ data }) => data.toJSON())
  )
    .then((response) => console.log(response))
    .catch((err) => console.log(err));
})();

app.post(
  "/interactions",
  verifyKeyMiddleware(process.env.PUBLIC_KEY as string),
  async (req, res) => {
    const interaction = req.body;

    for (const command of commandList) {
      if (interaction.data.name === command.data.name) {
        await command.run(res, interaction);
        break;
      }
    }
  }
);

app.listen(port, () => {});
