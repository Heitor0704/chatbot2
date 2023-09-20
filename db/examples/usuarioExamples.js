const userController = require("../controllers/usuarioController");

async function removerUsuarios(){
    await userController.excluirTodosUsuarios();
}

removerUsuarios();