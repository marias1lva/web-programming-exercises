document.getElementById('savings-form').addEventListener('submit', function(event){
    
    event.preventDefault();

    const objetivo = parseFloat(document.getElementById('objetivo').value);
    const valorInicial = parseFloat(document.getElementById('inicial').value);
    const depositoMensal = parseFloat(document.getElementById('mensal').value);
    const jurosMensal = parseFloat(document.getElementById('juros').value);

    const resultadoDiv = document.getElementById('resultado');
    resultadoDiv.innerHTML = ''; 

    if(objetivo <= 0 || valorInicial <= 0 || depositoMensal <= 0 || jurosMensal <= 0){
        alert("Por favor, insira valores positivos e maiores que zero em todos os campos.");
        return;
    }

    if(valorInicial >= objetivo){
        resultadoDiv.innerHTML = `<p class="success-message">Parabéns! O seu valor inicial já é igual ou maior que o seu objetivo financeiro.</p>`;
        return;
    }

    let saldoAtual = valorInicial;
    let meses = 0;
    const taxaJurosDecimal = jurosMensal / 100;

    let projecaoHTML = '<h2>Projeção da sua Poupança</h2>';

    while(saldoAtual < objetivo){
        meses++; 
        let jurosDoMes = saldoAtual * taxaJurosDecimal;

        saldoAtual += depositoMensal + jurosDoMes;

        projecaoHTML += `<p>Mês ${meses}: Saldo de R$ ${saldoAtual.toFixed(2).replace('.', ',')}</p>`;

        if(meses > 1200){ 
            projecaoHTML += "<p>A simulação foi interrompida pois excedeu 100 anos.</p>";
            break;
        }
    }

    const resultadoFinal = `
        <p class="success-message">
            Você atingirá seu objetivo de R$ ${objetivo.toFixed(2).replace('.', ',')} em <strong>${meses} meses</strong>!
        </p>
        ${projecaoHTML}
    `;

    resultadoDiv.innerHTML = resultadoFinal;

    document.getElementById('reset-button').classList.remove('hidden');

    document.getElementById('reset-button').addEventListener('click', function() {
        document.getElementById('savings-form').reset();
        document.getElementById('resultado').innerHTML = '';
        this.classList.add('hidden');
    });
});