const http = require('http')

// Criando o servidor
const server = http.createServer((req,res) => {
    res.end('<h1>Atendendo a requisição</h1>')
})

// Subindo o servidor
server.listen(3000,()=>{
    console.log('Servidor rodando na porta 3000')
})



 