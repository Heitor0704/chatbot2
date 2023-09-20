const { Agenda, Profissional, Servico, Cliente } = require('../models/models');

async function buscarAgendaPorPeriodo(inicio, fim) {
  try {
    const agendamentos = await Agenda.findAll({
      where: {
        dataAgendamento: { $between: [inicio, fim] },
      },
      include: [Profissional, Servico, Cliente],
    });
    return agendamentos;
  } catch (error) {
    throw new Error('Erro ao buscar agenda por período: ' + error.message);
  }
}

async function buscarAgendaPorProfissional(profissionalId) {
  try {
    const agendamentos = await Agenda.findAll({
      where: { ProfissionalId: profissionalId },
      include: [Profissional, Servico, Cliente],
    });
    return agendamentos;
  } catch (error) {
    throw new Error('Erro ao buscar agenda por profissional: ' + error.message);
  }
}

async function buscarAgendaPorServico(servicoId) {
  try {
    const agendamentos = await Agenda.findAll({
      where: { ServicoId: servicoId },
      include: [Profissional, Servico, Cliente],
    });
    return agendamentos;
  } catch (error) {
    throw new Error('Erro ao buscar agenda por serviço: ' + error.message);
  }
}

async function buscarAgendaPorStatus(status) {
  try {
    const agendamentos = await Agenda.findAll({
      where: { status },
      include: [Profissional, Servico, Cliente],
    });
    return agendamentos;
  } catch (error) {
    throw new Error('Erro ao buscar agenda por status: ' + error.message);
  }
}

async function buscarAgendaPorCliente(clienteId) {
  try {
    const agendamentos = await Agenda.findAll({
      where: { ClienteId: clienteId },
      include: [Profissional, Servico, Cliente],
    });
    return agendamentos;
  } catch (error) {
    throw new Error('Erro ao buscar agenda por cliente: ' + error.message);
  }
}

async function buscarTodosAgendamentos() {
  try {
    const agendamentos = await Agenda.findAll({
      include: [Profissional, Servico, Cliente],
    });
    return agendamentos;
  } catch (error) {
    throw new Error('Erro ao buscar todos os agendamentos: ' + error.message);
  }
}

async function cadastrarAgendamento(agendamentoData) {
  try {
    const agendamento = await Agenda.create(agendamentoData);
    return agendamento;
  } catch (error) {
    throw new Error('Erro ao cadastrar agendamento: ' + error.message);
  }
}

async function editarAgendamento(id, agendamentoData) {
  try {
    await Agenda.update(agendamentoData, { where: { id } });
    const agendamentoAtualizado = await Agenda.findByPk(id);
    return agendamentoAtualizado;
  } catch (error) {
    throw new Error('Erro ao editar agendamento: ' + error.message);
  }
}

module.exports = {
  buscarAgendaPorPeriodo,
  buscarAgendaPorProfissional,
  buscarAgendaPorServico,
  buscarAgendaPorStatus,
  buscarAgendaPorCliente,
  buscarTodosAgendamentos,
  cadastrarAgendamento,
  editarAgendamento,
};
