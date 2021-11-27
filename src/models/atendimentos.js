const moment = require('moment');
const connection = require('../infraestrutura/connection');

class Atendimento {
  adicionar(atendimento, res) {
    const dataCriacao = moment().format('YYYY-MM-DD HH:mm:ss');
    const data = moment(atendimento.data, 'DD/MM/YYYY').format('YYYY-MM-DD HH:mm:ss');

    const dataEhValida = moment(data).isSameOrAfter(dataCriacao);
    const clienteEhValido = atendimento.cliente && atendimento.cliente.trim().length > 0;

    const validacoes = [
      {
        nome: 'data',
        valido: dataEhValida,
        mensagem: 'Data inválida'
      },
      {
        nome: 'cliente',
        valido: clienteEhValido,
        mensagem: 'Cliente inválido'
      }
    ];

    const erros = validacoes.filter(campo => !campo.valido);
    const existemErros = erros.length > 0;

    if (existemErros) {
      res.status(400).json(erros);
      return;
    }

    const atendimentoDatado = { ...atendimento, dataCriacao, data };

    const sql = 'INSERT INTO Atendimentos SET ?'

    connection.query(sql, atendimentoDatado, (err, resultado) => {
      if (err) {
        res.status(400).json(err);
      } else {
        res.status(201).json(resultado);
      }
    })
  }

  listar(res) {
    const sql = 'SELECT * FROM Atendimentos'

    connection.query(sql, (err, resultado) => {
      if (err) {
        res.status(400).json(err);
      } else {
        res.status(200).json(resultado);
      }
    })
  }

  buscarPorId(id, res) {
    const sql = `SELECT * FROM Atendimentos WHERE id = ${id}`

    connection.query(sql, id, (err, resultados) => {
      const atendimento = resultados[0];
      if (err) {
        res.status(400).json(err);
      } else {
        res.status(200).json(atendimento);
      }
    })
  }

  alterar(id, valores, res) {
    if(valores.data){
      valores.data = moment(valores.data, 'DD/MM/YYYY').format('YYYY-MM-DD HH:mm:ss');
    }

    const sql = `UPDATE Atendimentos SET ? WHERE id = ?`

    connection.query(sql, [valores, id], (err, resultado) => {
      if (err) {
        res.status(400).json(err);
      } else {
        res.status(200).json(resultado);
      }
    });
  }

  deletar(id, res) {
    const sql = `DELETE FROM Atendimentos WHERE id = ${id}`

    connection.query(sql, id, (err, resultado) => {
      if (err) {
        res.status(400).json(err);
      } else {
        res.status(200).send('Atendimento deletado com sucesso!');
      }
    });
  }
}

module.exports = new Atendimento();