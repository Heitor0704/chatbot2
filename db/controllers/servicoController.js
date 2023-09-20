const { Servico, Profissional } = require('../models/models');


async function buscarTodosServicos() {
  try {
    const servicos = await Servico.findAll();
    return servicos;
  } catch (error) {
    throw new Error('Erro ao buscar todos os serviços: ' + error.message);
  }
}

async function buscarServico(id) {
  try {
    const servico = await Servico.findByPk(id);
    return servico;
  } catch (error) {
    throw new Error('Erro ao buscar serviço: ' + error.message);
  }
}

async function cadastrarServico(nome,valor,tempo) {
  try {
    const servico = await Servico.create({
      nome: nome,
      valor: valor,
      tempo: tempo,
    });
    return servico;
  } catch (error) {
    throw new Error('Erro ao cadastrar serviço: ' + error.message);
  }
}

async function editarServico(id, servicoData) {
  try {
    await Servico.update(servicoData, { where: { id } });
    const servicoAtualizado = await Servico.findByPk(id);
    return servicoAtualizado;
  } catch (error) {
    throw new Error('Erro ao editar serviço: ' + error.message);
  }
}

async function adicionarProfissionalAoServico(servicoId, profissionalId) {
  try {
    const servico = await Servico.findByPk(servicoId);
    const profissional = await Profissional.findByPk(profissionalId);

    if (!servico || !profissional) {
      throw new Error('Serviço ou profissional não encontrado.');
    }

    await servico.addProfissional(profissional);
    return 'Profissional adicionado ao serviço com sucesso.';
  } catch (error) {
    throw new Error('Erro ao adicionar profissional ao serviço: ' + error.message);
  }
}

async function removerProfissionalDoServico(servicoId, profissionalId) {
  try {
    const servico = await Servico.findByPk(servicoId);
    const profissional = await Profissional.findByPk(profissionalId);

    if (!servico || !profissional) {
      throw new Error('Serviço ou profissional não encontrado.');
    }

    await servico.removeProfissional(profissional);
    return 'Profissional removido do serviço com sucesso.';
  } catch (error) {
    throw new Error('Erro ao remover profissional do serviço: ' + error.message);
  }
}

async function excluirServico(id) {
  try {
    const servico = await Servico.findByPk(id);
    await servico.destroy();
    return 'Serviço excluído com sucesso.';
  } catch (error) {
    throw new Error('Erro ao excluir serviço: ' + error.message);
  }
}

module.exports = {
  buscarTodosServicos,
  buscarServico,
  cadastrarServico,
  editarServico,
  adicionarProfissionalAoServico,
  removerProfissionalDoServico,
  excluirServico,
};
