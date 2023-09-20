// Finalizando atendimento com atendente

const ownerConstants = require("./ownerConstants");
const ownerUtils = require("./ownerUtils");
const ownerControllers = require("../../../db/controllers/ownerController");
const ownerHandlings = require("./handlings/ownerHandlings");
const ownerActions = require("./ownerActions");

async function ownerFlow(bot,message){
    //Verificar se já existe um owner
    let owner = await ownerControllers.buscarOwnerPorTelefone(message.remoteJid);
    //Se for nulo, cria um novo
    if(owner==null)
    {
        owner = await ownerHandlings.CreateNulledOwner(message);
    }
    //Para finalizar conversas
    if(message.message.toString().toUpperCase() == ownerConstants.OWNER_FINISH){
        await ownerUtils.endService(bot,message);
    }
    //Para inicializar fluxo do bot de entrada
    if(message.message.toString().toUpperCase() == ownerConstants.MENU_CALL)
    {      
        await owner.update({initialize:true});
    
    }
    //Lógica do bot começa aqui
    if(owner.initialize==true)
    {
        if(message.message!=0)
        {
            await owner.update({
                cont:owner.cont+1,
                mensagem:message.message,    
            });
        }
        if(owner.cont == 0)
        {
         await ownerActions.sendMessage(bot,message.remoteJid,ownerConstants.MENU_MESSAGE);   
        }
    }
    
}
module.exports = {
    ownerFlow,
}