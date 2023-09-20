const constants = require("./ownerConstants");

//Essa função envia uma mensagem de texto
async function sendMessage(bot,remoteJid,message)
{
    await bot.sendMessage(remoteJid,{text: message});
}
async function sendReact(bot,message,type)
{
    var emoji = "";
    if(type=="Wait")
    {
        emoji = "⏳";
    }
    if(type=="Sucess")
    {
        emoji = "✅";
    }
    if(type=="Failed")
    {
        emoji = "⛔";
    }
    if(type=="Back")
    {
        emoji = "↩️";
    }
    const reactionMessage = {
        react: {
            text: emoji, // use an empty string to remove the reaction
            key: message.key
        }
    }
    if(emoji!="")
    {
        await bot.readMessages([{ remoteJid:message.remoteJid,id:message.key.id}]);
        await bot.sendMessage(message.remoteJid, reactionMessage);
    }
}

module.exports = {
    sendMessage,
    sendReact
}