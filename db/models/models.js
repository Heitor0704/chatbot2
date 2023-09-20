const Sequelize = require('sequelize');
const database = require("../conn/conn");

const Cliente = database.define('Cliente', {
  nome: Sequelize.STRING,
  telefone: Sequelize.STRING,
});

const Servico = database.define('Servico', {
  nome: Sequelize.STRING,
  valor: Sequelize.FLOAT,
  tempo: Sequelize.INTEGER,
  profissionais: Sequelize.ARRAY(Sequelize.INTEGER),
});

const Agenda = database.define('Agenda', {
  dataAgendamento: {
    type: Sequelize.DATE,
  },
  horarioAgendamento: {
    type: Sequelize.TIME,
  },
  ClienteId: {
    type: Sequelize.INTEGER,
  },
  ProfissionalId: {
    type: Sequelize.INTEGER,
  },
  ServicoId: {
    type: Sequelize.INTEGER,
  },
  valor: {
    type: Sequelize.FLOAT,
  },
  status: {
    type: Sequelize.STRING,
  },
  mensagemAgendamento1: {
    type: Sequelize.BOOLEAN,
    defaultValue: false,
  },
  mensagemAgendamento2: {
    type: Sequelize.BOOLEAN,
    defaultValue: false,
  },
});

const Empresa = database.define('Empresa', {
  responsavel:{
    type: Sequelize.STRING,
  },
  nome: {
    type: Sequelize.STRING,
  },
  documento: {
    type: Sequelize.STRING,
  },
  telefone: {
    type: Sequelize.STRING,
  },
  endereco: {
    type: Sequelize.STRING,
  },
  tempoMinimoAtendimento: {
    type: Sequelize.INTEGER,
  },
  emojiCliente: {
    type: Sequelize.STRING,
  },
  permitirCancelamento: {
    type: Sequelize.BOOLEAN,
  },
  tempoCancelamentoMaximo: {
    type: Sequelize.INTEGER,
  },
  intervaloMinutos: {
    type: Sequelize.INTEGER,
  },
});

const Profissional = database.define('Profissional', {
  numeroId: {
    type: Sequelize.INTEGER,
  },
  nome: {
    type: Sequelize.STRING,
  },
  horarios: {
    type: Sequelize.ARRAY(Sequelize.JSON),
  }
});

const Menu = database.define('Menu', {
  descricao: {
    type: Sequelize.STRING,
  },
  opcoes: {
    type: Sequelize.JSONB(),
  },
});

const Usuario = database.define('Usuario', {
  from: {
    type: Sequelize.STRING,
  },
  cont: {
    type: Sequelize.INTEGER,
  },
  nome: {
    type: Sequelize.STRING,
  },
  mensagem: {
    type: Sequelize.STRING,
  },
  telefone: {
    type: Sequelize.STRING,
  },
  nservico: {
    type: Sequelize.INTEGER,
  },
  nprofissional: {
    type: Sequelize.INTEGER,
  },
  ndata: {
    type: Sequelize.INTEGER,
  },
  data: {
    type: Sequelize.STRING,
  },
  nhorario: {
    type: Sequelize.INTEGER,
  },
  nconfirmado: {
    type: Sequelize.INTEGER,
  },
  nagendamento: {
    type: Sequelize.INTEGER,
  },
  servicos: {
    type: Sequelize.STRING,
  },
  profissionais: {
    type: Sequelize.STRING,
  },
  datas: {
    type: Sequelize.STRING,
  },
  horarios: {
    type: Sequelize.STRING,
  },
  agendamentos: {
    type: Sequelize.STRING,
  },
});

  const Owner = database.define('Owner',{
    from: {
      type: Sequelize.STRING,
    },
    cont: {
      type: Sequelize.INTEGER,
    },
    mensagem: {
      type: Sequelize.STRING,
    },
    initialize: {
      type: Sequelize.BOOLEAN,
    }
  })
// Associações entre modelos
Cliente.hasMany(Agenda);
Profissional.belongsToMany(Servico, { through: 'ProfissionalServico' });
Servico.belongsToMany(Profissional, { through: 'ProfissionalServico' });
Profissional.hasMany(Agenda);
Servico.hasMany(Agenda);
Agenda.belongsTo(Cliente);
Agenda.belongsTo(Servico);
Agenda.belongsTo(Profissional);

module.exports = {
  Cliente,
  Servico,
  Profissional,
  Empresa,
  Agenda,
  Menu,
  Usuario,
  Owner,
};
