const moment = require('moment')
const con = require('../db/conexao')

class Atendimentos {
    adiciona(atendimento, res) {
        const dataCriacao = new Date()
        const data = moment(atendimento.data, "DD/MM/YYYY").format('YYYY-MM-DD HH:MM:SS')

        const dataEhValida = moment(data).isSameOrAfter(dataCriacao)
        const clienteEhValido = atendimento.cliente.length >= 3

        const validacoes = [{
                nome: 'data',
                valido: dataEhValida,
                mensagem: 'Data Invalida - Deve ser maior ou igual a data atual'
            },
            {
                nome: 'cliente',
                valido: clienteEhValido,
                mensagem: 'Cliente deve ter pelo menos 3 caracteres'
            }
        ]

        const erros = validacoes.filter(campo => !campo.valido)
        const existemErros = erros.length

        if (existemErros) {
            res.status(400).json(erros)
        } else {
            const atendimentoDatado = {...atendimento, dataCriacao, data }

            const sql = 'INSERT INTO  Atendimentos SET ?'

            con.query(sql, atendimentoDatado, (erro, resultado) => {
                if (erro) {
                    res.status(400).json(erro)
                } else {
                    res.status(201).json({ atendimentoDatado })
                }
            })
        }
    }

    lista(res) {
        const sql = 'SELECT * FROM Atendimentos'

        con.query(sql, (erro, resultado) => {
            if (erro) {
                res.status(400).json(erro)
            } else {
                res.status(200).json(resultado)
            }
        })
    }

    buscaPorId(id, res) {
        const sql = `SELECT * FROM Atendimentos WHERE id = ${id}`

        con.query(sql, (erro, resultado) => {
            if (erro) {
                res.status(400).json(erro)
            } else {
                res.status(200).json(resultado[0])
            }
        })

    }

    altera(id, valores, res) {
        const sql = 'UPDATE Atendimentos SET ? WHERE id = ?'

        if (valores.data) {
            valores.data = moment(valores.data, "DD/MM/YYYY").format('YYYY-MM-DD HH:MM:SS')
        }

        con.query(sql, [valores, id], (erro, resultado) => {
            if (erro) {
                res.status(400).json(erro)
            } else {
                res.status(200).json({...valores, id })
            }
        })
    }

    deleta(id, res) {
        const sql = 'DELETE FROM Atendimentos WHERE id = ?'

        con.query(sql, id, (erro, resultado) => {
            if (erro) {
                res.status(400).json(erro)
            } else {
                res.status(200).json({ id })
            }
        })
    }
}

module.exports = new Atendimentos