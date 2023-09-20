const userFlow = require("./user/userFlow");
const ownerFlow = require("./owner/ownerFlow");
async function mainFlow(bot,message){
    //Continua as análises de mensagens
    if(message.receivedfromMe==false)
    {
        userFlow(bot,message);
    }
    else
    {
        ownerFlow.ownerFlow(bot,message);
    } 
}

module.exports = mainFlow;