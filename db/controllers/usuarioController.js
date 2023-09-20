const { Usuario } = require('../models/models');

// Função para criar um novo usuário
async function criarUsuario(usuarioData) {
    try {
      const usuario = await Usuario.create(usuarioData);
      return usuario;
    } catch (error) {
      throw new Error('Erro ao criar usuário: ' + error.message);
    }
  }
  
  // Função para buscar todos os usuários
  async function buscarUsuarios() {
    try {
      const usuarios = await Usuario.findAll();
      return usuarios;
    } catch (error) {
      throw new Error('Erro ao buscar usuários: ' + error.message);
    }
  }
  
  // Função para buscar um usuário por ID
  async function buscarUsuarioPorId(id) {
    try {
      const usuario = await Usuario.findByPk(id);
      return usuario;
    } catch (error) {
      throw new Error('Erro ao buscar usuário por ID: ' + error.message);
    }
  }

  // Função para buscar um usuário pelo campo 'from'
async function buscarUsuarioPorTelefone(from) {
  try {
    const usuario = await Usuario.findOne({ where: { from } });
    return usuario;
  } catch (error) {
    throw new Error('Erro ao buscar usuário por "from": ' + error.message);
  }
}
  
  // Função para atualizar um usuário por ID
  async function atualizarUsuario(id, novoUsuarioData) {
    try {
      const usuario = await Usuario.findByPk(id);
      if (!usuario) {
        throw new Error('Usuário não encontrado');
      }
  
      await usuario.update(novoUsuarioData);
      return usuario;
    } catch (error) {
      throw new Error('Erro ao atualizar usuário: ' + error.message);
    }
  }
  
  // Função para excluir um usuário por ID
  async function excluirUsuario(id) {
    try {
      const usuario = await Usuario.findByPk(id);
      if (!usuario) {
        throw new Error('Usuário não encontrado');
      }
  
      await usuario.destroy();
      return 'Usuário excluído com sucesso';
    } catch (error) {
      throw new Error('Erro ao excluir usuário: ' + error.message);
    }
  }

// Função para excluir todos os usuários
async function excluirTodosUsuarios() {
  try {
    await Usuario.destroy({
      where: {}, // Condição vazia para excluir todos os registros
    });

    return 'Todos os usuários foram excluídos com sucesso';
  } catch (error) {
    throw new Error('Erro ao excluir todos os usuários: ' + error.message);
  }
}

  
  module.exports = {
    criarUsuario,
    buscarUsuarios,
    buscarUsuarioPorId,
    buscarUsuarioPorTelefone,
    atualizarUsuario,
    excluirUsuario,
    excluirTodosUsuarios
  };