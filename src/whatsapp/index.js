const connect = require("./connection");
const middlewares = require("./middlewares")
//const Flow = require("../utils/flow");
const mainFlow = require("../utils/main");
const admin = require("../utils/admin/adminUtils");
const eventQueue = []; //Lista de mensagens que chega para o bot
const expressServer = require('./server');

async function start(){
    const bot = await connect(); //Conecto com o bot
    while(bot != null)
    {
        //Lendo as mensagens
        const message = await middlewares(bot);
        eventQueue.push(message); //Coloca a mensagem dentro da lista
        //Verifique se a fila de eventos não está vazia e execute o fluxo
       if (eventQueue.length > 0) {
           const ProcessMessage = eventQueue.shift(); // Pegue o primeiro evento da fila
            mainFlow(bot, ProcessMessage); //Ações que devem ser tomadas a cada recebimento de mensagem
        }
    }
}

start();