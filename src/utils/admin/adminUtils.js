const adminConstants = require("./adminConstants");
const axios = require("axios");

async function requestsSheets(){
    var dados;
    await axios.get(adminConstants.GOOGLE_SCRIPT_ENDPOINT+adminConstants.SERIAL)
      .then(response => {
      if(response.data!="")
      {
        dados = JSON.parse(response.data);
      }
    })
    .then(response => {
      if(dados!=null)
      {
        return dados;
      }
    })  
}

module.exports = {
    requestsSheets,
}