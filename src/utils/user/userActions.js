//Esse arquivo recebe e envia as mensagens num formato de uso
const messageHandling = require("../user/handlings/messageHandling");
const constants = require("../user/userConstants");

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

async function sendError(bot,mensagem,usuario){
    if(mensagem.message!="0")
    {
    await sendReact(bot,mensagem,constants.FAILED_MESSAGE);
    await sendMessage(bot,mensagem.remoteJid,constants.FAILED_INPUT_MESSAGE);
    await messageHandling.HandlingMessageError(bot,mensagem,usuario);
    }
}

module.exports = {
    sendMessage,
    sendReact,
    sendError
}