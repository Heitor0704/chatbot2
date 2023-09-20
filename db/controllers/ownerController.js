const { Owner } = require('../models/models');

// Função para criar um novo usuário
async function criarOwner(ownerData) {
    try {
      const owner = await Owner.create(ownerData);
      return owner;
    } catch (error) {
      throw new Error('Erro ao criar owner: ' + error.message);
    }
  }
  
  // Função para buscar todos os usuários
  async function buscarowners() {
    try {
      const owners = await Owner.findAll();
      return owners;
    } catch (error) {
      throw new Error('Erro ao buscar usuários: ' + error.message);
    }
  }
  
  // Função para buscar um usuário por ID
  async function buscarOwnerPorId(id) {
    try {
      const owner = await Owner.findByPk(id);
      return owner;
    } catch (error) {
      throw new Error('Erro ao buscar usuário por ID: ' + error.message);
    }
  }

  // Função para buscar um usuário pelo campo 'from'
async function buscarOwnerPorTelefone(from) {
  try {
    const owner = await Owner.findOne({ where: { from } });
    return owner;
  } catch (error) {
    throw new Error('Erro ao buscar owner por "from": ' + error.message);
  }
}
  
  // Função para atualizar um usuário por ID
  async function atualizarOwner(id, novoOwnerData) {
    try {
      const owner = await Owner.findByPk(id);
      if (!owner) {
        throw new Error('Usuário não encontrado');
      }
  
      await owner.update(novoOwnerData);
      return owner;
    } catch (error) {
      throw new Error('Erro ao atualizar usuário: ' + error.message);
    }
  }
  
  // Função para excluir um usuário por ID
  async function excluirOwner(id) {
    try {
      const owner = await Owner.findByPk(id);
      if (!owner) {
        throw new Error('Usuário não encontrado');
      }
  
      await owner.destroy();
      return 'Usuário excluído com sucesso';
    } catch (error) {
      throw new Error('Erro ao excluir usuário: ' + error.message);
    }
  }

// Função para excluir todos os usuários
async function excluirTodosowners() {
  try {
    await owner.destroy({
      where: {}, // Condição vazia para excluir todos os registros
    });

    return 'Todos os usuários foram excluídos com sucesso';
  } catch (error) {
    throw new Error('Erro ao excluir todos os usuários: ' + error.message);
  }
}

  
  module.exports = {
    criarOwner,
    buscarowners,
    buscarOwnerPorId,
    buscarOwnerPorTelefone,
    atualizarOwner,
    excluirOwner,
    excluirTodosowners
  };