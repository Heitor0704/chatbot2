const express = require('express');
const axios = require('axios');
const app = express();
const adminConstants = require("../utils/admin/adminConstants");

// Define uma rota de exemplo
app.get('/returnSheets', (req, res) => {
  var dados;
  axios.get(adminConstants.GOOGLE_SCRIPT_ENDPOINT+adminConstants.SERIAL)
      .then(response => {
      if(response.data!="")
      {
        dados = JSON.parse(response.data);
      }
    })
    .then(response => {
      if(dados==null)
      {
        dados = "Não existem dados de requisição!"
      }
      res.send(dados);    
    })  
});

// Define a porta em que o servidor irá escutar
const port = adminConstants.PORTA;

app.listen(port, () => {
  console.log(`Servidor Express está ouvindo na porta ${port}`);
});
