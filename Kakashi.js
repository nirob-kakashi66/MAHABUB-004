module.exports = {
config: {
name: "kakashi",
version: "1.0",
author: "nirob",
countDown: 5,
role: 0,
shortDescription: "no prefix",
longDescription: "no prefix",
category: "no prefix",
},

onStart: async function(){}, 
onChat: async function({ event, message, getLang }) {
if (event.body && event.body.toLowerCase() === "kaka","kakashi") {
return message.reply({
body: " ──────────◊\n‣ 𝐁𝐨𝐭 & 𝐎𝐰𝐧𝐞𝐫 𝐈𝐧𝐟𝐨𝐫𝐦𝐚𝐭𝐢𝐨𝐧  \n\n‣ 𝐍𝐚𝐦𝐞: 𝐊𝐚𝐤𝐚𝐬𝐡𝐢 ꨄ︎                          ‣ 𝐁𝐨𝐭 𝐍𝐚𝐦𝐞: N I R O B - B O T ❥︎ 」",
attachment: await global.utils.getStreamFromURL("https://i.imgur.com/Maqz7oh.mp4")
});
}
}
}
