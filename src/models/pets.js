const connection = require('../infraestrutura/connection');
const uploadDeArquivos = require('../arquivos/uploadDeArquivos');

class Pet {
  adicionar(pet, res) {
    const query = 'INSERT INTO Pets SET ?'

    uploadDeArquivos(pet.imagem, pet.nome, (erro, caminhoArquivo) => {
      if (erro) {
        return res.status(400).json({ erro });
      } else {
        const novoPet = { nome: pet.nome, imagem: caminhoArquivo }
        connection.query(query, novoPet, (err) => {
          if (err) {
            console.log(err);
            res.status(400).json(err);
          } else {
            res.status(200).json(novoPet);
          }
        })
      }
    })
  }
}

module.exports = new Pet();