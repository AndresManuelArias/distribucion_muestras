var comb = require("combinations-generator");
/*
function promedio(array){
    return array.reduce((a,b)=>a+b)/array.length
    }
resultado=generatorTeam(['1','2','3','4','5','6','7','8','9','10','11','12'],{ personasPorGrupo:12,
    criterioFiltrar:(a2) => { 
       return promedio(a2)<= promedio([1,2,3,4,5,6,7,8,9,10,11,12])+1 || promedio(a2) >= promedio([1,2,3,4,5,6,7,8,9,10,11,12])-1
    }
})
resultado=generatorTeam([1,2,3,4,5,6,7,8,9,10,11,12],{ personasPorGrupo:11,criterioFiltrar:(a2) => promedio(a2)<= promedio([1,2,3,4,5,6,7,8,9,10,11,12])+2 && promedio(a2)>= promedio([1,2,3,4,5,6,7,8,9,10,11,12])-2,totalPersonas:12})
var comb = function* (array, count) {
    if (array === undefined) {
      array = [];
    }
    if (count === undefined) {
      count = 0;
    }
    var keys = [];
    var arrayLength = array.length;
    var index = 0;
    for (var i = 0; i < count; i++) {
      keys.push(-1);
    }
    while (index >= 0) {
      if (keys[index] < arrayLength - (count - index)) {
        for (var key = keys[index] - index + 1; index < count; index++) {
          keys[index] = key + index;
        }
        yield keys.map(function (c) {
          return array[c];
        });
      } else {
        index--;
      }
    }
  };
*/
// var array = ["a", "b", "c"]
 
// var iterator = comb(array, 2);
 
// for (var item of iterator) {
//   console.log(item);
// }
type option = {
    personasPorGrupo:number,
    totalPosibilidades?:number,
    criterioFiltrar:(people:string[])=>boolean
}
function generatorTeam(peoples:string[],option:option):string[][][]{
    debugger;
    console.log('peoples',peoples,'option',option)
    let personasPorGrupo = option.personasPorGrupo <= peoples.length? option.personasPorGrupo:peoples.length
    let coleccionIterator:string[][] = [];
    for (let item of comb(peoples, personasPorGrupo)) {
        coleccionIterator.push(item)
    }
    console.log('personasPorGrupo',personasPorGrupo,'coleccionIterator',coleccionIterator)
    let iteratorQuePasan:string[][] = coleccionIterator.filter((peoples:string[])=> option.criterioFiltrar(peoples))
    let coleccion:string[][][]= [];  
    for (let item of iteratorQuePasan) {
        console.log('item', item);
        let peopleFilter = peoples.filter((people) => !item.some(p => p === people));
        if (peopleFilter.length > 0) {
            let posibilidades = generatorTeam(peopleFilter,option)
            let formacionGrupos= posibilidades.map((datos)=>  datos.concat([item]))
            coleccion = coleccion.concat(formacionGrupos )            
        }else{
            return [[item]]
        }
        console.log('coleccion terminando', coleccion);
        if(option.totalPosibilidades && coleccion.length >= option.totalPosibilidades){ break}

    }
    return coleccion
}
export{generatorTeam}

