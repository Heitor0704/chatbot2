//Esse arquivo comunica o robô com o Whatsapp e retorna as mensagens

async function middlewares(bot) {
    return new Promise((resolve, reject) => { //Função retorna a Promessa e resolve o problema
    bot.ev.on('messages.upsert', async ({ messages }) => { //Escutar as mensagens do Whatsapp
            const baileysMessage = messages[0]; //Retornar a mensagem
            if (!baileysMessage?.message) {
                resolve(null); // Resolva com valor nulo se não houver mensagem
                return;
            }
//Criar string de mensagem
const textMessage = baileysMessage.message?.conversation;
const extendedTextMessage = baileysMessage.message?.extendedTextMessage?.text;
const imageTextMessage = baileysMessage.message?.imageMessage?.caption;
const videoTextMessage = baileysMessage.message?.videoMessage?.caption;
const fullMessage =
textMessage || extendedTextMessage || imageTextMessage || videoTextMessage;
//Verificar se foi recebida ou enviada
var received = true;
var receivedfromMe = false;
    if(baileysMessage.key.fromMe)
    {
        received = false;
    }
    if(baileysMessage?.status == 2)
    {
        receivedfromMe = true;
    }
//Trazer nome do contato e telefone do contato
const contact = baileysMessage.key.remoteJid.substring(0,baileysMessage.key.remoteJid.indexOf("@"));
const name = baileysMessage.pushName;

            // Crie o objeto 'dialog'
            const dialog = {
                name: name,
                message: fullMessage,
                contact: contact,
                remoteJid: baileysMessage.key.remoteJid,
                key: baileysMessage.key,
                received: received,
                receivedfromMe: receivedfromMe
            };
            resolve(dialog);
        });
    });
}

module.exports = middlewares;