// organizar las personas del mejor al peor
// escoger la cantidad de grupo que se van a hacer
// la primer grupo escoge hasta legar al ultimo, 
// cuando llega al ultimo, el ultimo comienza de primeras invirtiendo el orden
// hacer este proceso hasta que no se pueda escoger a alguien mas 
const R = require('ramda');

export class DistribucionGrupo {
    public columnasPromediar:string[]
    constructor(columnasPromediar:string[]){
        this.columnasPromediar = columnasPromediar;
    }

}
type Personas ={
    [key: string]: any

}
type Grupos ={
    [key: number]: any

}
// function ordenarPersonas(personas:Personas[],columnasPromediar:string[]){
//     let sumaPuntajes = personas.map(filas)
//     sumaPuntajes.sort((a,b)=>{

//     })
//     return sumaPuntajes
// }
export function escogerGrupos(cantidadGrupo:number,personas:Personas[]):any{
    let grupos:Map<number,any> = new Map()
    for(let creando = 1;creando <= cantidadGrupo;creando++ ){
        grupos.set(creando,[])
    }
    console.log("comienzo grupos",grupos)
    do{
        for(var comienzo:number = 1;comienzo <= cantidadGrupo; comienzo++ ){
            grupos.get(comienzo).push(personas.shift()) 
        }
        console.log('comienzo',comienzo)
        for(let finalizar:number = comienzo-1;finalizar >= 1; finalizar-- ){
            console.log('finalizar',finalizar)
            
            grupos.get(finalizar).push(personas.shift())            
        } 
    }while(personas.length)
    // console.log("grupos",grupos)

    return grupos
}