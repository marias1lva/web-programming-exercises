import { catalogo, buscarItemPorId, filtrarItens } from "../models/catalogoModel.js";

export const getInfo = (req, res) => {
  res.status(200).json({
    nome: "UniFlix API",
    versao: "1.0.0",
    descricao: "API do catálogo digital da Univali",
    endpoints: [
      "GET /catalogo - Lista todos os itens",
      "GET /item/:id - Busca item por ID",
      "GET /ano/:ano - Busca itens por ano específico",
      "GET /item/:inicio/:fim - Busca itens entre dois anos",
      "GET /genero/:genero - Busca itens por gênero"
    ]
  });
};

export const getCatalogo = (req, res) => {
  res.status(200).json({
    total: catalogo.length,
    itens: catalogo
  });
};

export const getItemById = (req, res) => {
  const item = buscarItemPorId(req.params.id);
  if(item){
    res.status(200).json(item);
  }else{
    res.status(404).json({
      erro: "Item não encontrado",
      id: req.params.id
    });
  }
};

export const getItensByAno = (req, res) => {
  const itens = filtrarItens({ ano: req.params.ano });
  res.status(200).json({
    ano: Number(req.params.ano),
    total: itens.length,
    itens
  });
};

export const getItensByIntervalo = (req, res) => {
  const { inicio, fim } = req.params;
  const itens = filtrarItens({ anoInicio: inicio, anoFim: fim });
  res.status(200).json({
    intervalo: `${inicio}-${fim}`,
    total: itens.length,
    itens
  });
};

export const getItensByGenero = (req, res) => {
  const itens = filtrarItens({ genero: req.params.genero });
  res.status(200).json({
    genero: req.params.genero,
    total: itens.length,
    itens
  });
};

export const getFilmes = (req, res) => {
  const filmes = filtrarItens({ tipo: "filme" });
  res.status(200).json({
    total: filmes.length,
    filmes
  });
};

export const getSeries = (req, res) => {
  const series = filtrarItens({ tipo: "serie" });
  res.status(200).json({
    total: series.length,
    series
  });
};
