const mongoose = require('mongoose');

const livroSchema = new mongoose.Schema({
  titulo: { type: String, required: true },
  autor: { type: String, required: true },
  genero: String,
  anoPublicacao: Number,
  editora: String,
  sinopse: String,
  capa: String // caminho da imagem
});

module.exports = mongoose.model('Livro', livroSchema);
