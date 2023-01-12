import { numeroAleatorio } from "./numeroAleatorio.js";

// Preloads
// Audio
window.somErro = new Audio("../se/419023__jacco18__acess-denied-buzz.mp3");
window.somAcerto = new Audio("../se/538149__fupicat__notification.wav");

// Isso reseta o audio, evitando que ações "pule" os efeitos sonoros.
window.tocaAudio = audio => {
    audio.pause();
    audio.currentTime = 0;
    audio.play();
}

window.SpeechRecognition = window.SpeechRecognition || webkitSpeechRecognition;
const elementoChute = document.querySelector('[data-js="escolha"]');
const elementoChuteTitulo1 = document.querySelector('[data-js="chuteTitulo1"]');
const elementoChuteTitulo2 = document.querySelector('[data-js="chuteTitulo2"]');
const elementoChuteResultado = document.querySelector('[data-js="chuteResultado"]');

const telaFim = document.querySelector('[data-js="telaVitoria"');
const jogadorVitorioso = document.querySelector('[data-js="vencedor"');
const botaoReinicia = document.querySelector('[data-js="recomeca"');
// Permite reiniciar o jogo
botaoReinicia.addEventListener("click", event => {
    event.preventDefault();
    document.querySelector('[data-js="telaVitoria"]').classList.add("data-js__hide");
    document.querySelector('[data-js="prejogo"]').classList.remove("data-js__hide");
    numeros.jogadorAtual = 1;
    canPlay = true;
    resetaInicio();
});

let falaInicial = true;
let canPlay = true;

const numeros = {
    "numeroGerado": 0,
    "quantJogadores": 0,
    "jogadorAtual": 1,
    "numeroJogador": 0
}
const resultados = {
    "maior": document.querySelector('[data-js="resultadoMaior"'),
    "menor": document.querySelector('[data-js="resultadoMenor"')
}

const recognition = new SpeechRecognition();
recognition.lang = "pt-Br";
recognition.interimResults = false;
recognition.continuous = true;
recognition.addEventListener("result", onSpeak);

// Para executar continuamente a detecção
recognition.onend = () => {
    if(canPlay) {
        recognition.start();
    }
}
// 
function resetaInicio() {
    let elementoJogador = document.querySelector('[data-js="jogador"');
    numeros.jogadorAtual = 1;
    elementoJogador.innerText = numeros.jogadorAtual;

    elementoChuteTitulo1.classList.add("data-js__hide");
    elementoChuteTitulo2.classList.remove("data-js__hide");
    elementoChute.classList.add("data-js__hide");
    elementoChuteResultado.classList.add("data-js__hide");
    falaInicial = true;
}


// Função executada quando há um resultado de voz
function onSpeak(event) {
    recognition.stop();
    let transcriptArray = event.results[0][0].transcript.split(" ");

    for(let i = 0; i < transcriptArray.length; i++) {
        if(!isNaN(parseInt(transcriptArray[i])) && parseInt(transcriptArray[i]) >= numeroAleatorio.valores.valorMinimo && parseInt(transcriptArray[i]) <= numeroAleatorio.valores.valorMaximo) {
            // Se for a fala inicial, esconde e revela certos elementos DOM
            if(falaInicial) {
                elementoChuteTitulo1.classList.remove("data-js__hide");
                elementoChuteTitulo2.classList.add("data-js__hide");
                elementoChute.classList.remove("data-js__hide");
                elementoChuteResultado.classList.remove("data-js__hide");
                falaInicial = false;
            }
            numeros.numeroJogador = parseInt(transcriptArray[i]);
            elementoChute.innerText = numeros.numeroJogador;
            // Caso um jogador acerte o número
            if(numeros.numeroJogador === numeros.numeroGerado) {
                telaFim.classList.remove("data-js__hide");
                jogadorVitorioso.innerText = numeros.jogadorAtual;
                tocaAudio(somAcerto);
                canPlay = false;
            } else {
                // Caso um jogador erre o número
                tocaAudio(somErro);
                let elementoJogador = document.querySelector('[data-js="jogador"');
                if(numeros.jogadorAtual < numeros.quantJogadores) {
                    numeros.jogadorAtual++;
                } else {
                    numeros.jogadorAtual = 1;
                }
                elementoJogador.innerText = numeros.jogadorAtual;

                if(numeros.numeroJogador > numeros.numeroGerado) {
                    resultados.maior.classList.add("data-js__hide");
                    resultados.menor.classList.remove("data-js__hide");
                } else {
                    resultados.menor.classList.add("data-js__hide");
                    resultados.maior.classList.remove("data-js__hide");
                }
            }
            return;
        }
    }
}

export const reconhecimentoVoz = {
    numeros,
    SpeechRecognition,
    recognition,
    onSpeak
}