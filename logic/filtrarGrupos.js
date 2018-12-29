"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Estadisticas_1 = require("./Estadisticas");
function filtrarGrupos(datosPoblacion, opcionFiltrado) {
    let personaPorGrupo = opcionFiltrado.personaPorGrupo ? opcionFiltrado.personaPorGrupo : datosPoblacion.caracteristicasPoblacion.length;
    let coleccionarPersona = [];
    let minimoPersonasComenzarAnalizar = opcionFiltrado.minimoPersonasComenzarAnalizar ? opcionFiltrado.minimoPersonasComenzarAnalizar : 0;
    let conteoGruposcorrectos = 0;
    let porcentajesMaximoVarianza = opcionFiltrado.porcentajesMaximoVarianza;
    let porcentajesMinimoVarianza = opcionFiltrado.porcentajesMinimoVarianza;
    let limiteGruposCorrecto = opcionFiltrado.limiteGruposCorrecto ? opcionFiltrado.limiteGruposCorrecto : 0;
    return (persona) => {
        debugger;
        coleccionarPersona.push(persona);
        let resultado = true;
        let posicionInicioGrupoAnalizar = Math.floor(coleccionarPersona.length / personaPorGrupo) * personaPorGrupo;
        let posicionFinalGrupoAnalizar = posicionInicioGrupoAnalizar + personaPorGrupo;
        let grupoAnalizar = coleccionarPersona.filter((persona, index) => index <= posicionFinalGrupoAnalizar && index >= posicionInicioGrupoAnalizar);
        if (grupoAnalizar.length >= personaPorGrupo * minimoPersonasComenzarAnalizar) {
            for (let caracteristica in datosPoblacion.estadisticasPoblacion) {
                let habilidad = datosPoblacion.estadisticasPoblacion[caracteristica];
                let coleccionPuntajes = [];
                grupoAnalizar.forEach((personaAgregadas) => {
                    coleccionPuntajes.push(parseInt(datosPoblacion.caracteristicasPoblacion[personaAgregadas][caracteristica]));
                });
                let promedioGrupo = Estadisticas_1.estadisticas.promedio(coleccionPuntajes);
                // console.log('promedioGrupo',promedioGrupo,'habilidad.promedio',habilidad.promedio,'coleccionPuntajes',coleccionPuntajes)
                resultado = promedioGrupo >= habilidad.promedio - habilidad.varianza * porcentajesMinimoVarianza && promedioGrupo <= habilidad.promedio + habilidad.varianza * porcentajesMaximoVarianza; // trabajar con la varianza
                if (resultado === false) {
                    break;
                }
                else {
                    console.log('coleccionarPersona', coleccionarPersona.length, resultado);
                }
                ;
            }
        }
        // accion de prueba para cortar las combinaciones
        if (coleccionarPersona.length === datosPoblacion.listadoPersonas.length && limiteGruposCorrecto > 0) {
            conteoGruposcorrectos++;
            console.log('conteoGruposcorrectos', conteoGruposcorrectos);
            if (conteoGruposcorrectos === opcionFiltrado.limiteGruposCorrecto) {
                resultado = false;
            }
        }
        // accion importante no borrar que permite generar los grupos
        if (coleccionarPersona.length === datosPoblacion.listadoPersonas.length || resultado === false) {
            coleccionarPersona = [];
        }
        return resultado;
    };
}
exports.filtrarGrupos = filtrarGrupos;
function generarGrupos(posibilidades, personasPorGrupo) {
    return posibilidades.map(personas => {
        let grupo = [];
        let grupos = [];
        let personasReverse = personas.reverse();
        for (let posiPersona in personasReverse) {
            if (grupo.length > 0 && grupo.length % personasPorGrupo === 0) {
                grupos.push(grupo);
                grupo = [];
            }
            grupo.push(personasReverse[posiPersona]);
        }
        if (grupo.length > 0) {
            grupos.push(grupo);
        }
        return grupos;
    });
}
exports.generarGrupos = generarGrupos;
function filtrarGrupo(datosPoblacion, opcionFiltrado) {
    let porcentajesMaximoVarianza = opcionFiltrado.porcentajesMaximoVarianza;
    let porcentajesMinimoVarianza = opcionFiltrado.porcentajesMinimoVarianza;
    return (grupoAnalizar) => {
        let resultado = true;
        for (let caracteristica in datosPoblacion.estadisticasPoblacion) {
            let habilidad = datosPoblacion.estadisticasPoblacion[caracteristica];
            let coleccionPuntajes = [];
            grupoAnalizar.forEach((personaAgregadas) => {
                coleccionPuntajes.push(parseInt(datosPoblacion.caracteristicasPoblacion[personaAgregadas][caracteristica]));
            });
            let promedioGrupo = Estadisticas_1.estadisticas.promedio(coleccionPuntajes);
            // console.log('promedioGrupo',promedioGrupo,'habilidad.promedio',habilidad.promedio,'coleccionPuntajes',coleccionPuntajes)
            resultado = promedioGrupo >= habilidad.promedio - habilidad.varianza * porcentajesMinimoVarianza && promedioGrupo <= habilidad.promedio + habilidad.varianza * porcentajesMaximoVarianza; // trabajar con la varianza
            if (resultado === false) {
                break;
            }
            return resultado;
        }
    };
}
exports.filtrarGrupo = filtrarGrupo;
