const usuarioController = require("../../../db/controllers/usuarioController") 
const userHandling = require("./handlings/userHandling");
const client = require("../user/userActions");
const axios = require("axios");
const constants = require("../user/userConstants");
const messageUtils = require("../other/messageUtils");

async function Flow(bot,mensagem){
    //Verifica se a mensagem foi recebida pelo robô
    if(mensagem?.received==true & mensagem.message!=""){
    //Estancia o usuário da classe usuários
    let usuario = await usuarioController.buscarUsuarioPorTelefone(mensagem.remoteJid);
    //Definição inicial dos usuários
    if(usuario==null)
  {
    usuario = await userHandling.CreateNulledUser(mensagem); //Crio um usuario nulo
  }
    else
  {
    //Tratamento de zerar o usuário pelo tempo de conversa
    if(new Date().getTime()-new Date(usuario.updatedAt).getTime()>constants.HOUR_TIME) //Tempo superior a 1 hora
    {
      await userHandling.UpdateNullUser(mensagem,usuario)
    }
  }
    //Tratamento do zero
    if(mensagem.message=="0")
    {
    //Tratando cont para PONTES (Pontes do código 3 e 7)
    if(usuario.cont==3 || usuario.cont==7)
    {
    await usuario.update({cont : usuario.cont-2})
    }
    else
    {
    await usuario.update({cont : usuario.cont-1})
    }
    //Realiza os tratamentos no usuário
    await userHandling.HandlingUser(usuario.cont,usuario,mensagem);
    }
    else
    {
      await usuario.update({
        cont : usuario.cont+1,
        mensagem : mensagem.message,
      })    
    }  
  //Lógica das telas   
  if(usuario.cont===0) {
    await client.sendReact(bot,mensagem,constants.SUCCESS_MESSAGE);
    await client.sendMessage(bot,mensagem.remoteJid,messageUtils.replaceAllPlaceholders(
    constants.INITIAL_GREETING,[constants.BOT,constants.EMOJI,constants.COMPANY]));
    await client.sendMessage(bot,mensagem.remoteJid,constants.ASK_NAME);
    }
  if(usuario.cont===1)
    {
    await usuario.update({nome : usuario.mensagem,});  
    await client.sendReact(bot,mensagem,constants.SUCCESS_MESSAGE);
    await client.sendMessage(bot,mensagem.remoteJid,messageUtils.replaceAllPlaceholders(
    constants.ASK_OPTION,[usuario.nome,constants.RETURN_MESSAGE]));
    }
  if(usuario.cont==2)
    {
      if(usuario.mensagem==1)
      {
        await usuario.update({cont : 3})
        }
      else if(usuario.mensagem==2)
      {
        await usuario.update({cont : 20})
      }
      else if(usuario.mensagem==3)
      {
        await client.sendReact(bot,mensagem,constants.SUCCESS_MESSAGE);
        await usuario.update({cont : 100});
        await client.sendMessage(bot,messageUtils.addJid(constants.BOTNUMBER),messageUtils.replaceAllPlaceholders(
        constants.SEND_CONTACT_MESSAGE,[new Date(usuario.createdAt).getTime(),usuario.nome,usuario.telefone]));
        await client.sendMessage(bot,mensagem.remoteJid,messageUtils.replaceAllPlaceholders(
        constants.RETURN_MESSAGE_CONTACT,[new Date(usuario.createdAt).getTime(),constants.PREFIX_SEXO,constants.RESPONSIBLE]));

      }
      else
      {
        await client.sendError(bot,mensagem,usuario);
      }
    }
    if(usuario.cont==3)
    {
      await client.sendReact(bot,mensagem,constants.WAIT_MESSAGE);
      //Limpa os usuários no google Sheets
      await axios.get(constants.GOOGLE_SCRIPT_URL+'telefone='+usuario.telefone+'&edit='+3)
      //Cria um novo usuário no google Sheets 
      await axios.get(constants.GOOGLE_SCRIPT_URL+'telefone='+usuario.telefone+'&nome='+usuario.nome+'&edit='+2)
      //Retorna as informações do novo usuário no google Sheets
      await axios.get(constants.GOOGLE_SCRIPT_URL+'telefone='+usuario.telefone+'&edit='+0)
      .then(response => {
      usuario.update({servicos : response.data[0].Servicos})    
    })
    if(usuario.servicos=="")
    {
      await client.sendError(bot,mensagem,usuario);
    }
    else
    {  
    await client.sendReact(bot,mensagem,constants.SUCCESS_MESSAGE);  
    await client.sendMessage(bot,mensagem.remoteJid,messageUtils.replaceAllPlaceholders(
    constants.CHOOSE_SERVICE,[usuario.servicos,constants.RETURN_MESSAGE]));
    }
    }
    if(usuario.cont==4)
    {
      await usuario.update({nservico : usuario.mensagem});
      //Inserir
      await client.sendReact(bot,mensagem,constants.WAIT_MESSAGE);
      await axios.get(constants.GOOGLE_SCRIPT_URL+'telefone='+usuario.telefone+'&nservico='+usuario.nservico+'&edit='+1)
      //Buscar
      await axios.get(constants.GOOGLE_SCRIPT_URL+'telefone='+usuario.telefone+'&edit='+0)
      .then(response => {
        usuario.update({profissionais : response.data[0].Profissionais});
      })
      if(usuario.profissionais=="")
      {
      await client.sendError(bot,mensagem,usuario);
      }
      else
      {
      await client.sendReact(bot,mensagem,constants.SUCCESS_MESSAGE); 
      await client.sendMessage(bot,mensagem.remoteJid,messageUtils.replaceAllPlaceholders(
      constants.CHOOSE_PROFESSIONAL,[usuario.profissionais,constants.RETURN_MESSAGE]));
      }
    }
    if(usuario.cont==5)
    {
      await usuario.update({nprofissional : usuario.mensagem});
      await client.sendReact(bot,mensagem,constants.WAIT_MESSAGE);
      //Inserir
      await axios.get(constants.GOOGLE_SCRIPT_URL+'telefone='+usuario.telefone+'&nprofissional='+usuario.nprofissional+'&edit='+1)
      //Buscar
      await axios.get(constants.GOOGLE_SCRIPT_URL+'telefone='+usuario.telefone+'&edit='+0)
      .then(response => {
          usuario.update({datas : response.data[0].Datas});
      })
      if(usuario.datas=="")
      {
        await client.sendError(bot,mensagem,usuario);
      }
      else
      {
      await client.sendReact(bot,mensagem,constants.SUCCESS_MESSAGE);
      await client.sendMessage(bot,mensagem.remoteJid,messageUtils.replaceAllPlaceholders(
      constants.CHOOSE_DATE,[usuario.datas,constants.RETURN_MESSAGE]));
      }
    }
    if(usuario.cont==6)
    {
      await usuario.update({ndata : usuario.mensagem});
      if(usuario.ndata!=6)
      {
        //Inserir
      await client.sendReact(bot,mensagem,constants.WAIT_MESSAGE);
      await axios.get(constants.GOOGLE_SCRIPT_URL+'telefone='+usuario.telefone+'&ndata='+usuario.ndata+'&edit='+1)
      //Buscar
      await axios.get(constants.GOOGLE_SCRIPT_URL+'telefone='+usuario.telefone+'&edit='+0)
      .then(response => {
        usuario.update({horarios : response.data[0].Horarios});
      })
      if(usuario.horarios=="")
      {
        await client.sendError(bot,mensagem,usuario);
      }
      else
      {
        await usuario.update({cont : 7});
      }
      }
      else
      {
      //Inserir
      await client.sendReact(bot,mensagem,constants.WAIT_MESSAGE);
      await axios.get(constants.GOOGLE_SCRIPT_URL+'telefone='+usuario.telefone+'&ndata='+usuario.ndata+'&edit='+1)
      await client.sendMessage(bot,mensagem.remoteJid,messageUtils.replaceAllPlaceholders(
      constants.DATE_FORMAT,[constants.RETURN_MESSAGE]));
      await client.sendReact(bot,mensagem,constants.SUCCESS_MESSAGE);
      }
    }
    if(usuario.cont==7)
    {
      if(usuario.ndata==6)
      {
      await usuario.update({data : usuario.mensagem})  
      //Inserir
      await client.sendReact(bot,mensagem,constants.WAIT_MESSAGE);
      await axios.get(constants.GOOGLE_SCRIPT_URL+'telefone='+usuario.telefone+'&data='+usuario.data+'&edit='+1)
      //Buscar
      await axios.get(constants.GOOGLE_SCRIPT_URL+'telefone='+usuario.telefone+'&edit='+0)
      .then(response => {
        usuario.update({horarios : response.data[0].Horarios}); 
      })
      if(usuario.horarios=="")
      {
        await client.sendError(bot,mensagem,usuario);
      }
      else
      {
      await client.sendReact(bot,mensagem,constants.SUCCESS_MESSAGE);
      await client.sendMessage(bot,mensagem.remoteJid,messageUtils.replaceAllPlaceholders(
      constants.CHOOSE_TIME,[usuario.horarios,constants.RETURN_MESSAGE]));
      }
      }
      else{
      await client.sendReact(bot,mensagem,constants.SUCCESS_MESSAGE);
      await client.sendMessage(bot,mensagem.remoteJid,messageUtils.replaceAllPlaceholders(
      constants.CHOOSE_TIME,[usuario.horarios,constants.RETURN_MESSAGE]));
      }
    }
    if(usuario.cont==8)
    {
      await usuario.update({nhorario : usuario.mensagem});
      //Inserir
      await client.sendReact(bot,mensagem,constants.WAIT_MESSAGE);
      await axios.get(constants.GOOGLE_SCRIPT_URL+'telefone='+usuario.telefone+'&horarion='+usuario.nhorario+'&edit='+1)
      //Buscar
      await axios.get(constants.GOOGLE_SCRIPT_URL+'telefone='+usuario.telefone+'&edit='+0)
      .then(async response => {
        if(response.data[0].TimeT=="")
        {
         await client.sendError(bot,mensagem,usuario);
        }
        else{
        await client.sendReact(bot,mensagem,constants.SUCCESS_MESSAGE);
        await client.sendMessage(bot,mensagem.remoteJid,messageUtils.replaceAllPlaceholders(
        constants.CONFIRM_MESSAGE,[response.data[0].TimeT,constants.YES_NO_MESSAGE,constants.RETURN_MESSAGE]));  
        }
      })
      
    }
    if(usuario.cont==9)
    {
      await usuario.update({nconfirmado : usuario.mensagem});
      if(usuario.nconfirmado==1)
      {
        //Inserir
      await client.sendReact(bot,mensagem,constants.WAIT_MESSAGE);  
      await axios.get(constants.GOOGLE_SCRIPT_URL+'telefone='+usuario.telefone+'&nconfirmado='+usuario.nconfirmado+'&edit='+1)
      await client.sendReact(bot,mensagem,constants.SUCCESS_MESSAGE);
      await client.sendMessage(bot,mensagem.remoteJid,constants.APPOINTMENT_MESSAGE);
      await client.sendMessage(bot,mensagem.remoteJid,messageUtils.replaceAllPlaceholders(
      constants.FINAL_SERVICE_MESSAGE,[constants.EMOJI]));  
      await usuario.update({cont : -1});
    }
      else if(usuario.nconfirmado==2)
      { 
       await client.sendMessage(bot,mensagem.remoteJid,constants.CANCEL_MESSAGE_FINAL);
       await client.sendMessage(bot,mensagem.remoteJid,messageUtils.replaceAllPlaceholders(
       constants.FINAL_SERVICE_MESSAGE,[constants.EMOJI]));
       await usuario.update({cont : -1});
      }
      else
      {
        await client.sendError(bot,mensagem,usuario);
      }
    }
    if(usuario.cont==20)
    {
      await client.sendReact(bot,mensagem,constants.WAIT_MESSAGE);
      //Limpar antigos
      await axios.get(constants.GOOGLE_SCRIPT_URL+'telefone='+usuario.telefone+'&edit='+3)
      //Inserir
      await axios.get(constants.GOOGLE_SCRIPT_URL+'telefone='+usuario.telefone+'&nome='+usuario.nome+'&edit='+2)
      //Atualizar cancelamento
      await axios.get(constants.GOOGLE_SCRIPT_URL+'telefone='+usuario.telefone+'&cancelamento='+1+'&edit='+1)
      await axios.get(constants.GOOGLE_SCRIPT_URL+'telefone='+usuario.telefone+'&edit='+0)
      .then(response => {
        usuario.update({agendamentos : response.data[0].Agendamentos});
      })
      if(usuario.agendamentos=="")
      {
       await client.sendError(bot,mensagem,usuario);
      }
      else
      {      
        if(usuario.agendamentos == constants.NO_APPOINTMENT_SCHEDULE_MESSAGE)
          {
            await client.sendReact(bot,mensagem,constants.FAILED_MESSAGE);
            await client.sendMessage(bot,mensagem.remoteJid,constants.NO_APPOINTMENT_SCHEDULE_MESSAGE);
            await client.sendMessage(bot,mensagem.remoteJid,messageUtils.replaceAllPlaceholders(
            constants.FINAL_SERVICE_MESSAGE,[constants.EMOJI]));
            usuario.update({cont : -1,mensagem:""});
          }
          else
          {
            await client.sendReact(bot,mensagem,constants.SUCCESS_MESSAGE);
            await client.sendMessage(bot,mensagem.remoteJid,messageUtils.replaceAllPlaceholders(
            constants.APPOINTMENT_LIST,[usuario.agendamentos,constants.CANCEL_APPOINTMENT]));
          }
      }
      }
    if(usuario.cont==21)
    {
      usuario.update({nagendamento : usuario.mensagem});
      //Inserir
      if(isNaN(usuario.nagendamento))
      {
        await client.sendError(bot,mensagem,usuario);
      }
      else
      {
      await client.sendReact(bot,mensagem,constants.WAIT_MESSAGE);  
      await axios.get(constants.GOOGLE_SCRIPT_URL+'telefone='+usuario.telefone+'&nagendamento='+usuario.nagendamento+'&edit='+1)  
      await axios.get(constants.GOOGLE_SCRIPT_URL+'telefone='+usuario.telefone+'&ncancelado='+1+'&edit='+1)
      await client.sendReact(bot,mensagem,constants.SUCCESS_MESSAGE);
      await client.sendMessage(bot,mensagem.remoteJid,constants.CONFIRM_CANCEL_MESSAGE);
      await client.sendMessage(bot,mensagem.remoteJid,messageUtils.replaceAllPlaceholders(
      constants.FINAL_SERVICE_MESSAGE,[constants.EMOJI]));
      await usuario.update({cont : -1});  
      } 
    }  
}}

module.exports = Flow;
