import axios from "axios";
import { commandList } from "./commands";
import * as dotenv from "dotenv";

dotenv.config();

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
