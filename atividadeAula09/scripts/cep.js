
const consultarCEP = async () => {
    let cep = document.getElementById("cep").value;
    let url = `https://viacep.com.br/ws/${cep}/json/`;
    fetch(url)
        .then((response) => response.json())
        .then((data) => {
            const uf = data.uf;
            const localidade = data.localidade;
            const bairro = data.bairro;
            const logradouro = data.logradouro;
        
        const resultado = `CEP: ${cep} <br>
        UF: ${uf} <br>
        Cidade: ${localidade} <br>
        Bairro: ${bairro} <br>
        Logradouro: ${logradouro}
        `;
        document.getElementById('resultado').innerHTML = resultado;
    })
    .catch(error => alert(error));
}