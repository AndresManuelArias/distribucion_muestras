'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
//@ts-check
const Estadisticas_1 = require("./Estadisticas");
// import { estadisticas } from "./Estadisticas";
function generarJsonUsuario(personaEstudiar, columnaIdentificadorUsuario) {
    /**
     * @param {json} personaEstudiar
     * @param {string} columnaIdentificadorUsuario
     * @returns {json}
     */
    let jsonUsuario = {};
    jsonUsuario[personaEstudiar[columnaIdentificadorUsuario]] = [];
    return jsonUsuario;
}
function generarArrayUsuarios(poblacionEstudiar, columnaIdentificadorUsuario) {
    /**
     * @param {array} poblacionEstudiar
     * @param {string} columnaIdentificadorUsuario
     * @returns {string}
     */
    let set = [];
    poblacionEstudiar.forEach((value) => {
        set.push(value[columnaIdentificadorUsuario]);
    });
    return set;
}
function seleccionarCaracterisiticasUsuario(personaEstudiar, caracteristicasPoblacion) {
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
function generarJsonConCaracteristicasPoblacion(poblacionEstudiar, columnaCaracteristicasPoblacion, columnaIdentificadorUsuario) {
    /**
     * @param {array} poblacionEstudiar
     * @param {string[]} columnaCaracteristicasPoblacion
     * @param {string} columnaIdentificadorUsuario
     * @return {json}
     */
    let usuariosJson = {};
    poblacionEstudiar.forEach((personaEstudiar) => {
        usuariosJson[personaEstudiar[columnaIdentificadorUsuario]] = seleccionarCaracterisiticasUsuario(personaEstudiar, columnaCaracteristicasPoblacion);
    });
    return usuariosJson;
}
function generarEstadisticasDescritivaPoblacion(poblacionEstudiar, columnascaracteristicasPoblacion) {
    /**
     * @param {string[]} columnascaracteristicasPoblacion
     * @param {array} poblacionEstudiar
     * @returns {json[]}
     */
    let jsonCaracteristicas = {};
    for (let tcaracteristica of columnascaracteristicasPoblacion) {
        jsonCaracteristicas[tcaracteristica] = {};
        for (let formula in Estadisticas_1.estadisticas) {
            let numeros = poblacionEstudiar.map(tpersona => {
                console.log(typeof (tcaracteristica), '%' + tcaracteristica + '%');
                console.log('tpersona[tcaracteristica]', tpersona[tcaracteristica], 'caracteristica', tcaracteristica, 'tpersona', tpersona);
                return parseInt(tpersona[tcaracteristica]);
            });
            console.log('numeros', numeros);
            jsonCaracteristicas[tcaracteristica][formula] = Estadisticas_1.estadisticas[formula](numeros);
        }
    }
    return jsonCaracteristicas;
}
class Poblacion {
    constructor(poblacionEstudiar, columnaIdentificadorUsuario, columnascaracteristicasPoblacion) {
        /**
         * @param {string} columnaIdentificadorUsuario
         * @param {string[]} columnascaracteristicasPoblacion
         * @param {json[]} poblacionEstudiar
         */
        this.estadisticasPoblacion = generarEstadisticasDescritivaPoblacion(poblacionEstudiar, columnascaracteristicasPoblacion);
        this.caracteristicasPoblacion = generarJsonConCaracteristicasPoblacion(poblacionEstudiar, columnascaracteristicasPoblacion, columnaIdentificadorUsuario);
        this.listadoPersonas = generarArrayUsuarios(poblacionEstudiar, columnaIdentificadorUsuario);
    }
    mostrarJsonConCaracteristicasPoblacion() {
        /**
         * @return {json}
         */
        return this.caracteristicasPoblacion;
    }
    mostrarEstadisticasCaracteristicasPoblacion() {
        /**
         * @returns {json[]}
         */
        return this.estadisticasPoblacion;
    }
}
exports.Poblacion = Poblacion;
