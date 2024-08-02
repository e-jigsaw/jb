import { Client, GatewayIntentBits } from "discord.js";

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
});

discord.login(Bun.env.TOKEN);
