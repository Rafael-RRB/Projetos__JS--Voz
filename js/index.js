console.log("index.js carregado.");



// Declarações
const debug = true;
const segredoMenor = document.querySelector('[data-js="segredoMenor"');
const segredoMaior = document.querySelector('[data-js="segredoMaior"');

const containerFormulario = document.querySelector('[data-js="prejogo"');
const formularioBotao = document.querySelector('[data-js="botaoIniciar"');
const inputJogadores = document.querySelector('[data-js="quantJogadores"]');
const inputNumero = document.querySelector('[data-js="quantNumero"]');

const principal = document.querySelector('[data-js="principal"');


formularioBotao.addEventListener("click", event => {
    event.preventDefault();
    // Número de jogadores
    if(inputJogadores.value >= 2 && inputJogadores.value <= 4) {
        // Número máximo
        if(inputNumero.value >= 3 && inputNumero.value <= 10000) {
            numeroAleatorio.valores.valorMaximo = inputNumero.value;
            reconhecimentoVoz.numeros.numeroGerado = numeroAleatorio.geraNumero(1, inputNumero.value);
            reconhecimentoVoz.numeros.quantJogadores = parseInt(inputJogadores.value);
            segredoMenor.innerText = numeroAleatorio.valores.valorMinimo;
            segredoMaior.innerText = numeroAleatorio.valores.valorMaximo;
            containerFormulario.classList.add("data-js__hide");
            principal.classList.remove("data-js__hide");
            reconhecimentoVoz.recognition.start();
        } else {
            console.log("Número inválido");
        }
    } else {
        console.log("Jogadores inválido");
    }
    
})

// Imports
import { numeroAleatorio } from "../src__js/numeroAleatorio.js";
import { reconhecimentoVoz } from "../src__js/reconhecimentoVoz.js";
// Para debug, ativa a possibilidade de usar as funções no console
if(debug) {
    window.geraNumero = numeroAleatorio.geraNumero;
}

reconhecimentoVoz.numeros.numeroGerado = numeroAleatorio.geraNumero(numeroAleatorio.valores.valorMinimo, numeroAleatorio.valores.valorMaximo);
