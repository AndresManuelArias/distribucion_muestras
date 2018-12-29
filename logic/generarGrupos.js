"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// import combinaciones = require('./combinaciones');
// import  csvdata = require('csvdata');
const fs = require("fs");
// var csvdata = require('csvdata'),
const Poblacion_1 = require("./Poblacion");
const filtrarGrupos_1 = require("./filtrarGrupos");
const algoritmoSeleccionarGrupo_1 = require("./algoritmoSeleccionarGrupo");
let filePath = '../baseData/inteligencias multiples (respuestas) - creacion grupos.csv';
var csvtoJsonSync = require("csvtojsonsync");
var poblacionEstudiar = csvtoJsonSync(filePath, ",");
console.log(poblacionEstudiar);
var columnas = ['INTELIGENCIA FÍSICA Y KINESTÉTICA',
    'INTELIGENCIA INTRAPERSONAL',
    'INTELIGENCIA LÓGICO MATEMATICA',
    'INTELIGENCIA INTERPERSONAL',
    'INTELIGENCIA VISUAL Y ESPACIAL',
    'INTELIGENCIA NATURAL',
    'INTELIGENCIA LINGÜÍSTICA',
    'INTELIGENCIA MUSICAL'];
let datosPoblacion = new Poblacion_1.Poblacion(poblacionEstudiar, 'nombre', columnas);
console.log('poblacion', datosPoblacion);
let filtrado = filtrarGrupos_1.filtrarGrupo(datosPoblacion, { porcentajesMaximoVarianza: 0, porcentajesMinimoVarianza: 0 });
let resultado = algoritmoSeleccionarGrupo_1.generatorTeam(datosPoblacion.listadoPersonas, { personasPorGrupo: 4, criterioFiltrar: filtrado, totalPersonas: datosPoblacion.listadoPersonas.length });
// let numeroPersonasPorgrupo:number = 4
// let filtrar =  filtrarGrupos(datosPoblacion,{personaPorGrupo:numeroPersonasPorgrupo,porcentajesMaximoVarianza:0,porcentajesMinimoVarianza:0,minimoPersonasComenzarAnalizar:0.6,limiteGruposCorrecto:1}) ;
// let    resyl=combinaciones(datosPoblacion.listadoPersonas,filtrar).filter(grupo => {
//    console.log(grupo.length == datosPoblacion.listadoPersonas.length,grupo.length ,datosPoblacion.listadoPersonas.length)
//    return  grupo.length == datosPoblacion.listadoPersonas.length
// })
// // console.log('resyl',resyl.length)
// let formacionGrupoDePosibilidades = generarGrupos(resyl,numeroPersonasPorgrupo)
// fs.writeFileSync('../baseData/gruposOrganizados3.json', JSON.stringify(formacionGrupoDePosibilidades), 'utf8');  
fs.writeFileSync('../baseData/gruposOrganizados4.json', JSON.stringify(resultado), 'utf8');
