const { Cliente } = require('../models/models');

async function buscarClientePorTelefone(telefone) {
  try {
    const cliente = await Cliente.findOne({ where: { telefone } });
    return cliente;
  } catch (error) {
    throw new Error('Erro ao buscar cliente por telefone: ' + error.message);
  }
}

async function buscarTodosClientes() {
  try {
    const clientes = await Cliente.findAll();
    return clientes;
  } catch (error) {
    throw new Error('Erro ao buscar todos os clientes: ' + error.message);
  }
}

async function cadastrarCliente(nome,telefone) {
  try {
    const cliente = await Cliente.create({
      nome : nome,
      telefone: telefone
    });
    return cliente;
  } catch (error) {
    throw new Error('Erro ao cadastrar cliente: ' + error.message);
  }
}

async function editarCliente(id, clienteData) {
  try {
    await Cliente.update(clienteData, { where: { id } });
    const clienteAtualizado = await Cliente.findByPk(id);
    return clienteAtualizado;
  } catch (error) {
    throw new Error('Erro ao editar cliente: ' + error.message);
  }
}

async function excluirCliente(id) {
  try {
    const cliente = await Cliente.findByPk(id);
    await cliente.destroy();
    return 'Cliente excluído com sucesso.';
  } catch (error) {
    throw new Error('Erro ao excluir cliente: ' + error.message);
  }
}

module.exports = {
  buscarClientePorTelefone,
  buscarTodosClientes,
  cadastrarCliente,
  editarCliente,
  excluirCliente,
};
