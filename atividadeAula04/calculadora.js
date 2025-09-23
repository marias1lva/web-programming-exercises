const setNumero = function (x){
    let display = document.getElementById("display");
    display.value += x;
}

const setIgual = function (){
    let res = document.getElementById("display").value;
    res = eval(res);
    document.getElementById("display").value = res;
}

const limparDisplay = function () {
    document.getElementById("display").value = "";
}

document.getElementById("limpar").addEventListener("click", limparDisplay);