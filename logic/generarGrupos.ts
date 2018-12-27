// import combinaciones = require('./combinaciones');
// import  csvdata = require('csvdata');
import fs = require('fs');
// var csvdata = require('csvdata'),
 import  {Poblacion}  from './Poblacion';
 import {combinaciones} from './combinaciones';
 import {filtrarGrupos,generarGrupos} from './filtrarGrupos';
 let filePath:string = '../baseData/inteligencias multiples (respuestas) - creacion grupos.csv';
 var csvtoJsonSync = require("csvtojsonsync");

var poblacionEstudiar:any[] = csvtoJsonSync(filePath,",");

console.log(poblacionEstudiar);
var columnas:string[] =  ['INTELIGENCIA FÍSICA Y KINESTÉTICA',
'INTELIGENCIA INTRAPERSONAL',
'INTELIGENCIA LÓGICO MATEMATICA',
'INTELIGENCIA INTERPERSONAL',
'INTELIGENCIA VISUAL Y ESPACIAL',
'INTELIGENCIA NATURAL',
'INTELIGENCIA LINGÜÍSTICA',
'INTELIGENCIA MUSICAL'];
let datosPoblacion = new Poblacion(poblacionEstudiar,'nombre',columnas);
console.log('poblacion',datosPoblacion)
let numeroPersonasPorgrupo:number = 4
let filtrar =  filtrarGrupos(datosPoblacion,{personaPorGrupo:numeroPersonasPorgrupo,porcentajesMaximoVarianza:0,porcentajesMinimoVarianza:0,minimoPersonasComenzarAnalizar:0.6,limiteGruposCorrecto:1}) ;
let    resyl=combinaciones(datosPoblacion.listadoPersonas,filtrar).filter(grupo => {
   console.log(grupo.length == datosPoblacion.listadoPersonas.length,grupo.length ,datosPoblacion.listadoPersonas.length)
   return  grupo.length == datosPoblacion.listadoPersonas.length
})
// console.log('resyl',resyl.length)
let formacionGrupoDePosibilidades = generarGrupos(resyl,numeroPersonasPorgrupo)
fs.writeFileSync('../baseData/gruposOrganizados3.json', JSON.stringify(formacionGrupoDePosibilidades), 'utf8');        






