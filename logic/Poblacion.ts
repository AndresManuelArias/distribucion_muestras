'use strict';
//@ts-check
import {estadisticas,Estadistica,tipoEstadistica} from './Estadisticas';
// import { estadisticas } from "./Estadisticas";




function generarJsonUsuario(personaEstudiar:any,columnaIdentificadorUsuario:string){
    /**
     * @param {json} personaEstudiar 
     * @param {string} columnaIdentificadorUsuario
     * @returns {json}
     */
    let jsonUsuario:any = {};
    jsonUsuario[personaEstudiar[columnaIdentificadorUsuario]] = [];
    return jsonUsuario;
}
function generarArrayUsuarios(poblacionEstudiar:any[],columnaIdentificadorUsuario:string):string[]{
    /**
     * @param {array} poblacionEstudiar 
     * @param {string} columnaIdentificadorUsuario
     * @returns {string}
     */
    let set:string[] = [];
    poblacionEstudiar.forEach((value)=>{
        set.push(value[columnaIdentificadorUsuario])
    })
    return set;
}
function seleccionarCaracterisiticasUsuario(personaEstudiar:any, caracteristicasPoblacion:string[]):any{
    /**
     * @param {json} personaEstudiar
     * @param {string[]} caracteristicasPoblacion
     * @return {json[]} 
     */
    let caracteristicaPersona:any = {};
    caracteristicasPoblacion.forEach(caracteristica => {
        caracteristicaPersona[caracteristica] = personaEstudiar[caracteristica];
    });
    return caracteristicaPersona;
}
function generarJsonConCaracteristicasPoblacion(poblacionEstudiar:any[], columnaCaracteristicasPoblacion:string[],columnaIdentificadorUsuario:string ):any{
    /**
     * @param {array} poblacionEstudiar
     * @param {string[]} columnaCaracteristicasPoblacion
     * @param {string} columnaIdentificadorUsuario
     * @return {json}
     */
    let usuariosJson:any = {};
    poblacionEstudiar.forEach((personaEstudiar)=>{
        usuariosJson[personaEstudiar[columnaIdentificadorUsuario]] = seleccionarCaracterisiticasUsuario(personaEstudiar, columnaCaracteristicasPoblacion) 
    });
    return usuariosJson;
}
function generarEstadisticasDescritivaPoblacion(poblacionEstudiar:any[],columnascaracteristicasPoblacion:string[]):any{
   /**
    * @param {string[]} columnascaracteristicasPoblacion
    * @param {array} poblacionEstudiar
    * @returns {json[]}
    */
   let  jsonCaracteristicas:any = {};
   
   for (let tcaracteristica of columnascaracteristicasPoblacion) {
        jsonCaracteristicas[tcaracteristica] = {};          
        for(let formula in  estadisticas){
            let numeros:number[]  = poblacionEstudiar.map(tpersona => {
                console.log(typeof (tcaracteristica),'%'+tcaracteristica+'%')
                console.log('tpersona[tcaracteristica]',tpersona[tcaracteristica],'caracteristica',tcaracteristica,'tpersona',tpersona)
                return parseInt(tpersona[tcaracteristica])
            });
            console.log('numeros',numeros)
            jsonCaracteristicas[tcaracteristica][formula] =  estadisticas[formula](numeros) ;   
        }
    }
   return jsonCaracteristicas;
}

export class Poblacion {
    public estadisticasPoblacion:any
    public caracteristicasPoblacion:any
    public listadoPersonas:string[]  
    constructor(poblacionEstudiar:any[],columnaIdentificadorUsuario:string,columnascaracteristicasPoblacion:string[]){
        /**
         * @param {string} columnaIdentificadorUsuario
         * @param {string[]} columnascaracteristicasPoblacion
         * @param {json[]} poblacionEstudiar
         */   
        this.estadisticasPoblacion = generarEstadisticasDescritivaPoblacion(poblacionEstudiar,columnascaracteristicasPoblacion);     
        this.caracteristicasPoblacion =  generarJsonConCaracteristicasPoblacion(poblacionEstudiar, columnascaracteristicasPoblacion,columnaIdentificadorUsuario );
        this.listadoPersonas = generarArrayUsuarios(poblacionEstudiar,columnaIdentificadorUsuario)
    }
    public mostrarJsonConCaracteristicasPoblacion():any{
        /**
         * @return {json}
         */
        return  this.caracteristicasPoblacion;
    }
    public mostrarEstadisticasCaracteristicasPoblacion():any{
        /**
         * @returns {json[]}
         */
        return this.estadisticasPoblacion;
    }
}

