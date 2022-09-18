import express from "express";
import { verifyKeyMiddleware } from "discord-interactions";
import * as dotenv from "dotenv";

import { commandList } from "./commands";

dotenv.config();

const port = process.env.PORT || 3000;

const app = express();

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
