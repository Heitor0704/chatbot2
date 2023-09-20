const Sequelize = require('sequelize');

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './db/database.sqlite'
  })

async function sincronizacao(){
  //Sincronizando BD
    const connected = await sequelize.sync();
}

//sincronizacao();
 
module.exports = sequelize;