const express = require("express")

const exphbs = require("express-handlebars")

const mysql = require("mysql2")

const app = express()

app.engine('handlebars', exphbs.engine())

app.set('view engine', 'handlebars')

app.use(express.static('public'))

//CONVERTER DADOS DO FORMULÁRIO EM OBJETO JAVASCRIPT
app.use(express.urlencoded({
    extended:true
}))

app.use(express.json())


//ROTAS

app.post('/criar', (requisicao , resposta) =>{
    const descricao = requisicao.body.descricao
    const completa = 0

    const sql = `
        INSERT INTO tarefas(descricao, completa)
        VALUES('${descricao}', '${completa}')
    `
    conexao.query(sql, (erro) =>{
        if (erro){
            return console.log(erro)
        }

        resposta.redirect('/')
    })
})  

app.get('/', (requisicao, resposta) =>{
    resposta.render('home')
})


const conexao = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "101296",
    database: "todoapp",
    port: 3306 //mudar 3307 no lab
})

conexao.connect((erro)=>{
    if(erro){
        return console.log(erro)
    }
    console.log("Estou conectado ao Mysql")
    app.listen(3000, () =>{
        console.log('Servidor rodando na porta 3000')
    })
    
    
})