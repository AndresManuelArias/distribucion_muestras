'use strict';
//@ts-check
const estaditicas = require('./estadisticas.js');
function generarJsonUsuario(personaEstudiar,columnaIdentificadorUsuario){
    /**
     * @param {json} personaEstudiar 
     * @param {string} columnaIdentificadorUsuario
     * @returns {json}
     */
    let jsonUsuario = {};
    jsonUsuario[personaEstudiar[columnaIdentificadorUsuario]] = [];
    return jsonUsuario;
}
function generarArrayUsuarios(poblacionEstudiar,columnaIdentificadorUsuario){
    /**
     * @param {array} poblacionEstudiar 
     * @param {string} columnaIdentificadorUsuario
     * @returns {array}
     */
    let set = [];
    poblacionEstudiar.forEach((value)=>{
        set.push(value[columnaIdentificadorUsuario])
    })
    return set;
}
function seleccionarCaracterisiticasUsuario(personaEstudiar, caracteristicasPoblacion){
    /**
     * @param {json} personaEstudiar
     * @param {string[]} caracteristicasPoblacion
     * @return {json[]} 
     */
    let caracteristicaPersona = {};
    caracteristicasPoblacion.forEach(caracteristica => {
        caracteristicaPersona[caracteristica] = personaEstudiar[caracteristica];
    });
    return caracteristicaPersona;
}
function generarJsonConCaracteristicasPoblacion(poblacionEstudiar, columnaCaracteristicasPoblacion,columnaIdentificadorUsuario ){
    /**
     * @param {array} poblacionEstudiar
     * @param {string[]} columnaCaracteristicasPoblacion
     * @param {string} columnaIdentificadorUsuario
     * @return {json}
     */
    let usuariosJson = {};
    poblacionEstudiar.forEach((personaEstudiar)=>{
        usuariosJson[personaEstudiar[columnaIdentificadorUsuario]] = seleccionarCaracterisiticasUsuario(personaEstudiar, columnaCaracteristicasPoblacion) 
    });
    return usuariosJson;
}
function generarEstadisticasDescritivaPoblacion(poblacionEstudiar,columnascaracteristicasPoblacion){
   /**
    * @param {string[]} columnascaracteristicasPoblacion
    * @param {array} poblacionEstudiar
    * @returns {json[]}
    */
   let  jsonCaracteristicas = {};
   columnascaracteristicasPoblacion.forEach((caracteristica)=>{
        jsonCaracteristicas[caracteristica] = {};       
        for(let formula in  estaditicas){
            let numeros  = poblacionEstudiar.map(persona => persona[caracteristica]);
            jsonCaracteristicas[caracteristica][formula] =  estaditicas[formula](numeros) ;   
        }
   });
   return jsonCaracteristicas;
}

class Poblacion {
    constructor(poblacionEstudiar,columnaIdentificadorUsuario,columnascaracteristicasPoblacion){
        /**
         * @param {string} columnaIdentificadorUsuario
         * @param {string[]} columnascaracteristicasPoblacion
         * @param {json[]} poblacionEstudiar
         */   
        this.estadisticasPoblacion = generarEstadisticasDescritivaPoblacion(poblacionEstudiar,columnascaracteristicasPoblacion);     
        this.caracteristicasPoblacion =  generarJsonConCaracteristicasPoblacion(poblacionEstudiar, columnascaracteristicasPoblacion,columnaIdentificadorUsuario );
        this.listadoPersonas = generarArrayUsuarios(poblacionEstudiar,columnaIdentificadorUsuario)
    }
    mostrarJsonConCaracteristicasPoblacion(){
        /**
         * @return {json}
         */
        return  this.caracteristicasPoblacion;
    }
    mostrarEstadisticasCaracteristicasPoblacion(){
        /**
         * @returns {json[]}
         */
        return this.estadisticasPoblacion;
    }
}

module.exports = Poblacion;