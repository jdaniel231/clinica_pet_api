var mongoose = require('mongoose');
mongoose.Promise = global.Promise;

mongoose.connect('mongodb://localhost/clinicaPet', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
}
).then(() => console.log('Conexao com sucesso'))
  .catch((err) => console.error(err));
