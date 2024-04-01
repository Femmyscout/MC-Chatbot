const mineflayer = require('mineflayer');
const axios = require('axios');

const bot = mineflayer.createBot({
  host: 'buildersden.minehut.gg', //MC server :3
  port: 25565, //port. Deafult "25565"
  username: 'leawallgren427@gmail.com', // Mail/user
  pass: 'secret', //password. you can also remove this if you wanna run it as Cracked account
  auth: 'microsoft' // put this too offline if you wanna run cracked
});

const openAiUrl = "http://localhost:1234/v1";
const apiKey = "lm-studio";

bot.on('chat', async (username, message) => {
  if (username === bot.username) return;


  if (username !== 'WalterDim') return; //Replace this with the person you want it to listen too! :3

  const gptRegex = /Fem\s+(.*)/; //This is the Start command for it too listen.
  const match = message.match(gptRegex);
  
  if (match) {
    const processedMessage = match[1].trim();
    
    try {
      const response = await axios.post(`${openAiUrl}/chat/completions`, {
        model: "model-identifier",
        messages: [ //replace the Sustem content for what you want the ai to remember as in how to act and stuff.
          { "role": "system", "content": "you are FemBees a Minecraft player and you talk and Chat friendly and respond with Natrual behaviour and friendly and cute ways. you like bees and a Real player, because you are a Real player you don't send links/hyperlinks" },
          { "role": "user", "content": processedMessage }
        ],
        temperature: 0.7,
      }, {
        headers: { 'Authorization': `Bearer ${apiKey}` }
      });

      let botResponse = response.data.choices[0].message.content; 
      botResponse = botResponse.replace(/\n/g, ' '); 
      bot.chat(botResponse);
    } catch (error) {
      console.error('Error responding to chat:', error);
    }
  }
});