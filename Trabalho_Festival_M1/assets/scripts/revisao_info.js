document.addEventListener('DOMContentLoaded', () => {

    const carregarRevisao = () => {
        document.getElementById('evento-nome').textContent = sessionStorage.getItem('nomeEvento') || 'Nome do Evento Indisponível';
        document.getElementById('ingresso-setor').textContent = sessionStorage.getItem('setorNome') || 'N/A';
        document.getElementById('ingresso-quantidade').textContent = sessionStorage.getItem('quantidade') || 'N/A';
        document.getElementById('ingresso-assentos').textContent = sessionStorage.getItem('assentos') || 'Não se aplica';
        document.getElementById('ingresso-total').textContent = sessionStorage.getItem('totalIngressos') || 'N/A';

        const servicos = sessionStorage.getItem('servicosAdicionais');
        document.getElementById('servicos-lista').textContent = (servicos && servicos.length > 0) ? servicos : 'Nenhum serviço adicional contratado.';

        document.getElementById('pagamento-metodo').textContent = sessionStorage.getItem('metodoPagamento') || 'N/A';
    };

    const inicioBtn = document.getElementById('inicioBtn');
    inicioBtn.addEventListener('click', () => {
        sessionStorage.clear();
        window.location.href = 'eventos.html';
    });

    carregarRevisao();
});