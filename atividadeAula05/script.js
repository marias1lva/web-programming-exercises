let dados = {};

function iniciarFluxo(tipo) {
  document.getElementById("inicio").classList.add("hidden");
  document.getElementById("fluxo-" + tipo).classList.remove("hidden");
  dados.tipo = tipo;
}

function proximoEndereco() {
  if(dados.tipo === "sonora"){
    dados.descricao = document.getElementById("descricaoSonora").value;
    dados.data = document.getElementById("dataSonora").value;
    dados.hora = document.getElementById("horaSonora").value;
    document.getElementById("fluxo-sonora").classList.add("hidden");
  }else if(dados.tipo === "animais"){
    dados.animal = document.getElementById("tipoAnimal").value;
    dados.descricao = document.getElementById("descricaoAnimais").value;
    dados.data = document.getElementById("dataAnimais").value;
    dados.hora = document.getElementById("horaAnimais").value;
    document.getElementById("fluxo-animais").classList.add("hidden");
  }else if(dados.tipo === "vandalismo"){
    dados.local = document.getElementById("localVandalismo").value;
    dados.descricao = document.getElementById("descricaoVandalismo").value;
    dados.data = document.getElementById("dataVandalismo").value;
    dados.hora = document.getElementById("horaVandalismo").value;
    document.getElementById("fluxo-vandalismo").classList.add("hidden");
  }else if(dados.tipo === "furto"){
    dados.item = document.getElementById("itemFurto").value;
    dados.descricao = document.getElementById("descricaoFurto").value;
    dados.data = document.getElementById("dataFurto").value;
    dados.hora = document.getElementById("horaFurto").value;
    document.getElementById("fluxo-furto").classList.add("hidden");
  }
  document.getElementById("endereco").classList.remove("hidden");
  carregarEndereco();
}

const salvarEndereco = function () {
  let endereco = {
    rua: document.getElementById("rua").value,
    cidade: document.getElementById("cidade").value,
    estado: document.getElementById("estado").value,
    cep: document.getElementById("cep").value,
  };
  sessionStorage.setItem("endereco", JSON.stringify(endereco));
};

const carregarEndereco = function () {
  let endereco = JSON.parse(sessionStorage.getItem("endereco"));
  if (!endereco) return;
  document.getElementById("rua").value = endereco.rua;
  document.getElementById("cidade").value = endereco.cidade;
  document.getElementById("estado").value = endereco.estado;
  document.getElementById("cep").value = endereco.cep;
};

function mostrarResumo() {
  document.getElementById("endereco").classList.add("hidden");
  document.getElementById("resumo").classList.remove("hidden");

  let endereco = JSON.parse(sessionStorage.getItem("endereco"));
  dados.endereco = endereco;

  let resumoHtml = "";
  for(let chave in dados){
    if(typeof dados[chave] === "object"){
      for(let sub in dados[chave]){
        resumoHtml += `<p><strong>${sub}:</strong> ${dados[chave][sub]}</p>`;
      }
    }else{
      resumoHtml += `<p><strong>${chave}:</strong> ${dados[chave]}</p>`;
    }
  }
  document.getElementById("conteudoResumo").innerHTML = resumoHtml;
}

function enviarDenuncia() {
  document.getElementById("resumo").classList.add("hidden");
  document.getElementById("final").classList.remove("hidden");
  console.log("Denúncia enviada:", dados);
}

function voltar() {
  location.reload();
}
