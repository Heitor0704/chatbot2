const constants = require("../userConstants");
const messageUtils = require("../../other/messageUtils");

// Tratamento de erro
async function sendHandlingMessage(bot,mensagem,message){
    await bot.sendMessage(mensagem.remoteJid,{text: message});
}
async function HandlingMessageError(bot,mensagem,usuario){
    var cont = usuario.cont;

    if(cont==2 || cont==3)
    {
        await sendHandlingMessage(bot,mensagem,messageUtils.replaceAllPlaceholders(
            constants.ASK_OPTION,[usuario.nome,constants.RETURN_MESSAGE]));
    }
    if(cont==4)
    {
      await sendHandlingMessage(bot,mensagem,messageUtils.replaceAllPlaceholders(
      constants.CHOOSE_SERVICE,[usuario.servicos,constants.RETURN_MESSAGE]));
    }
    if(cont==5)
    {
        await sendHandlingMessage(bot,mensagem,messageUtils.replaceAllPlaceholders(
        constants.CHOOSE_PROFESSIONAL,[usuario.profissionais,constants.RETURN_MESSAGE]));

    }
    if(cont==6)
    {
        await sendHandlingMessage(bot,mensagem,messageUtils.replaceAllPlaceholders(
        constants.CHOOSE_DATE,[usuario.datas,constants.RETURN_MESSAGE]));
    }
    if(cont==7)
    {
        if(usuario.ndata==6)
        {
            await sendHandlingMessage(bot,mensagem,messageUtils.replaceAllPlaceholders(
            constants.DATE_FORMAT,[constants.RETURN_MESSAGE]));
        }
    }
    if(cont==8)
    {
        await sendHandlingMessage(bot,mensagem,messageUtils.replaceAllPlaceholders(
        constants.CHOOSE_TIME,[usuario.horarios,constants.RETURN_MESSAGE]));
    }
    if(cont==9)
    {
        await sendHandlingMessage(bot,mensagem,constants.YES_NO_MESSAGE);
    }
    if(cont==21)
    {
        await sendHandlingMessage(bot,mensagem,messageUtils.replaceAllPlaceholders(
        constants.APPOINTMENT_LIST,[usuario.agendamentos,constants.CANCEL_APPOINTMENT]));
    }
    usuario.update({cont : usuario.cont-1});
}


module.exports = {
    HandlingMessageError,
}