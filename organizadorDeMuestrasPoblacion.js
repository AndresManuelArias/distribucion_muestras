'use strict';
//@ts-check

const csvdata = require('csvdata'),
 fs = require('fs'),
 FormacionGrupos = require('./logic/FormacionGrupos.js'),
 Poblacion = require('./logic/Poblacion.js'),
 CombinacionGrupos = require('./logic/CombinacionesGrupos.js'),
 filePath = './baseData/inteligencias multiples (respuestas) - creacion grupos.csv';



csvdata.load(filePath, {
    delimiter: ',',
    log: true,
    objName: false,
    stream: false
}).then((poblacionEstudiar)=>{
    console.log(poblacionEstudiar);
    let formacionGrupos = new FormacionGrupos({numeroPersonasPorMuestra:4},poblacionEstudiar.length);
    let poblacion = new Poblacion.Poblacion(poblacionEstudiar,'nombre',
        ['INTELIGENCIA FÍSICA Y KINESTÉTICA ',
        'INTELIGENCIA INTRAPERSONAL ',
        'INTELIGENCIA LÓGICO MATEMATICA ',
        'INTELIGENCIA INTERPERSONAL ',
        'INTELIGENCIA VISUAL Y ESPACIAL ',
        'INTELIGENCIA NATURAL ',
        'INTELIGENCIA LINGÜÍSTICA ',
        'INTELIGENCIA MUSICAL ']);
    // console.log(formacionGrupos.mostrarCantidadGruposYPersonas());
    // console.log(poblacion.mostrarEstadisticasCaracteristicasPoblacion());
    // console.log(poblacion.mostrarJsonConCaracteristicasPoblacion());
    const poblacionEstudiarJson = poblacion.mostrarJsonConCaracteristicasPoblacion(),
    estadisticaCaracteristicasPoblacion = poblacion.mostrarEstadisticasCaracteristicasPoblacion(),
    cantidadGruposYpersonas  = formacionGrupos.mostrarCantidadGruposYPersonas();
   console.log('poblacionEstudiarJson',poblacionEstudiarJson);
   console.log('estadisticaCaracteristicasPoblacion',estadisticaCaracteristicasPoblacion);

    let combinacionGrupos = new CombinacionGrupos(poblacionEstudiarJson,estadisticaCaracteristicasPoblacion);
    let posibilidadesdeGrupos  = combinacionGrupos.generarCombinacionesDeMuestrasArbol(cantidadGruposYpersonas,500);// se genera varios arrays con distintas combinaciones, pero mostrando las mas optimas
    // es neceario crear una funcion que clasifique los grupos generados cuando se utiliza un metodo de permutacion tradicional
    console.log('cantidadGruposYpersonas',cantidadGruposYpersonas);
    console.log('combinaciones',posibilidadesdeGrupos.length,posibilidadesdeGrupos);

// las posibles combinaciones son separadas por los grupos que se esperan
    let formacionGrupoDePosibilidades = combinacionGrupos.generarGruposDeposibilidadesGrupos(posibilidadesdeGrupos,cantidadGruposYpersonas);
    console.log('formacionGrupoDePosibilidades',formacionGrupoDePosibilidades.length);
    formacionGrupoDePosibilidades.forEach(posibilidad =>{
        console.log('posibilidad grupos', posibilidad.length);
        posibilidad.forEach((personas)=>{
            console.log('personas',personas.length);
        });
    })
    fs.writeFileSync('baseData/gruposOrganizados.json', JSON.stringify(formacionGrupoDePosibilidades), 'utf8');
});