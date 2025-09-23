const setores = [
    { nome: 'Pista Comum', preco: 200, tipo: 'livre', capacidade: 0 },
    { nome: 'Pista Premium', preco: 400, tipo: 'livre', capacidade: 0 },
    { nome: 'Mezanino', preco: 300, tipo: 'assentos', capacidade: 80 },
    { nome: 'Camarote', preco: 600, tipo: 'assentos', capacidade: 120 },
];

const cardsContainer = document.getElementById('cards-setores');
const mapaSection = document.getElementById('mapa');
const assentosContainer = document.getElementById('grade-assentos');
const contadorIngressos = document.getElementById('contador-ingressos');
const comprarBtn = document.getElementById('comprar-btn');
const voltarBtn = document.getElementById('voltar-btn');
const heroBtn = document.getElementById('cta-button');

const compraResumoSection = document.getElementById('compra-resumo');
const setorNomeResumo = document.getElementById('setor-nome-resumo');
const quantidadeResumo = document.getElementById('quantidade-resumo');
const assentosResumo = document.getElementById('assentos-resumo');
const totalResumo = document.getElementById('total-resumo');
const finalizarCompraBtn = document.getElementById('finalizar-compra-btn');
const voltarResumoBtn = document.getElementById('voltar-resumo-btn');

let assentosOcupados = new Set();
let assentosSelecionados = new Set();
let setorAtual = null;
let quantidadePista = 0;

function gerarAssentosOcupados(capacidade){
    const ocupados = new Set();
    const numeroOcupados = Math.floor(Math.random() * (capacidade * 0.4));
    while(ocupados.size < numeroOcupados){
        ocupados.add(Math.floor(Math.random() * capacidade) + 1);
    }
    return ocupados;
}

function renderizarSetores(){
    cardsContainer.innerHTML = '';
    mapaSection.style.display = 'none';
    compraResumoSection.style.display = 'none';
    document.getElementById('setores').style.display = 'block';

    setores.forEach(setor => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.innerHTML = `
            <h3>${setor.nome}</h3>
            <p class="preco">R$${setor.preco.toFixed(2).replace('.', ',')}</p>
        `;

        card.addEventListener('click', () => {
            selecionarSetor(setor);
        });

        cardsContainer.appendChild(card);
    });
}

function selecionarSetor(setor){
    setorAtual = setor;
    document.getElementById('setores').style.display = 'none';

    if(setor.tipo === 'assentos'){
        renderizarMapaAssentos(setor.capacidade);
    }else{
        renderizarSelecaoPista(setor);
    }
}

function renderizarSelecaoPista(setor){
    assentosContainer.style.display = 'flex';
    assentosContainer.innerHTML = `
        <div class="selecao-pista">
            <h3>Selecione a quantidade de ingressos</h3>
            <div class="input-group">
                <input type="number" id="quantidade-pista" class="input-pista" value="1" min="1" max="10">
                <button id="pista-comprar-btn" class="pista-comprar-btn">Comprar</button>
            </div>
        </div>
    `;
    
    mapaSection.style.display = 'block';
    mapaSection.querySelector('.legenda').style.display = 'none';
    mapaSection.querySelector('.info-compra').style.display = 'none';

    document.getElementById('pista-comprar-btn').addEventListener('click', () => {
        quantidadePista = parseInt(document.getElementById('quantidade-pista').value);
        if(quantidadePista > 0){
            exibirResumo(setor, quantidadePista);
        }else{
            alert('Por favor, selecione uma quantidade válida.');
        }
    });
}

function renderizarMapaAssentos(capacidade){
    assentosContainer.innerHTML = '';
    assentosOcupados = gerarAssentosOcupados(capacidade);
    assentosSelecionados.clear();
    atualizarContador();
    mapaSection.style.display = 'block';
    
    assentosContainer.style.display = 'grid';

    mapaSection.querySelector('.legenda').style.display = 'flex';
    mapaSection.querySelector('.info-compra').style.display = 'block';
    
    for(let i = 1; i <= capacidade; i++){
        const assento = document.createElement('div');
        assento.classList.add('assento');
        assento.textContent = i;
        assento.dataset.id = i;

        if(assentosOcupados.has(i)){
            assento.classList.add('ocupado');
        }else{
            assento.classList.add('livre');
            assento.addEventListener('click', toggleSelecaoAssento);
        }

        assentosContainer.appendChild(assento);
    }
}

function toggleSelecaoAssento(event){
    const assento = event.target;
    const assentoId = parseInt(assento.dataset.id);

    if(assentosSelecionados.has(assentoId)){
        assentosSelecionados.delete(assentoId);
        assento.classList.remove('selecionado');
        assento.classList.add('livre'); 
    }else{
        assentosSelecionados.add(assentoId);
        assento.classList.remove('livre');
        assento.classList.add('selecionado'); 
    }
    atualizarContador();
}


function atualizarContador(){
    contadorIngressos.textContent = assentosSelecionados.size;
    comprarBtn.disabled = assentosSelecionados.size === 0;
}

function exibirResumo(setor, quantidade, assentos = []){
    mapaSection.style.display = 'none';
    document.getElementById('setores').style.display = 'none';
    compraResumoSection.style.display = 'block';

    setorNomeResumo.textContent = setor.nome;
    quantidadeResumo.textContent = quantidade;
    
    const assentosTexto = assentos.length > 0 ? assentos.sort((a,b) => a-b).join(', ') : 'Não se aplica';
    assentosResumo.textContent = assentosTexto;

    const total = quantidade * setor.preco;
    totalResumo.textContent = `R$ ${total.toFixed(2)}`;
}

comprarBtn.addEventListener('click', () => {
    if(assentosSelecionados.size > 0){
        exibirResumo(setorAtual, assentosSelecionados.size, [...assentosSelecionados]);
    }else{
        alert('Por favor, selecione pelo menos um assento.');
    }
});

voltarBtn.addEventListener('click', () => {
    renderizarSetores();
});

finalizarCompraBtn.addEventListener('click', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const nomeEvento = urlParams.get('evento');

    sessionStorage.setItem('nomeEvento', nomeEvento || 'Evento não especificado');
    sessionStorage.setItem('setorNome', setorNomeResumo.textContent);
    sessionStorage.setItem('quantidade', quantidadeResumo.textContent);
    sessionStorage.setItem('assentos', assentosResumo.textContent);
    sessionStorage.setItem('totalIngressos', totalResumo.textContent);

    window.location.href = 'servicos_adicional.html';
});

voltarResumoBtn.addEventListener('click', () => {
    renderizarSetores();
});

heroBtn.addEventListener('click', () => {
    window.location.href = '#setores';
});

document.addEventListener('DOMContentLoaded', renderizarSetores);