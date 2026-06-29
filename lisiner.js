import 'dotenv/config';
import http from 'http';
import { Client, GatewayIntentBits } from 'discord.js';


const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

const phrases = [
  "затролил",
  "трол",
  "тролл",
  "троллинг",
  "тролинг",
  "забайтил",
  "троллировать",
  "тролировать",
  "troll",
  "trol",
  "trolling",
  "baited",
  "троль",
  "тролил",
  "байт",
  "рейджбайт"
]


const rReaction = [
  "1518983825126850632", //dedpapizi
  "1517183494910906559",//vlad
  "1517521012457996328", //vodi
  "1516819920367910942", //zhelopuzi3
  "1516815991957360680" // papichking
]
const MYID = "1032680511396642828"
const URL_GIF = [
  "https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExejJnd3A3N3BpczNlaWVldzBybDZ0bHRlNzViNzBqamxvdDg2MXo3MCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/amxLHEPgGDCKs/giphy.gif",
  "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExZmFwZDVsbXQwcnByYndxeWtvNmU0cGd0bHYzNnUxdDZsZWZ3MGJ3NiZlcD12MV9naWZzX3NlYXJjaCZjdD1n/huuk0XPg7APDO/giphy.gif",
  "https://media.giphy.com/media/v1.Y2lkPWVjZjA1ZTQ3cThoam56aTZ6enpxMDc5bG56YXExcW9tY21iM3pxNjM1Y3ZwcTFhMyZlcD12MV9naWZzX3NlYXJjaCZjdD1n/STlSc3kppW58w1jnik/giphy.gif",
  "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExZmFwZDVsbXQwcnByYndxeWtvNmU0cGd0bHYzNnUxdDZsZWZ3MGJ3NiZlcD12MV9naWZzX3NlYXJjaCZjdD1n/GDp7LycxkT3LG/giphy.gif"

]

client.once("clientReady", () =>{
  console.log("Ready1")
})

client.on("messageCreate", async (message) => {
  if (message.author.bot) return;

  try {
    const user = await client.users.fetch(MYID);

    const targ = await message.author.displayName
    const targU = await message.author.username

     const files = message.attachments.map(attachment => attachment.url).join(", ");
     const filestext = files ? ' Вложения: ' + files : ""


    await user.send("DName&Username: " + "**" + targ + " " + targU + "**" + " Message send: " + message.content + filestext);
    
  } catch (error) {
    console.error("send error", error);
  }

  if (message.attachments.size > 0){
    const randomiz = rReaction[Math.floor(Math.random() * rReaction.length)]
    message.react(randomiz)
  }

  if (phrases.some(p => message.content.toLowerCase().includes(p))) {
    const trollrand = URL_GIF[Math.floor(Math.random() * URL_GIF.length)]
    message.reply(trollrand)
  };
});

http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('ok\n');
}).listen(process.env.PORT || 3000, () => {
  console.log('ok');
});

client.login(process.env.DISCORD_TOKEN)
