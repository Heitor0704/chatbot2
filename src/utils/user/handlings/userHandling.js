const usuarioController = require("../../../../db/controllers/usuarioController")

async function CreateNulledUser(mensagem){
    const usuarioData = {
    "from":mensagem.remoteJid,
    "cont": -1,
    "nome":"",
    "mensagem":"",
    "telefone":mensagem.contact,
    "nservico":0,
    "nprofissional":0,
    "ndata":0,
    "data":"",
    "nhorario":0,
    "nconfirmado":0,
    "nagendamento":0,
    "servicos":"",
    "profissionais":"",
    "datas":"",
    "horarios":"",
    "agendamentos":"",
}
    const usuarioCriado = await usuarioController.criarUsuario(usuarioData);
    return usuarioCriado;
}

async function UpdateNullUser(mensagem,usuario)
{
    const usuarioData = {
        "from":mensagem.remoteJid,
        "cont": -1,
        "nome":"",
        "mensagem":"",
        "telefone":mensagem.contact,
        "nservico":0,
        "nprofissional":0,
        "ndata":0,
        "data":"",
        "nhorario":0,
        "nconfirmado":0,
        "nagendamento":0,
        "servicos":"",
        "profissionais":"",
        "datas":"",
        "horarios":"",
        "agendamentos":"",
    }
    await usuario.update(usuarioData);
}



async function HandlingUser(cont,usuario,mensagem){
    const usuarioData = {
        "from":mensagem.remoteJid,
        "cont": -1,
        "nome":"",
        "mensagem":"",
        "telefone":mensagem.contact,
        "nservico":0,
        "nprofissional":0,
        "ndata":0,
        "data":"",
        "nhorario":0,
        "nconfirmado":0,
        "nagendamento":0,
        "servicos":"",
        "profissionais":"",
        "datas":"",
        "horarios":"",
        "agendamentos":"",
    }
    if(cont==0)
    {
        usuarioData.cont = 0;
    }
    if(cont==1)
    {
        usuarioData.mensagem = usuario.nome;
        usuarioData.cont=1;
    }
    if(cont==2)
    {
        usuarioData.cont = 1;
        usuarioData.mensagem = usuario.nome;
    }
    if(cont==3)
    {
        usuarioData.nome = usuario.nome;
        usuarioData.cont = 3;
    }
    if(cont==4)
    {
        usuarioData.cont = 4;
        usuarioData.nome = usuario.nome;
        usuarioData.servicos = usuario.servicos;
        usuarioData.mensagem = usuario.nservico;
    }
    if(cont==5)
    {
        usuarioData.cont = 5;
        usuarioData.nome = usuario.nome;
        usuarioData.servicos = usuario.servicos;
        usuarioData.nservico = usuario.nservico;
        usuarioData.profissionais = usuario.profissionais;
        usuarioData.mensagem = usuario.nprofissional;
    }
    if(cont==6 || cont==7)
    {
        usuarioData.cont =5;
        usuarioData.nome = usuario.nome;
        usuarioData.servicos = usuario.servicos;
        usuarioData.nservico = usuario.nservico;
        usuarioData.profissionais = usuario.profissionais;
        usuarioData.mensagem = usuario.nprofissional;
    }
    if(cont==8)
    {
        usuarioData.cont = 8;
        usuarioData.nome = usuario.nome;
        usuarioData.servicos = usuario.servicos;
        usuarioData.nservico = usuario.nservico;
        usuarioData.profissionais = usuario.profissionais;
        usuarioData.nprofissional = usuario.nprofissional;
        usuarioData.datas = usuario.datas;
        usuarioData.ndata = usuario.ndata;
        usuarioData.data = usuario.data;
        usuarioData.horarios = usuario.horarios;
        usuarioData.mensagem = usuario.nhorario;
    }
    if(cont==9)
    {
        usuarioData.cont = 9;
        usuarioData.nome = usuario.nome;
        usuarioData.servicos = usuario.servicos;
        usuarioData.nservico = usuario.nservico;
        usuarioData.profissionais = usuario.profissionais;
        usuarioData.nprofissional = usuario.nprofissional;
        usuarioData.datas = usuario.datas;
        usuarioData.ndata = usuario.ndata;
        usuarioData.data = usuario.data;
        usuarioData.horarios = usuario.horarios;
        usuarioData.nhorario = usuario.nhorario;
        usuarioData.mensagem = usuario.nconfirmado;
    }
    if(cont==19)
    {
        usuarioData.mensagem = usuario.nome;
        usuarioData.cont = 1;
    }
    //Tratamento caso usuarioData saia com valor inferior a 0
    if(usuarioData.cont<0)
    {
        usuarioData.cont = 0;
    }
    await usuario.update(usuarioData);
}

module.exports = {
    CreateNulledUser,
    HandlingUser,
    UpdateNullUser,
}