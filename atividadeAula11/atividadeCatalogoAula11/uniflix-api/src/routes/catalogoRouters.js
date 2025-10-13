import express from "express";
import {
  getInfo,
  getCatalogo,
  getItemById,
  getItensByAno,
  getItensByIntervalo,
  getItensByGenero,
  getFilmes,
  getSeries
} from "../controllers/catalogoController.js";

const router = express.Router();

router.get("/", getInfo);
router.get("/catalogo", getCatalogo);
router.get("/item/:id", getItemById);
router.get("/ano/:ano", getItensByAno);
router.get("/item/:inicio/:fim", getItensByIntervalo);
router.get("/genero/:genero", getItensByGenero);
router.get("/filmes", getFilmes);
router.get("/series", getSeries);

export default router;
