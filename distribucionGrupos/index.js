"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// organizar las personas del mejor al peor
// escoger la cantidad de grupo que se van a hacer
// la primer grupo escoge hasta legar al ultimo, 
// cuando llega al ultimo el ultimo comienza de primeras invirtiendo el orden
// hacer este proceso hasta que no se pueda escoger a alguien mas 
const R = require('ramda');
class DistribucionGrupo {
    constructor(columnasPromediar) {
        this.columnasPromediar = columnasPromediar;
    }
}
exports.DistribucionGrupo = DistribucionGrupo;
// function ordenarPersonas(personas:Personas[],columnasPromediar:string[]){
//     let sumaPuntajes = personas.map(filas)
//     sumaPuntajes.sort((a,b)=>{
//     })
//     return sumaPuntajes
// }
function escogerGrupos(cantidadGrupo, personas) {
    let grupos = new Map();
    for (let creando = 1; creando <= cantidadGrupo; creando++) {
        grupos.set(creando, []);
    }
    console.log("comienso grupos", grupos);
    do {
        for (var comienso = 1; comienso <= cantidadGrupo; comienso++) {
            grupos.get(comienso).push(personas.shift());
        }
        console.log('comienso', comienso);
        for (let finalizar = comienso - 1; finalizar >= 1; finalizar--) {
            console.log('finalizar', finalizar);
            grupos.get(finalizar).push(personas.shift());
        }
    } while (personas.length);
    // console.log("grupos",grupos)
    return grupos;
}
exports.escogerGrupos = escogerGrupos;
