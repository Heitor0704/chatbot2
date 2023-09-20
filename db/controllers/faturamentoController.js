const { Agenda, Profissional, Servico, Cliente } = require('../models/models');
const { Op } = require('sequelize');

async function buscarFaturamentoPorPeriodo(inicio, fim) {
  try {
    const agendamentos = await Agenda.findAll({
      where: {
        dataAgendamento: { $between: [inicio, fim] },
      },
      include: [Profissional, Servico, Cliente],
    });

    const faturamento = agendamentos.reduce((total, agendamento) => {
      return total + agendamento.valor;
    }, 0);

    return faturamento;
  } catch (error) {
    throw new Error('Erro ao buscar faturamento por período: ' + error.message);
  }
}

async function buscarFaturamentoPorProfissional(profissionalId) {
  try {
    const agendamentos = await Agenda.findAll({
      where: { ProfissionalId: profissionalId },
      include: [Profissional, Servico, Cliente],
    });

    const faturamento = agendamentos.reduce((total, agendamento) => {
      return total + agendamento.valor;
    }, 0);

    return faturamento;
  } catch (error) {
    throw new Error('Erro ao buscar faturamento por profissional: ' + error.message);
  }
}

async function buscarFaturamentoPorServico(servicoId) {
  try {
    const agendamentos = await Agenda.findAll({
      where: { ServicoId: servicoId },
      include: [Profissional, Servico, Cliente],
    });

    const faturamento = agendamentos.reduce((total, agendamento) => {
      return total + agendamento.valor;
    }, 0);

    return faturamento;
  } catch (error) {
    throw new Error('Erro ao buscar faturamento por serviço: ' + error.message);
  }
}

async function buscarFaturamentoPorStatus(status) {
  try {
    const agendamentos = await Agenda.findAll({
      where: { status },
      include: [Profissional, Servico, Cliente],
    });

    const faturamento = agendamentos.reduce((total, agendamento) => {
      return total + agendamento.valor;
    }, 0);

    return faturamento;
  } catch (error) {
    throw new Error('Erro ao buscar faturamento por status: ' + error.message);
  }
}

async function buscarFaturamentoPorCliente(clienteId) {
  try {
    const agendamentos = await Agenda.findAll({
      where: { ClienteId: clienteId },
      include: [Profissional, Servico, Cliente],
    });

    const faturamento = agendamentos.reduce((total, agendamento) => {
      return total + agendamento.valor;
    }, 0);

    return faturamento;
  } catch (error) {
    throw new Error('Erro ao buscar faturamento por cliente: ' + error.message);
  }
}

async function buscarTodoFaturamento() {
  try {
    const agendamentos = await Agenda.findAll({
      include: [Profissional, Servico, Cliente],
    });

    const faturamento = agendamentos.reduce((total, agendamento) => {
      return total + agendamento.valor;
    }, 0);

    return faturamento;
  } catch (error) {
    throw new Error('Erro ao buscar todo o faturamento: ' + error.message);
  }
}

async function editarFaturamento(id, novoValor) {
  try {
    const agendamento = await Agenda.findByPk(id);
    if (!agendamento) {
      throw new Error('Agendamento não encontrado.');
    }

    agendamento.valor = novoValor;
    await agendamento.save();

    return 'Faturamento atualizado com sucesso.';
  } catch (error) {
    throw new Error('Erro ao editar faturamento: ' + error.message);
  }
}

module.exports = {
  buscarFaturamentoPorPeriodo,
  buscarFaturamentoPorProfissional,
  buscarFaturamentoPorServico,
  buscarFaturamentoPorStatus,
  buscarFaturamentoPorCliente,
  buscarTodoFaturamento,
  editarFaturamento,
};
