let jugador1 = true; //Esto es para ver si está jugando el jugador 1 o 2
let div_celdas = document.getElementById("game");
var n_tablero = parseInt(prompt("Indica de como va a ser el tablero (7x7) "))
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

function validar_fila(jugador){
    let cont_x = 0;
    let cont_o = 0;

    for (let fila = 0; fila < tablero.length; fila++) {
        for (let col = 0; col < tablero[0].length; col++) {
                    if(tablero[fila][col].textContent == 'X'){
                        cont_x++
                        if(cont_x == 4){
                            alert("Jugador 1 ha ganado")
                            mostrarGanador(jugador)
                        }
                    }else{
                        cont_x = 0
                        break
                    }
                }
            }
        }




function clicarCelda(celda){
    let valorCelda = celda.target.innerHTML;
    if(!valorCelda.length) {//Esto es para si no hay nada, es decir, la celda está vacia
        celda.target.innerHTML = jugador1? 'X':'O';
        jugador1 = !jugador1;
        validar_fila(jugador1)
        //Mirar si las filas tienen alguno de las piezas

        //Mirar las columnas

    }
}
function mostrarGanador(jugador){
    document.querySelector('#res').innerHTML = jugador == 'X'?'Jugador1 ha ganado':'Jugador2 ha ganado';
}

function reset_partida(){
    celdas.forEach(celda => {
        celda.target.textContent = '';
    });
    jugador1 = true;
}

main()