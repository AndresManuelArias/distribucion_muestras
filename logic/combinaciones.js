"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var conteo = 0;
function combinaciones(array, corte) {
    debugger;
    console.log(conteo++);
    let coleccion = [];
    for (let dato of array) {
        debugger;
        let continuar = typeof corte == "function" ? corte(dato, conteo) : true;
        if (continuar) {
            if (array.length > 1) {
                let nuevoArray = array.filter(dato2 => dato2 !== dato);
                let combinacion = combinaciones(nuevoArray, corte);
                combinacion = combinacion.map(datos => datos.concat(dato));
                coleccion = coleccion.concat(combinacion);
            }
            else {
                return [array];
            }
        }
    }
    return coleccion;
}
exports.combinaciones = combinaciones;
combinaciones([1, 2, 3, 4, 5]);
// combinaciones([1,2,3,4,5]).filter((dato,index, array)=>{
// 	return array.filter(dato1 => {
// 		return JSON.stringify(dato1)===  JSON.stringify(dato)
// 	}).length  === 1
// })
// [1,2,3,4,5,6,7,8].reduce((a,b)=> a*b)
