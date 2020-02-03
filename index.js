// Importando
const app = require('./config/custom-express')

// Subindo o servidor
app.listen(3000, ()=>{
    // Aparecerá quando o servidor for iniciado, ou seja, no terminal 
    console.log('Servidor rodando na porta 3000 - express')
}) 

