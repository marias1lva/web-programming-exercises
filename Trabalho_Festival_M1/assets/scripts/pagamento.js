document.addEventListener('DOMContentLoaded', () => {

    const form = document.getElementById('formPagamento');
    const numCartaoInput = document.getElementById('numCartao');
    const nomeCartaoInput = document.getElementById('nomeCartao');
    const validadeInput = document.getElementById('validade');
    const cvvInput = document.getElementById('cvv');
    
    numCartaoInput.addEventListener('input', (e) => {
        let value = e.target.value.replace(/\D/g, ''); 
        value = value.replace(/(\d{4})(?=\d)/g, '$1 '); 
        e.target.value = value;
    });

    nomeCartaoInput.addEventListener('input', (e) => {
        let value = e.target.value.replace(/[^a-zA-Z\s]/g, '');
        e.target.value = value;
    });

    validadeInput.addEventListener('input', (e) => {
        let value = e.target.value.replace(/\D/g, '');
        if (value.length > 2) {
            value = value.slice(0, 2) + '/' + value.slice(2, 4);
        }
        e.target.value = value;
    });

    cvvInput.addEventListener('input', (e) => {
        e.target.value = e.target.value.replace(/\D/g, '');
    });

    const finalizarPagamento = (event) => {
        event.preventDefault(); 

        const numCartaoVal = numCartaoInput.value.replace(/\s/g, '');
        if (numCartaoVal.length !== 16) {
            alert('Número do cartão inválido. Deve conter 16 dígitos.');
            return;
        }

        const nomeCartaoVal = nomeCartaoInput.value.trim();
        if (nomeCartaoVal.split(' ').length < 2) {
            alert('Nome no cartão inválido. Por favor, insira o nome completo (pelo menos nome e sobrenome).');
            return;
        }

        if (!/^\d{2}\/\d{2}$/.test(validadeInput.value)) {
            alert('Data de validade inválida. Use o formato MM/AA.');
            return;
        }
        
        if (cvvInput.value.length !== 3) {
            alert('CVV inválido. Deve conter 3 dígitos.');
            return;
        }

        sessionStorage.setItem('metodoPagamento', 'Cartão de Crédito');
        alert('Pagamento aprovado com sucesso!');
        window.location.href = 'revisao_info.html';
    };

    const carregarResumo = () => {
        const setor = sessionStorage.getItem('setorNome') || 'N/A';
        const quantidade = sessionStorage.getItem('quantidade') || 'N/A';
        const assentos = sessionStorage.getItem('assentos') || 'Não se aplica';
        const servicos = sessionStorage.getItem('servicosAdicionais') || 'Nenhum';
        const total = sessionStorage.getItem('totalIngressos') || 'R$ 0,00';

        document.getElementById('resumo-setor').textContent = setor;
        document.getElementById('resumo-quantidade').textContent = quantidade;
        document.getElementById('resumo-assentos').textContent = assentos;
        document.getElementById('resumo-servicos').textContent = servicos === '' ? 'Nenhum' : servicos;
        document.getElementById('resumo-total').textContent = total;
    };

    form.addEventListener('submit', finalizarPagamento);

    document.getElementById('voltarBtn').addEventListener('click', () => {
        window.location.href = 'servicos_adicional.html';
    });

    carregarResumo();
});