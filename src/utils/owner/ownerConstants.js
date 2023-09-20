// constants.js
module.exports = {
    
    OWNER_FINISH: 'ATENDIMENTO FINALIZADO',
    MENU_CALL: '/MENU',
    //Mensagens para o estado cont 0
    MENU_MESSAGE: 'Bem vindo ao menu pessoal do seu atendente virtual.\nNele você será capaz de editar as informações sobre os serviços e profissionais, além de consultar sua agenda e ver seu faturamento.'+
    '\n*Digite um dos números abaixo para continuar:\n\n1 - ✂️ Serviços\n2 - 💇Profissionais\n3 - 📔 Agenda'+
    '\n4 - 💸Faturamento\n5 - ⚙️Configurações\n6 - 🎧Suporte*',
    SERVICE_MENU: 'Ótimo, vamos apresentar as opções de serviços:\n'+
    '*Digite um dos números abaixo para continuar:\n'+
    '1 - ➕ Cadastrar Serviços\n2 - ✏️Editar Serviços\n0 - ↩️Voltar*',
    CREATE_SERVICE_STEP_1:'Ótimo, vamos começar a etapa de cadastro de um novo serviço.\n'+
    '*Para começar nos informe o nome do serviço* (Ex: Corte de Cabelo).{RETORNO}',
    CREATE_SERVICE_STEP_2:'*Agora informe o tempo em minutos para a realização do serviço (Ex: 30).*{RETORNO}',    
    CREATE_SERVICE_STEP_3:'*Informe o valor que deseja cobrar pelo serviço* (Ex: 20,00).{RETORNO}',
    CREATE_SERVICE_STEP_4:'*Por fim, indique digite em sequência o número dos profissionais que realizam o serviço*\n'+
    '(Ex: 1-Maria 2-Isabela 3-Miriam\nResposta: 1-2 (Para Maria e Isabela)).{RETORNO}',
    CREATE_SERVICE_STEP_5:'Ok, vamos confirmar os dados:\n*Serviço: {SERVICO}\nTempo: {TEMPO} min.\n'+
    'Valor: {VALOR}\nProfissionais: {Profissionais}\n\nOs dados informados conferem? Se “SIM” digite 1 se “NÃO” digite 2.*',
    EDIT_SERVICE: 'Certo, vamos começar o processo de edição dos serviços escolhendo o serviço que deseja editar:\n'+
    '*Digite um dos números abaixo para continuar:\n\n{SERVICOS}*{RETORNO}',
    EDIT_SERVICE_STEP_1: 'Excelente, você escolheu o serviço N. Esses são os dados:\n\n'+
    '*Serviço: {SERVICO}\nTempo: {TEMPO} min.\nValor: {VALOR}\nProfissionais: {Profissionais}\n\n'+
    'Digite um dos números abaixo para continuar:\n1 - 📔 Editar Nome do Serviço\n2 - ⌚Editar Tempo'+
    '3 - 💵Editar Valor\n4 - 🙅Editar Profissionais\n5 - ❌Excluir Serviço\n0 - ↩️Voltar*',
    EDIT_SERVICE_STEPS:'O {DESCRICAO} desse serviço é de {VALOR}.\n*Digite o valor que deseja para esse campo.*{RETORNO}',
    REMOVE_SERVICE:'Deseja realmente excluir esse serviço?\N*Se “SIM” digite 1 se “NÃO” digite 2.*',
    
    //Mensagens para o estado cont 9
    APPOINTMENT_MESSAGE: 'Marcado então. Espero você. Muito obrigado pela preferência!',
    CANCEL_MESSAGE_FINAL: 'Sem problemas. Se precisar, estaremos aqui.',

    
    // Constantes de Reações
    SUCCESS_MESSAGE: 'Sucess',
    ERROR_MESSAGE: 'Error',
    WAIT_MESSAGE: 'Wait',
    FAILED_MESSAGE: 'Failed',
    RETURN_MESSAGE: '\n\nCaso queira voltar, digite 0 para voltar.',
    //Outras Mensagens
    FINAL_SERVICE_MESSAGE: '{EMOJI} Atendimento Finalizado!',
    
    //Enviando conversa para iniciar com outra pessoa
    SEND_CONTACT_MESSAGE: 'Número do Protocolo: {PROTOCOLO}\nO cliente {Cliente} quer falar com você.\nhttps://wa.me/{NUMBER}',
    RETURN_MESSAGE_CONTACT: 'Número do Protocolo: {PROTOCOLO}\nAguarde que {PREFIX} atendente {NOME} entrará em contato com você!',
  };
  