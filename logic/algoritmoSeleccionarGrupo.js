"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var comb = require("combinations-generator");
function generatorTeam(peoples, option) {
    debugger;
    console.log('peoples', peoples, 'option', option);
    let personasPorGrupo = option.personasPorGrupo <= peoples.length ? option.personasPorGrupo : peoples.length;
    let coleccionIterator = [];
    for (let item of comb(peoples, personasPorGrupo)) {
        coleccionIterator.push(item);
    }
    console.log('personasPorGrupo', personasPorGrupo, 'coleccionIterator', coleccionIterator);
    let iteratorQuePasan = coleccionIterator.filter((peoples) => option.criterioFiltrar(peoples));
    let coleccion = [];
    for (let item of iteratorQuePasan) {
        console.log('item', item);
        let peopleFilter = peoples.filter((people) => !item.some(p => p === people));
        if (peopleFilter.length > 0) {
            let posibilidades = generatorTeam(peopleFilter, option);
            let formacionGrupos = posibilidades.map((datos) => datos.concat([item]));
            coleccion = coleccion.concat(formacionGrupos);
        }
        else {
            return [[item]];
        }
        console.log('coleccion terminando', coleccion);
        if (option.totalPosibilidades && coleccion.length >= option.totalPosibilidades) {
            break;
        }
    }
    return coleccion;
}
exports.generatorTeam = generatorTeam;
