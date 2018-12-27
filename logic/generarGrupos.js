"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// import combinaciones = require('./combinaciones');
// import  csvdata = require('csvdata');
const fs = require("fs");
// var csvdata = require('csvdata'),
const Poblacion_1 = require("./Poblacion");
const combinaciones_1 = require("./combinaciones");
const filtrarGrupos_1 = require("./filtrarGrupos");
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
let numeroPersonasPorgrupo = 4;
let filtrar = filtrarGrupos_1.filtrarGrupos(datosPoblacion, { personaPorGrupo: numeroPersonasPorgrupo, porcentajesMaximoVarianza: 0, porcentajesMinimoVarianza: 0, minimoPersonasComenzarAnalizar: 0.6, limiteGruposCorrecto: 1 });
let resyl = combinaciones_1.combinaciones(datosPoblacion.listadoPersonas, filtrar).filter(grupo => {
    console.log(grupo.length == datosPoblacion.listadoPersonas.length, grupo.length, datosPoblacion.listadoPersonas.length);
    return grupo.length == datosPoblacion.listadoPersonas.length;
});
// console.log('resyl',resyl.length)
let formacionGrupoDePosibilidades = filtrarGrupos_1.generarGrupos(resyl, numeroPersonasPorgrupo);
fs.writeFileSync('../baseData/gruposOrganizados3.json', JSON.stringify(formacionGrupoDePosibilidades), 'utf8');
