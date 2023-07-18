const mongoose = require('mongoose')

mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost:27017/users",{
    useNewUrlParser: true,
    useUnifiedTopology: true,

}) .then(() => {
    console.log('Conectado ao MongoDB' );
  })
  .catch(err => {
    console.error('Erro ao conectar ao MongoDB:', err);
});





module.exports