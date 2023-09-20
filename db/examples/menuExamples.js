const menuController = require("../controllers/menuController");

const menuData = {
    descricao:"Bem vindo ao menu pessoal do seu atendente virtual. Nele você será capaz de editar as informações sobre os serviços e profissionais, além de consultar sua agenda e ver seu faturamento.\n\nDigite um dos números abaixo para continuar:",
    opcoes:[
    {descricao: "✂️ Serviços",id_opcao: 1},
    {descricao: "💇Profissionais",id_opcao: 2},
    {descricao: "📔 Agenda",id_opcao: 3},
    {descricao: "💸Faturamento",id_opcao: 4},
    {descricao: "⚙️Configurações",id_opcao: 5},
    {descricao: "🎧Suporte",id_opcao: 6},
    ] 
}

async function CadastraMenu(){
    const novoMenu = await menuController.criarMenu(menuData);
    console.log(novoMenu);
}

async function ExibirMenus(){
    const menu = await menuController.buscarMenuPorId(1);
    var resposta = menu.descricao;
    for(var i=0;i<menu.opcoes.length;i++)
    {
        resposta = resposta+"\n"+menu.opcoes[i].id_opcao+" - "+menu.opcoes[i].descricao;
    }
    console.log(resposta);

}

async function EditarMenu(){
    await menuController.editarMenu(2,menuData);
}

async function ExcluirMenu(){
    await menuController.excluirMenu(1);
}



//EditarMenu();
//CadastraMenu();
//ExibirMenus();
//ExcluirMenu()
