// Importando dependencia
const mysql = require('mysql')

// Passando os paramentros para a conexao e criando
const conexao = mysql.createConnection({
    host: '52.90.78.7',
    port: 3306,
    user: 'lino',
    password: 'bcd127',
    database: 'BRABANK'
})

// Exportando a conexao, para conseguir chamar em outros arquivos
module.exports = conexao