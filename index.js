const customExpress = require('./src/config/customExpress');
const connection = require('./src/infraestrutura/connection');
const Tabelas = require('./src/infraestrutura/tabelas');

connection.connect((err) => {
  if (err) {
    console.log(err);
    process.exit(1);
  } else {
    console.log('MySQL connected...');

    Tabelas.init(connection);
    const app = customExpress();

    app.listen(3000, () => {
      console.log('Servidor rodando na porta 3000');
    });
  }
});

