import express from "express";
import 'dotenv/config';
import conectarAoBanco from "./src/config/dbConfig.js";
import getPostRoutes from "./src/routes/postRoutes.js";

const conexao = await conectarAoBanco(process.env.STRING_CONEXAO);

const app = express();
app.use(express.json());

getPostRoutes(app);

app.listen(3000, () => {
    console.log("Servidor escutando...");
});