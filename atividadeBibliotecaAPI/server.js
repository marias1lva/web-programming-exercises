require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const livrosRoutes = require('./routes/livros');
const path = require('path');

const app = express();

mongoose.connect(process.env.STRING_CONEXAO)
  .then(() => console.log("MongoDB conectado"))
  .catch(err => console.log(err));

app.use(cors());
app.use(bodyParser.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use('/livros', livrosRoutes);

const PORT = 3000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
