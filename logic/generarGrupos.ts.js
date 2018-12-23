// import combinaciones = require('./combinaciones');
// import  csvdata = require('csvdata');
var csvdata = require('csvdata'),
 Poblacion = require('./Poblacion.js'),
 combinaciones = require('./combinaciones'),
 filtrarGrupos= require('./filtrarGrupos.js'),
 filePath = '../baseData/inteligencias multiples (respuestas) - creacion grupos.csv';


let  datosPoblacion = {}
csvdata.load(filePath, {
    delimiter: ',',
    log: true,
    objName: false,
    stream: false
}).then((poblacionEstudiar)=>{
    console.log(poblacionEstudiar);
     datosPoblacion = new Poblacion(poblacionEstudiar,'nombre',
        ['INTELIGENCIA FÍSICA Y KINESTÉTICA ',
        'INTELIGENCIA INTRAPERSONAL ',
        'INTELIGENCIA LÓGICO MATEMATICA ',
        'INTELIGENCIA INTERPERSONAL ',
        'INTELIGENCIA VISUAL Y ESPACIAL ',
        'INTELIGENCIA NATURAL ',
        'INTELIGENCIA LINGÜÍSTICA ',
        'INTELIGENCIA MUSICAL ']);
         console.log('poblacion',datosPoblacion)
         let filtrar =  filtrarGrupos(datosPoblacion.caracteristicasPoblacion,datosPoblacion,3,datosPoblacion.listadoPersonas) ;
        resyl=combinaciones(datosPoblacion.listadoPersonas,filtrar)
console.log('resyl',resyl.length)
    });




