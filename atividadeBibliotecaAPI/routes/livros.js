const express = require('express');
const router = express.Router();
const Livro = require('../models/Livro');
const multer = require('multer');
const fs = require('fs');
const path = require('path');

// Configuração do Multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname)
});
const upload = multer({ storage });

// GET todos os livros
router.get('/', async (req, res) => {
  try {
    const livros = await Livro.find();
    res.json(livros);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET livro por ID
router.get('/:id', async (req, res) => {
  try {
    const livro = await Livro.findById(req.params.id);
    if (!livro) return res.status(404).json({ message: 'Livro não encontrado' });
    res.json(livro);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST criar livro com upload de capa
router.post('/', upload.single('capa'), async (req, res) => {
  try {
    const novoLivro = new Livro({
      titulo: req.body.titulo,
      autor: req.body.autor,
      genero: req.body.genero,
      anoPublicacao: req.body.anoPublicacao,
      editora: req.body.editora,
      sinopse: req.body.sinopse,
      capa: req.file ? req.file.filename : null
    });
    const livroSalvo = await novoLivro.save();
    res.status(201).json(livroSalvo);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// PUT atualizar livro
router.put('/:id', upload.single('capa'), async (req, res) => {
  try {
    const livro = await Livro.findById(req.params.id);
    if (!livro) return res.status(404).json({ message: 'Livro não encontrado' });

    livro.titulo = req.body.titulo || livro.titulo;
    livro.autor = req.body.autor || livro.autor;
    livro.genero = req.body.genero || livro.genero;
    livro.anoPublicacao = req.body.anoPublicacao || livro.anoPublicacao;
    livro.editora = req.body.editora || livro.editora;
    livro.sinopse = req.body.sinopse || livro.sinopse;

    if (req.file) {
      if (livro.capa) fs.unlinkSync(path.join(__dirname, '../uploads', livro.capa));
      livro.capa = req.file.filename;
    }

    const livroAtualizado = await livro.save();
    res.json(livroAtualizado);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE livro
router.delete('/:id', async (req, res) => {
  try {
    const livro = await Livro.findById(req.params.id);
    if (!livro) return res.status(404).json({ message: 'Livro não encontrado' });

    if (livro.capa) fs.unlinkSync(path.join(__dirname, '../uploads', livro.capa));
    await livro.deleteOne();
    res.json({ message: 'Livro removido com sucesso' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
