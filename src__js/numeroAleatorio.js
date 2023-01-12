const valores = {
    valorMinimo: 1,
    valorMaximo: 1000
}
function geraNumero(min, max) {
    let numero = Math.floor(Math.random() * max + min);
    console.log(numero);
    return numero;
}

export const numeroAleatorio = {
    valores,
    geraNumero
}