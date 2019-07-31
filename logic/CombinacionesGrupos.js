'use strict';
//@ts-check
const estaditicas = require('./Estadisticas.js');
var  permutate  = require ( 'enum-permutate' ) ; 
function generarNumerosAzar(cantidad){
    /**
     * @argument {int} cantidad
     * @returns {int}
     */
}
function generarArrayidentificadoresPoblacion(poblacionUsuario){
    /**
     * @argument {json} poblacionUsuario
     * @returns {string[]}
     */
}
function escogerPersonasDePoblacion(identificadorUsuario,cantidadGruposYpersonas){
    /**
     * @argument {string[]}identificadorUsuario 
     * @argument {json} cantidadGruposYpersonas
     * @returns {string[]}
     */
}
function verificarMuestraSeleccionadaCumplaRequisistos(muestraSelecionada,estadisticaCaracteristicaPoblacion){
    /**
     * @argument {string[]} muestraSelecionada
     * @argument {json} estadisticaCaracteristicaPoblacion
     * @return {json}
     */
    
}
// pruebas
function generarYEscogerCombinaciones(arrayCombinaciones,arrayFuncionesCriterios){
    return arrayCombinaciones.every(element => arrayFuncionesCriterios.some(funcion => funcion(element)));
}
// function forAnidado(personas,repeticiones){
//     let agrupamiento = []
//     personas.forEach((persona)=>{
//         debugger
//         let grupos = []       
//         grupos.push(persona)
//         if(repeticiones > 1 ){                     
//             grupos = grupos.concat(forAnidado(personas,repeticiones-1))
//         }
//         agrupamiento.push(grupos)
// 	})
// 	return agrupamiento;
// }
// function foranidado(array,condicionFuncion){
//     let grupos = [];
// 	array.forEach((element)=>{
// 		let newArray = array.filter(element1 => element1 !== element);	
//             // let  pasar = typeof( condicionFuncion) === 'function'?condicionFuncion(grupos):true;              
//             grupos.push( [].concat(element,foranidado(newArray,condicionFuncion)));	
// 	});
// 	return  grupos;
// }
// function convertirRamaLineaArray(rama){debugger
//     if (Array.isArray(rama)){
//             return [].concat(rama[0],convertirRamaLineaArray(rama[1]));
//     }else{
//         return []
//     } 
// }
// function convertirArbolLineaArray(arbol){
//     let array  = []
//     arbol.forEach((rama)=>{
//         if (Array.isArray(rama)){
//             return [].concat(rama[0],convertirArbolLineaArray(rama[1]));
//         }else{
//             return []
//         }
//     }); 
// }

function ramificacionYCorteLimite(array,funciones,cantidadIteraciones){
    let conteoIteraciones = 0 ;
    let limiteCorte = array.length;
    let conteoGruposCompletos = 0;

    function ramificacionYCorte(array,funciones, rutaEntrada){
        let colection = [];
        // debugger
        array.forEach((element)=>{
            // debugger
            let ruta = rutaEntrada === undefined?[]:rutaEntrada;
            let newArray = array.filter(element1 => element1 !== element);
            ruta = ruta.concat(element);
            if(conteoIteraciones <= cantidadIteraciones || conteoGruposCompletos ===1 ){
                var aleatorio = conteoGruposCompletos === 0?1:  Math.round(Math.random()*3);
                console.log('aleatorio',aleatorio);
                if(funciones.every(funcion => funcion(ruta)) && array.length > 0  && aleatorio === 1 ){
                    // console.log(`element ${element},newArray ${newArray},ruta ${ruta}`);
                    colection.push([].concat(element,ramificacionYCorte(newArray,funciones,ruta)));        
                    if(ruta.length ===  limiteCorte){
                        conteoGruposCompletos++;
                    }           
                    console.log('ruta1',ruta.length,'conteoGruposCompletos',conteoGruposCompletos,'conteoIteraciones',conteoIteraciones++);
                    
                }
            }
        });
        // console.log('colection',colection);
        return  colection;    
    }
    return  ramificacionYCorte(array,funciones);
}
function generarGrupos(personas,formacionGrupos){
    let personasPorGrupo = formacionGrupos.numeroPersonasPorMuestra;
    let totalPersonasIngresadas = formacionGrupos.numeroGruposEnPoblacion * formacionGrupos.numeroPersonasPorMuestra + formacionGrupos.sobrante;
    let totalGrupos = formacionGrupos.numeroGruposEnPoblacion;
    let grupos = [];
    let grupo = [];
    for(let persona = 0;persona < personas.length;persona++){
        // console.log('personas',personas[persona])                
        // console.log('personasCaracteristicas[persona]',personasCaracteristicas[personas[persona]])
        grupo.push(personas[persona]);
        if(grupo.length%personasPorGrupo ===0 ){
            grupos.push(grupo);
            grupo = [];
        }else if(totalGrupos === grupos.length){
            grupos.push(grupo);
        }else if(grupo.length === totalPersonasIngresadas){
            grupos.push(grupo);
            grupo = [] ;         
        }
    }
    return grupos;
}
function generarGruposDeposibilidadesGrupos(posibilidadesdeGrupos,formacionGrupos,caracteristicaPoblacion){
    return  posibilidadesdeGrupos.map((grupos)=>{
       return generarGrupos(grupos,formacionGrupos,caracteristicaPoblacion);
    });
}

function seleccionarGrupos(estadisticaPoblacion,formacionGrupos,caracteristicaPoblacion){
    let requisitoPasar = estadisticaPoblacion.promedio;
    let diferenciaPasar = estadisticaPoblacion.desviacionEstandar;
    let personasPorGrupo = formacionGrupos.numeroPersonasPorMuestra;
    let sobrante = formacionGrupos.sobrante;
    let cantidadGrupos = formacionGrupos.numeroGruposEnPoblacion;
    let totalPersonasIngresadas = formacionGrupos.numeroGruposEnPoblacion * formacionGrupos.numeroPersonasPorMuestra + formacionGrupos.sobrante;
    let personasCaracteristicas = caracteristicaPoblacion;
    return (personas,porcentajeListon)=>{
        let grupos = [];
        let grupo = [];
        if(personas.length%cantidadGrupos === 0 || (personas.length%cantidadGrupos === sobrante && personas.length === totalPersonasIngresadas)){            
            for(let persona = 0;persona < personas.length;persona++){
                // console.log('personas',personas[persona])                
                // console.log('personasCaracteristicas[persona]',personasCaracteristicas[personas[persona]])
                grupo.push(personasCaracteristicas[personas[persona]]);
                if(grupo.length%personasPorGrupo ===0 ){
                    grupos.push(grupo);
                    grupo = [];
                }else if(grupo.length === totalPersonasIngresadas){
                    grupos.push(grupo);
                    grupo = [] ;         
                }
            }
            let promediosGrupos = grupos.map( grupo => estaditicas.estadisticas.promedio(grupo));
            // console.log('promediosGrupos',promediosGrupos)
            // console.log('diferenciaPasar',diferenciaPasar)
            // console.log('requisitoPasar',requisitoPasar)
            let porcentaje = porcentajeListon !== undefined ?porcentajeListon:1;
            // console.log('porcentaje',porcentaje)
            diferenciaPasar = Number((diferenciaPasar*porcentaje).toFixed(1)) ;
            // console.log('diferenciaPasar',diferenciaPasar);
            return promediosGrupos.every(a => a>=requisitoPasar-diferenciaPasar && a<=requisitoPasar+diferenciaPasar);
        }else{
            return true;
        }
    };
}
function crearFuncionesSelecionarGrupos(estadisticasPoblacion,formacionGrupos,poblacionEstudiar){
    let colecionCaracteristicas = [];
    for(let estadistica in estadisticasPoblacion){
        let caracteristicaPoblacion = [];     
        for(let persona in poblacionEstudiar){
             caracteristicaPoblacion[persona] =  poblacionEstudiar[persona][estadistica];     
        }
        let funcion = seleccionarGrupos(estadisticasPoblacion[estadistica],formacionGrupos,caracteristicaPoblacion);
        colecionCaracteristicas.push( funcion);       
    }
    return colecionCaracteristicas;
}
function colectionTodosLosDatos(arbol){
    let colection = [];
    function mostrarTodosLosDatos(arbol){
        let ruta = arguments[1]||[];
        arbol.forEach((ramas)=>{
            if(Array.isArray(ramas)){
               mostrarTodosLosDatos(ramas,[].concat(ruta,ramas[0]));
            }else{
            //    console.log('ruta',ruta.length);
               colection.push(ruta);
            }
        });
    }
    mostrarTodosLosDatos(arbol);
    return colection;
}

function generarArbolCombinaciones(estadisticasPoblacion,formacionGrupos,poblacionEstudiar,cantidadIteraciones){
    // console.log('estadisticasPoblacion',estadisticasPoblacion);
    // console.log('formacionGrupos',formacionGrupos);
    // console.log('poblacionEstudiar',poblacionEstudiar);
    let arrayPoblacion = [];
    for(let persona in poblacionEstudiar){
        arrayPoblacion.push( persona);
    }
    let funcionesSelecionGrupos =crearFuncionesSelecionarGrupos(estadisticasPoblacion,formacionGrupos,poblacionEstudiar);
    // console.log('funcionesSelecionGrupos',funcionesSelecionGrupos);
    // console.log('arrayPoblacion',arrayPoblacion);
    let iteraciones = cantidadIteraciones=== undefined?Infinity:cantidadIteraciones;
    return ramificacionYCorteLimite(arrayPoblacion,funcionesSelecionGrupos,iteraciones);
}

/**
 * generar una funcion que recorra las posibilidades y de acuerdo alas combinaciones realizadas balla midiendo que combinacion hacer que se aproxime al promedio
 */
///
class CombinacionGrupos {
    constructor(poblacionEstudiar,estadisticaCaracteristicasPoblacion){
        /**
         * @param {json[]} estadisticaCaracteristicasPoblacion
         * @param {json[]} poblacionEstudiar
         */ 
        this.poblacionEstudiar = poblacionEstudiar;
        this.estadisticaCaracteristicasPoblacion = estadisticaCaracteristicasPoblacion;
    }
    generarCombinacionesDeMuestrasArbol(cantidadGruposYpersonas,cantidadIteraciones){
        /**
         * @param {json} cantidadGruposYpersonas
         * @param {int} cantidadIteraciones
         * @returns {json:json[]}-- un json con el numero de combinaciones y dentro el numero de muestray dentro un array con las personas
         */
        let cantidadPersonas = cantidadGruposYpersonas.numeroGruposEnPoblacion * cantidadGruposYpersonas.numeroPersonasPorMuestra +cantidadGruposYpersonas.sobrante;
        console.log(cantidadPersonas);
        let arbolCombinaciones =  generarArbolCombinaciones(this.estadisticaCaracteristicasPoblacion,cantidadGruposYpersonas,this.poblacionEstudiar,cantidadIteraciones);
        let arrayCombinaciones = colectionTodosLosDatos(arbolCombinaciones).filter(combinacion => combinacion.length=== cantidadPersonas);
        let funcionesSelecionGrupos =crearFuncionesSelecionarGrupos(this.estadisticaCaracteristicasPoblacion,cantidadGruposYpersonas,this.poblacionEstudiar);
        console.log('arrayCombinaciones',arrayCombinaciones);
        console.log('funcionesSelecionGrupos',funcionesSelecionGrupos);
        let coleciones = arrayCombinaciones.filter(grupo =>  funcionesSelecionGrupos.every(funcion => funcion(grupo,1)));        
        console.log(this.estadisticaCaracteristicasPoblacion);        
        return  coleciones;
    }
    generarArbolCombinaciones(cantidadGruposYpersonas){
       return  generarArbolCombinaciones(this.estadisticaCaracteristicasPoblacion,cantidadGruposYpersonas,this.poblacionEstudiar);
    }
    colectionTodosLosDatos(arbol){
       return colectionTodosLosDatos(arbol);
    }
    generarGruposDeposibilidadesGrupos(posibilidadesdeGrupos,formacionGrupos){
        return generarGruposDeposibilidadesGrupos(posibilidadesdeGrupos,formacionGrupos );
    }
    permutate(){
        let arrPoblacionEstudiar = [];
        let conteo = 0; 
        for(let people in this.poblacionEstudiar){
            arrPoblacionEstudiar.push(people);
            conteo++;
            // if(conteo == 4){ break;}
        }
        // console.log('this.poblacionEstudiar',this.poblacionEstudiar);
      
        console.log('arrPoblacionEstudiar',arrPoblacionEstudiar);
        var result = permutate(arrPoblacionEstudiar) ;
        console.log(result);
        return result;//tiene problemas de eficiencia
    }
}

module.exports = CombinacionGrupos;