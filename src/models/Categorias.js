const conexao = require('../../src/config/conexao-db')
const baseQuery = require('./baseQuery')

class Categoria{

    lista(){
        return baseQuery(' SELECT * FROM categorias ')
    }

    inserir(categoria){
        return baseQuery( 'INSERT INTO categorias SET ?', categoria)   
    }
    
    buscarPorId(id){
        return baseQuery('SELECT * FROM categorias WHERE email = ?', email)        
    }

    atualiza(categoria){
        return baseQuery( 'UPDATE categorias SET ? WHERE id = ?', [categoria, categoria.id])
    }

    delete(id){
        return baseQuery(' DELETE FROM categorias WHERE id = ? ', id)
    }
}

module.exports = Categoria