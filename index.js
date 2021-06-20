const customExpress = require('./config/customExpress')
const con = require('./db/conexao')
const Tabelas = require('./db/Tabelas')

con.connect(error => {
    if (error) {
        console.log(error)
    } else {
        console.log("Conectado com Sucesso!")

        Tabelas.init(con)
        const app = customExpress()
        app.listen(3000, () => console.log('Servidor rodando na porta 3000...'))
    }
})