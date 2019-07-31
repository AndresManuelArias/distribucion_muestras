// import combinaciones = require('./combinaciones');
// import  csvdata = require('csvdata');
// este es el ultimo que se elaboro generando todas posiblidades las azar de grupo
// es importante seprara el codigo de la libreria del ejecutable
import fs = require('fs');
// var csvdata = require('csvdata'),
 import  {Poblacion}  from './Poblacion';
 import {combinaciones} from './combinaciones';
 import {filtrarGrupos,generarGrupos,filtrarGrupo} from './filtrarGrupos';
 import {generatorTeam} from './algoritmoSeleccionarGrupo';

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
let filtrado= filtrarGrupo(datosPoblacion,{porcentajesMaximoVarianza:0.03,porcentajesMinimoVarianza:0.03})

let    resultado=generatorTeam(datosPoblacion.listadoPersonas,{ personasPorGrupo:4,criterioFiltrar:filtrado,totalPosibilidades:5})
console.log('resultado',resultado)

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






