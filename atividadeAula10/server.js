import express from "express";
const app = express();
app.use(express.json());

const posts = [
    { id: 1, descricao: "Neo um gato que gosta de frutas", imagem: "https://placecats.com/neo_banana/300/200" },
    { id: 2, descricao: "Millie & Neo dois gatos folgados", imagem: "https://placecats.com/millie_neo/500/500" },
    { id: 3, descricao: "Louie um gato brincalhão", imagem: "https://placecats.com/louie/300/200" },
];

function buscaPostPoriD(id){
  return posts.find( p => p.id === Number(id));
}

app.listen(3000, () => {
    console.log("Servidor escutando...");
});

/* app.get("/api", (req, res) => {
    res.status(200).send("Uma resposta a requisição GET HTTP...");
}); */

app.get("/posts", (req, res) => {
    res.status(200).json(posts);
});

app.get("/posts/:id", (req, res) => {
    res.status(200).json(buscaPostPoriD(req.params.id));
});

