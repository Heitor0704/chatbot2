const { Menu } = require('../models/models');

async function buscarMenus() {
  try {
    const menus = await Menu.findAll();
    return menus;
  } catch (error) {
    throw new Error('Erro ao buscar menus: ' + error.message);
  }
}

async function buscarMenuPorId(id) {
  try {
    const menu = await Menu.findByPk(id);
    if (!menu) {
      throw new Error('Menu não encontrado.');
    }
    return menu;
  } catch (error) {
    throw new Error('Erro ao buscar menu: ' + error.message);
  }
}

async function respostadeMenuID(id) {
  try {
    const menu = await Menu.findByPk(id);
    if (!menu) {
      throw new Error('Menu não encontrado.');
    }
    var resposta = menu.descricao+"\n";
    for(var i=0;i<menu.opcoes.length;i++)
    {
        resposta = resposta+"\n"+menu.opcoes[i].id_opcao+" - "+menu.opcoes[i].descricao;
    }
    return resposta;
  } catch (error) {
    throw new Error('Erro ao buscar menu: ' + error.message);
  }
}
async function tamanhodoMenu(id) {
  try {
    const menu = await Menu.findByPk(id);
    if (!menu) {
      throw new Error('Menu não encontrado.');
    }
    var resposta = menu.opcoes.length;
    return resposta;
  } catch (error) {
    throw new Error('Erro ao buscar menu: ' + error.message);
  }
}




async function criarMenu(menuData) {
  try {
    const menu = await Menu.create(menuData);
    return menu;
  } catch (error) {
    throw new Error('Erro ao criar menu: ' + error.message);
  }
}

async function editarMenu(id, menuData) {
  try {
    const menu = await Menu.findByPk(id);
    if (!menu) {
      throw new Error('Menu não encontrado.');
    }
    Object.assign(menu, menuData);
    await menu.save();
    return 'Menu atualizado com sucesso.';
  } catch (error) {
    throw new Error('Erro ao editar menu: ' + error.message);
  }
}

async function excluirMenu(id) {
  try {
    const menu = await Menu.findByPk(id);
    if (!menu) {
      throw new Error('Menu não encontrado.');
    }
    await menu.destroy();
    return 'Menu excluído com sucesso.';
  } catch (error) {
    throw new Error('Erro ao excluir menu: ' + error.message);
  }
}

async function buscarIdOpcaoPorNumero(menuId, numeroOpcao) {
    try {
      const menu = await Menu.findByPk(menuId);
      if (!menu) {
        throw new Error('Menu não encontrado.');
      }
  
      const opcoes = menu.opcoes || [];
      if (numeroOpcao < 1 || numeroOpcao > opcoes.length) {
        throw new Error('Opção não encontrada.');
      }
  
      const idOpcao = opcoes[numeroOpcao - 1].id_opcao;
      return idOpcao;
    } catch (error) {
      throw new Error('Erro ao buscar id da opção: ' + error.message);
    }
  }

module.exports = {
  buscarMenus,
  buscarIdOpcaoPorNumero,
  buscarMenuPorId,
  criarMenu,
  editarMenu,
  excluirMenu,
  respostadeMenuID,
  tamanhodoMenu
};
