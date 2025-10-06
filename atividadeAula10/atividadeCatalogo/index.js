import express from "express";
const app = express();
app.use(express.json());

const catalogo = [
    {
        id: 1,
        titulo: "Donnie Darko",
        ano: 2001,
        genero: "Ficção Científica",
        imagem: "https://image.tmdb.org/t/p/w500/donnie_darko.jpg",
        resumo: "Após escapar de um acidente bizarro, um jovem perturbado começa a ter visões de um coelho gigante que o leva a cometer atos misteriosos.",
        tipo: "filme"
    },
    {
        id: 2,
        titulo: "Bullet Train",
        ano: 2022,
        genero: "Ação",
        imagem: "https://image.tmdb.org/t/p/w500/bullet_train.jpg",
        resumo: "Cinco assassinos descobrem que suas missões estão interligadas durante uma viagem de trem-bala no Japão.",
        tipo: "filme"
    },
    {
        id: 3,
        titulo: "O Grande Hotel Budapeste",
        ano: 2014,
        genero: "Comédia",
        imagem: "https://image.tmdb.org/t/p/w500/grande_hotel_budapeste.jpg",
        resumo: "Um lendário concierge e seu jovem aprendiz se envolvem em uma trama de assassinato e herança de uma fortuna familiar.",
        tipo: "filme"
    },
    {
        id: 4,
        titulo: "Inception",
        ano: 2010,
        genero: "Ficção Científica",
        imagem: "https://image.tmdb.org/t/p/w500/inception.jpg",
        resumo: "Um ladrão especializado em extrair segredos do subconsciente é contratado para plantar uma ideia na mente de um empresário.",
        tipo: "filme"
    },
    {
        id: 5,
        titulo: "Parasite",
        ano: 2019,
        genero: "Thriller",
        imagem: "https://image.tmdb.org/t/p/w500/parasite.jpg",
        resumo: "Uma família pobre se infiltra na vida de uma família rica, gerando consequências inesperadas e tensões sociais.",
        tipo: "filme"
    },
    {
        id: 6,
        titulo: "Modern Family",
        ano: 2009,
        genero: "Comédia",
        imagem: "https://image.tmdb.org/t/p/w500/modern_family.jpg",
        resumo: "Um mockumentário mostrando o cotidiano de uma família moderna com situações engraçadas e emocionantes.",
        tipo: "serie"
    },
    {
        id: 7,
        titulo: "Alice in Borderland",
        ano: 2020,
        genero: "Ficção Científica",
        imagem: "https://image.tmdb.org/t/p/w500/alice_in_borderland.jpg",
        resumo: "Um grupo de amigos é transportado para uma versão alternativa e perigosa de Tóquio, onde devem competir em jogos letais para sobreviver.",
        tipo: "serie"
    },
    {
        id: 8,
        titulo: "The Office",
        ano: 2005,
        genero: "Comédia",
        imagem: "https://image.tmdb.org/t/p/w500/the_office.jpg",
        resumo: "Mockumentário sobre funcionários de uma empresa de papel em Scranton, Pennsylvania, mostrando situações cômicas do dia a dia.",
        tipo: "serie"
    },
    {
        id: 9,
        titulo: "Brooklyn Nine-Nine",
        ano: 2013,
        genero: "Comédia",
        imagem: "https://image.tmdb.org/t/p/w500/brooklyn_nine_nine.jpg",
        resumo: "As aventuras de uma delegacia de polícia de Nova York, focando nas situações engraçadas e dinâmicas entre os detetives.",
        tipo: "serie"
    },
    {
        id: 10,
        titulo: "Friends",
        ano: 1994,
        genero: "Comédia",
        imagem: "https://image.tmdb.org/t/p/w500/friends.jpg",
        resumo: "Seis amigos navegam pela vida, amor e carreira em Nova York nos anos 90, enfrentando desafios e momentos hilários juntos.",
        tipo: "serie"
    }
];

function buscarItemPorId(id){
    return catalogo.find(item => item.id === Number(id));
}

function filtrarItens(filtros){
    return catalogo.filter(item => {
        let corresponde = true;
        if(filtros.ano){
            corresponde = corresponde && item.ano === Number(filtros.ano);
        }    
        if(filtros.anoInicio && filtros.anoFim){
            corresponde = corresponde && 
                item.ano >= Number(filtros.anoInicio) && 
                item.ano <= Number(filtros.anoFim);
        } 
        if(filtros.genero){
            corresponde = corresponde && 
                item.genero.toLowerCase().includes(filtros.genero.toLowerCase());
        }
        if(filtros.tipo){
            corresponde = corresponde && item.tipo === filtros.tipo;
        }
        return corresponde;
    });
}

app.listen(3000, () => {
    console.log("Servidor UniFlix escutando na porta 3000...");
});

app.get("/", (req, res) => {
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
});

app.get("/catalogo", (req, res) => {
    res.status(200).json({
        total: catalogo.length,
        itens: catalogo
    });
});

app.get("/item/:id", (req, res) => {
    const item = buscarItemPorId(req.params.id);
    if(item){
        res.status(200).json(item);
    }else{
        res.status(404).json({
            erro: "Item não encontrado",
            id: req.params.id
        });
    }
});

app.get("/ano/:ano", (req, res) => {
    const itens = filtrarItens({ ano: req.params.ano });
    res.status(200).json({
        ano: Number(req.params.ano),
        total: itens.length,
        itens: itens
    });
});

app.get("/item/:inicio/:fim", (req, res) => {
    const { inicio, fim } = req.params;
    const itens = filtrarItens({ anoInicio: inicio, anoFim: fim });
    res.status(200).json({
        intervalo: `${inicio}-${fim}`,
        total: itens.length,
        itens: itens
    });
});

app.get("/genero/:genero", (req, res) => {
    const itens = filtrarItens({ genero: req.params.genero });
    res.status(200).json({
        genero: req.params.genero,
        total: itens.length,
        itens: itens
    });
});

app.get("/filmes", (req, res) => {
    const filmes = filtrarItens({ tipo: "filme" });
    res.status(200).json({
        total: filmes.length,
        filmes: filmes
    });
});

app.get("/series", (req, res) => {
    const series = filtrarItens({ tipo: "serie" });
    res.status(200).json({
        total: series.length,
        series: series
    });
});
