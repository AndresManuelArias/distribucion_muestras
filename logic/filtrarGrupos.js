"use strict";
const estadisticas = require('./estadisticas.js');
function filtrarGrupos(poblacion, datosPoblacion, personaPorGrupo, listadoPoblacion) {
    personaPorGrupo = personaPorGrupo ? personaPorGrupo : poblacion.length;
    let coleccionarPersona = [];
    return (persona) => {
        debugger;
        coleccionarPersona.push(persona);
        let resultado = true;
        let posicionInicioGrupoAnalizar = Math.floor(coleccionarPersona.length / personaPorGrupo) * personaPorGrupo;
        let posicionFinalGrupoAnalizar = posicionInicioGrupoAnalizar + personaPorGrupo;
        let grupoAnalizar = coleccionarPersona.filter((persona, index) => index <= posicionFinalGrupoAnalizar && index >= posicionInicioGrupoAnalizar);
        if (grupoAnalizar.length >= personaPorGrupo * 0.6) {
            for (let caracteristica in datosPoblacion.estadisticasPoblacion) {
                let habilidad = datosPoblacion.estadisticasPoblacion[caracteristica];
                let coleccionPuntajes = [];
                grupoAnalizar.forEach((personaAgregadas) => {
                    coleccionPuntajes.push(poblacion[personaAgregadas][caracteristica]);
                });
                let promedioGrupo = estadisticas.promedio(coleccionPuntajes);
                resultado = promedioGrupo >= habilidad.promedio - habilidad.varianza && promedioGrupo <= habilidad.promedio + habilidad.varianza; // trabajar con la varianza
                if (resultado === false) {
                    break;
                }
                else {
                    //console.log('coleccionarPersona', coleccionarPersona.length, resultado);
                }
                ;
            }
        }
        if (coleccionarPersona.length === listadoPoblacion.length || resultado === false) {
            coleccionarPersona = [];
        }
        return resultado;
    };
}
module.exports = filtrarGrupos;
