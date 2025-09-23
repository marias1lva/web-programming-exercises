// Aguarda a estrutura da página ser completamente carregado antes de executar o script.
document.addEventListener('DOMContentLoaded', () => {

    // 1. SELEÇÃO DOS ELEMENTOS DO HTML
    const form = document.getElementById('servicosForm');
    const checkboxes = document.querySelectorAll('input[name="servico"]');
    const adicionarBtn = document.getElementById('adicionarBtn');
    const removerBtn = document.getElementById('removerBtn');
    const servicosAdInput = document.getElementById('servicosAdInput');

    // Função para carregar os dados do Session Storage ao iniciar a página
    const carregarServicosSalvos = () => {
        const servicosSalvos = sessionStorage.getItem('servicosAdicionais');
        if (servicosSalvos) {
            servicosAdInput.value = servicosSalvos;
        }
    };

    /**
     * Adiciona os serviços selecionados na caixa de texto.
     */
    const adicionarServicos = () => {
        const servicosAtuais = servicosAdInput.value ? servicosAdInput.value.split(', ') : [];
        
        // Itera sobre todos os checkboxes
        checkboxes.forEach(checkbox => {
            // Verifica se o checkbox está marcado E se o serviço ainda não foi adicionado
            if (checkbox.checked && !servicosAtuais.includes(checkbox.value)) {
                servicosAtuais.push(checkbox.value); // Adiciona o valor do serviço ao array
            }
            // Desmarca o checkbox após a operação, para o usuário poder selecionar novos
            checkbox.checked = false;
        });

        // Atualiza o valor da caixa de texto, juntando os serviços com ", "
        servicosAdInput.value = servicosAtuais.join(', ');
    };

    /**
     * Remove os serviços selecionados da caixa de texto.
     */
    const removerServicos = () => {
        const servicosParaRemover = [];
        const servicosAtuais = servicosAdInput.value ? servicosAdInput.value.split(', ') : [];

        // Pega todos os checkboxes que estão marcados para remoção
        checkboxes.forEach(checkbox => {
            if (checkbox.checked) {
                servicosParaRemover.push(checkbox.value);
            }
        });

        // Verifica se o usuário clicou em remover sem selecionar qual item remover
        if (servicosParaRemover.length === 0 && servicosAtuais.length > 0) {
            alert('Por favor, marque o(s) serviço(s) que você deseja remover.');
            return; // Interrompe a função aqui
        }

        // Filtra o array de serviços, mantendo apenas aqueles que NÃO estão na lista de remoção
        const servicosRestantes = servicosAtuais.filter(servico => !servicosParaRemover.includes(servico));

        // Atualiza o valor da caixa de texto
        servicosAdInput.value = servicosRestantes.join(', ');

        // Desmarca os checkboxes após a remoção
        checkboxes.forEach(checkbox => {
            checkbox.checked = false;
        });
    };

    /**
     * Salva os dados no Session Storage
     */
    const salvarESeguir = (event) => {
        event.preventDefault(); // Impede que a página recarregue ao enviar o formulário

        const servicosFinais = servicosAdInput.value;

        // Salva os serviços na Session Storage com a chave 'servicosAdicionais'
        sessionStorage.setItem('servicosAdicionais', servicosFinais);

        alert(`Serviços salvos com sucesso!\n\n${servicosFinais}`);

        window.location.href = 'pagamento.html';;
    };

    // =================================
    adicionarBtn.addEventListener('click', adicionarServicos);
    removerBtn.addEventListener('click', removerServicos);
    form.addEventListener('submit', salvarESeguir);

    // Carrega os serviços que possam já estar salvos na sessão
    carregarServicosSalvos();
});