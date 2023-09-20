const { Profissional, Servico } = require('../models/models');

async function buscarProfissionalPorId(id) {
  try {
    const profissional = await Profissional.findByPk(id);
    return profissional;
  } catch (error) {
    throw new Error('Erro ao buscar profissional por ID: ' + error.message);
  }
}

async function buscarTodosProfissionais() {
  try {
    const profissionais = await Profissional.findAll();
    return profissionais;
  } catch (error) {
    throw new Error('Erro ao buscar todos os profissionais: ' + error.message);
  }
}

async function cadastrarProfissional(profissionalData) {
  try {
    const profissional = await Profissional.create(profissionalData);
    return profissional;
  } catch (error) {
    throw new Error('Erro ao cadastrar profissional: ' + error.message);
  }
}

async function editarProfissional(id, profissionalData) {
  try {
    await Profissional.update(profissionalData, { where: { id } });
    const profissionalAtualizado = await Profissional.findByPk(id);
    return profissionalAtualizado;
  } catch (error) {
    throw new Error('Erro ao editar profissional: ' + error.message);
  }
}

async function adicionarServicoAoProfissional(profissionalId, servicoId) {
  try {
    const profissional = await Profissional.findByPk(profissionalId);
    const servico = await Servico.findByPk(servicoId);

    if (!profissional || !servico) {
      throw new Error('Profissional ou serviço não encontrado.');
    }

    await profissional.addServico(servico);
    return 'Serviço adicionado ao profissional com sucesso.';
  } catch (error) {
    throw new Error('Erro ao adicionar serviço ao profissional: ' + error.message);
  }
}

async function removerServicoDoProfissional(profissionalId, servicoId) {
  try {
    const profissional = await Profissional.findByPk(profissionalId);
    const servico = await Servico.findByPk(servicoId);

    if (!profissional || !servico) {
      throw new Error('Profissional ou serviço não encontrado.');
    }

    await profissional.removeServico(servico);
    return 'Serviço removido do profissional com sucesso.';
  } catch (error) {
    throw new Error('Erro ao remover serviço do profissional: ' + error.message);
  }
}

async function excluirProfissional(id) {
  try {
    const profissional = await Profissional.findByPk(id);
    await profissional.destroy();
    return 'Profissional excluído com sucesso.';
  } catch (error) {
    throw new Error('Erro ao excluir profissional: ' + error.message);
  }
}

module.exports = {
  buscarProfissionalPorId,
  buscarTodosProfissionais,
  cadastrarProfissional,
  editarProfissional,
  adicionarServicoAoProfissional,
  removerServicoDoProfissional,
  excluirProfissional,
};
