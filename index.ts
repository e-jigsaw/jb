import { Client, GatewayIntentBits } from "discord.js";
import { insertBlock } from "./lib/notion";

const discord = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

discord.on("ready", () => {
  console.log("watching...");
});

discord.on("messageCreate", async (message) => {
  if (message.author.bot) {
    return;
  }
  if (message.content === "!ping") {
    await message.channel.send("pong");
  }
  if (message.channelId === Bun.env.DISCORD_CHANNEL_ID) {
    const res = await insertBlock(message.content);
    await message.channel.send(`noted: ${res.results[0].id}`);
  }
});

discord.login(Bun.env.TOKEN);
