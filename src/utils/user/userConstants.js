// constants.js

module.exports = {
    GOOGLE_SCRIPT_URL: 'https://script.google.com/macros/s/AKfycbxTNPLR3shdW4Sd2KwXVqfIrQhcE0Hv2imXBDSoEYEksIewDY-3ZU_NK4B7wdEgJAMa/exec?',
    HOUR_TIME: 1000 * 60 * 60, // 1 hora em milissegundos
  
    //Configurações
    BOT: "Liza",
    PREFIX_SEXO: "a",
    RESPONSIBLE: "Miriam",
    BOTNUMBER: "5533999639158",
    EMOJI: "🤖",
    COMPANY: "Salão Linda Mulher",

    // Mensagens iniciais (cont=0)
    INITIAL_GREETING: 'Olá, meu nome é {BOT} {EMOJI}, atendente virtual do {SALÃO}.',
    ASK_NAME: 'Por gentileza, como você se chama?',
  
    // Mensagens para o estado cont 1
    ASK_OPTION: 'Ótimo {nome}. Agora digite o número da opção na qual deseja prosseguir:\n\n'+
    '1-Agendar Horários\n2-Consultar ou Cancelar Horários\n3-Falar com um Atendente'+
    '\n\n{RETORNO}',
  
    // Mensagens para o estado cont 3
    CHOOSE_SERVICE: 'Escolha um de nossos serviços, digitando o número do mesmo:'+
    '\n\n{servicos}\n\n{RETORNO}',
  
    // Mensagens para o estado cont 4
    CHOOSE_PROFESSIONAL: 'Ok. Agora escolha com qual profissional deseja fazer seu agendamento, digitando o número do mesmo:'+
    '\n\n{profissionais}\n\n{RETORNO}',
  
    // Mensagens para o estado cont 5
    CHOOSE_DATE: 'Será um prazer atendê-lo. Digite o número da data que melhor te atenda:'+
    '\n\n{datas}\n\n{RETORNO}',
    DATE_FORMAT: 'Digite a data que desejar: (Ex: 16/01/23).\n\n{RETORNO}',
  
    // Mensagens para o estado cont 6
    CHOOSE_TIME: 'Escolha agora, digitando o número, o melhor horário para te atendermos:'+
    '\n\n{horarios}\n\n{RETORNO}',
  
    //Mensagens para o estado cont 8
    CONFIRM_MESSAGE: 'Ótimo. Posso marcar então para: {horario}?\n\n{YES_NO}\n\n{RETORNO}',

    //Mensagens para o estado cont 9
    APPOINTMENT_MESSAGE: 'Marcado então. Espero você. Muito obrigado pela preferência!',
    CANCEL_MESSAGE_FINAL: 'Sem problemas. Se precisar, estaremos aqui.',

    //Mensagens para o estado cont 20
    NO_APPOINTMENT_SCHEDULE_MESSAGE: 'Não existe nenhum horário cadastrado para esse telefone',
    APPOINTMENT_LIST: 'Você possui os seguintes agendamentos:'+
    '\n\n{AGENDAMENTOS}\n\n{CANCEL}',
    CANCEL_APPOINTMENT: 'Digite o número do agendamento se deseja cancelá-lo. Caso contrário, digite 0, para voltar ao início.',

    //Mensagens para o estado cont 21
    CONFIRM_CANCEL_MESSAGE: 'Prontinho. Seu agendamento foi desmarcado',

    // Constantes de Reações
    SUCCESS_MESSAGE: 'Sucess',
    ERROR_MESSAGE: 'Error',
    WAIT_MESSAGE: 'Wait',
    FAILED_MESSAGE: 'Failed',

    //Outras Mensagens
    YES_NO_MESSAGE: '1 - Sim\n2 - Não',
    RETURN_MESSAGE:"Para voltar, digite 0",
    FINAL_SERVICE_MESSAGE: '{EMOJI} Atendimento Finalizado!',
    FAILED_INPUT_MESSAGE: 'Não consegui entender sua resposta!',

    //Enviando conversa para iniciar com outra pessoa
    SEND_CONTACT_MESSAGE: 'Número do Protocolo: {PROTOCOLO}\nO cliente {Cliente} quer falar com você.\nhttps://wa.me/{NUMBER}',
    RETURN_MESSAGE_CONTACT: 'Número do Protocolo: {PROTOCOLO}\nAguarde que {PREFIX} atendente {NOME} entrará em contato com você!',
  };
  