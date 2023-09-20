const { Empresa } = require('../models/models');

async function buscarEmpresa() {
  try {
    const empresa = await Empresa.findOne();
    return empresa;
  } catch (error) {
    throw new Error('Erro ao buscar empresa: ' + error.message);
  }
}

async function criarEmpresa(empresaData) {
  try {
    const empresa = await Empresa.create(empresaData);
    return empresa;
  } catch (error) {
    throw new Error('Erro ao criar empresa: ' + error.message);
  }
}

async function editarEmpresa(empresaData) {
  try {
    const empresa = await Empresa.findOne();
    if (!empresa) {
      throw new Error('Empresa não encontrada.');
    }

    Object.assign(empresa, empresaData);
    await empresa.save();

    return 'Empresa atualizada com sucesso.';
  } catch (error) {
    throw new Error('Erro ao editar empresa: ' + error.message);
  }
}

module.exports = {
  buscarEmpresa,
  criarEmpresa,
  editarEmpresa,
};
