let jugador1 = "X"; //Esto es para ver si está jugando el jugador 1 o 2
let div_celdas = document.getElementById("game");
var n_tablero = parseInt(prompt("Indica de como va a ser el tablero (máx:7x7) "))
let tablero = []
let res = ''
//celdas nos devuelve un array de todos los elementos que tenga la class celdas

function crearTablero(){
    div_celdas.style.gridTemplateColumns = `repeat(${n_tablero},90px)` //Sirve para que te respete la distancia de los cuadrados
    for (let fila = 0; fila < n_tablero; fila++) { //Iteramos las celdas para ponerle un event listener a cada una
       let filaTablero = []
        for (let col = 0; col < n_tablero; col++) {
            let celda = document.createElement("div")
            celda.setAttribute("id",`${fila}${col}`)
            celda.classList.add("celda");
            celda.addEventListener("click",clicarCelda)
            div_celdas.appendChild(celda);
            filaTablero.push(celda)
       }
       tablero.push(filaTablero)
    }
}
console.log(tablero)
function main(){
    crearTablero()
}

function validar_celda(celda,jugador){
    let fila_celda = parseInt(celda.target.id[0])
    let columna_celda = parseInt(celda.target.id[1]);
    if(contar(celda,0,-1,fila_celda,columna_celda,jugador) + contar(celda,0,1,fila_celda,columna_celda,jugador) >= 3 || //Fila <->
       contar(celda,-1,0,fila_celda,columna_celda,jugador) + contar(celda,1,0,fila_celda,columna_celda,jugador) >= 3|| //Columna Arriba|Abajo
       contar(celda,-1,-1,fila_celda,columna_celda,jugador) + contar(celda,1,1,fila_celda,columna_celda,jugador) >= 3|| //Diagonal principal
       contar(celda,0,1,fila_celda,columna_celda,jugador) + contar(celda,0,1,fila_celda,columna_celda,jugador) >= 3) //Diagonal secundaria
       { 
       mostrar_ganador(jugador)
    }else{
        return false
    }
    return true

}



function clicarCelda(celda){
    let valorCelda = celda.target.innerHTML;
    if(!valorCelda.length) {//Esto es para si no hay nada, es decir, la celda está vacia
        celda.target.innerHTML = jugador1;
        validar_celda(celda,jugador1)
    }
    jugador1 = jugador1 === "X" ? "O":"X";
}

function contar(celda,pos_fila,pos_col,fila,columna,jugador){
    let contador = 0;
    let f = pos_fila + fila;
    let c = pos_col + columna;

    while(f >= 0 && f < tablero.length &&
         c >= 0 && c < tablero[0].length &&
         celda.target.textContent == jugador
    ){
        contador++;
        f += pos_fila;
        c += pos_col;
    }
    return contador;
    }

function mostrar_ganador(jugador){
    alert(`${jugador} ha ganado`);
}


function reset_partida(){
    celdas.forEach(celda => {
        celda.target.textContent = '';
    });
    jugador1 = true;
}

main()