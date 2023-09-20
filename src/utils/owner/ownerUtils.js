const usuarioController = require("../../../db/controllers/usuarioController");
const constants = require("./ownerConstants");
const actions = require("./ownerActions");
// Finalizar Atendimento

async function endService(bot,message){
    const usuario = await usuarioController.buscarUsuarioPorTelefone(message.remoteJid);
    await usuario.update({cont:-1});
    await actions.sendReact(bot,message,constants.SUCCESS_MESSAGE);
    
}
module.exports = {
    endService
}