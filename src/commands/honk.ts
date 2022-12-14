import { InteractionResponseType } from "discord-interactions";
import { SlashCommandBuilder } from "discord.js";
import { Command } from "../interfaces/command";

export const honk: Command = {
  data: new SlashCommandBuilder()
    .setName("honk-honk")
    .setDescription(
      "Makes a clown honking noise in the active voice channel of the user that pings the bot."
    ),
  run: async (res, interaction) => {
    console.log("testing");
    console.log(interaction);

    res.send({
      type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
      data: { content: "Honk honk!" },
    });
  },
};
