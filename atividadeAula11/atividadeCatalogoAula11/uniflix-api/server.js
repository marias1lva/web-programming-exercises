import express from "express";
import catalogoRoutes from "./src/routes/catalogoRouters";

const app = express();
app.use(express.json());

app.use("/", catalogoRoutes);

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor UniFlix rodando na porta ${PORT}...`);
});