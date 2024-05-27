const { Sequelize } = require('sequelize')

const sequelize = new Sequelize('ideias_db', 'regisbernascone', 'Turbos620', {
    host: 'dadosappideiasbernascone.mysql.database.azure.com',
    dialect: 'mysql'
})

try{
    sequelize.authenticate()
    console.log('Connectado ao servidor MySQL!')
}catch(error){
    console.error(`Error MySQL: ${error}`)
}

module.exports = sequelize