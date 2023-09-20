const ownerController = require("../../../../db/controllers/ownerController");

async function CreateNulledOwner(message){
    const ownerData = {
    "from":message.remoteJid,
    "cont": -1,
    "mensagem":"",
    "initialize":false
};
    const ownerCriado = await ownerController.criarOwner(ownerData);
    return ownerCriado;
}

module.exports = {
    CreateNulledOwner,
}

