const {default: makeWASocket, DisconnectReason , useMultiFileAuthState} = require('@whiskeysockets/baileys');

//Realiza a conexão com o WhatsApp
async function connect(){

    //Salvando as credenciais de acesso (Salvar acesso do Bot)
    const { state, saveCreds } = await useMultiFileAuthState("./src/whatsapp/assets/auth/baileys");

    //Criando o bot
    const bot = makeWASocket({
        printQRInTerminal: true, //Define o QR Code no Terminal
        defaultQueryTimeoutMs: undefined, //Define o tempo para recusar uma conexão
        auth: state
    });

    //Atualizando a conexão
    bot.ev.on('connection.update',(update) => {
        
        const {connection,lastDisconnect} = update; //Recebe o status e a última conexão


        if(connection == 'close') //Se a conexão for fechada 
        {
            //Retorna verdadeiro ou falso para verificar a possibilidade de reconexão
            const shouldReconnect = lastDisconnect.error?.output?.statusCode != DisconnectReason.loggedOut;

            //Reconecta o robô ao Whatsapp
            if(shouldReconnect) {
                connect();
            }
        }
    })

    //Evento que salva as credenciais do QRCode
    bot.ev.on('creds.update',saveCreds)

    return bot;
}

module.exports = connect;
