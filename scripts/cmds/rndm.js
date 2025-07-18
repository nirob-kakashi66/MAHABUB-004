const fs = require("fs");
const { join } = require("path");

module.exports = {
  config: {
    name: "rndm",
    aliases: ["rndm", "random", "status"],
    version: "2.3",
    author: "‎N I R O B",
    countDown: 1,
    role: 0,
    shortDescription: "Sends random videos",
    longDescription: "Sends a random video from local storage.",
    category: "fun",
    guide: "{pn}"
  },

  onStart: async function ({ api, event, message }) {
    await sendLocalVideo(api, event, message);
  },

  onChat: async function ({ api, event, message }) {
    const { body } = event;
    if (!body) return;
    const messageText = body.trim().toLowerCase();

    if (["rndm", "mahabub", "random", "status"].includes(messageText)) {
      await sendLocalVideo(api, event, message);
    }
  }
};

let lastMessage = "";

async function sendLocalVideo(api, event, message) {
  const { threadID } = event;

  try {
    const jsonPath = join(__dirname, "data", "rndm.json");
    const data = JSON.parse(fs.readFileSync(jsonPath, "utf8"));

    if (!data.videos || data.videos.length === 0) {
      return message.reply("❌ No videos found. Please add some first.");
    }

    const randomVideoName = data.videos[Math.floor(Math.random() * data.videos.length)];
    const videoPath = join(__dirname, "data", "videos", randomVideoName);

    if (!fs.existsSync(videoPath)) {
      return message.reply("❌ Video file not found.");
    }

    let randomMessage;
    if (data.messages && data.messages.length > 0) {
      let uniqueMessages = data.messages.filter(msg => msg !== lastMessage);
      randomMessage = uniqueMessages.length > 0 
        ? uniqueMessages[Math.floor(Math.random() * uniqueMessages.length)] 
        : lastMessage;
    } else {
      randomMessage = "Here's your random video!";
    }

    lastMessage = randomMessage;

    message.reply({
      body: randomMessage,
      attachment: fs.createReadStream(videoPath)
    });
    
  } catch (error) {
    console.error("❌ Error sending local video:", error);
    return message.reply("❌ Failed to send video. Please try again.");
  }
}
