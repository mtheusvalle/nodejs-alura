const fs = require('fs');
const path = require('path')

module.exports = (caminho, nomeArquivo, callbackImagemCriada) => {

  const tiposPermitidos = ['png', 'jpeg', 'jpg'];
  const tipo = path.extname(caminho);
  const tipoEhValido = tiposPermitidos.indexOf(tipo.substring(1)) !== -1;

  if (tipoEhValido) {
    const caminhoArquivo = `./src/assets/images/${nomeArquivo}${tipo}`;

    fs.createReadStream(caminho)
      .pipe(fs.createWriteStream(caminhoArquivo))
      .on('finish', () => callbackImagemCriada(false, caminhoArquivo));
  } else {
    const erro = "Tipo é inválido";
    console.log('Tipo de arquivo é inválido!')
    callbackImagemCriada(erro);
  }
}
