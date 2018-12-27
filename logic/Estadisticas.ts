'use strict';
//@ts-check

/**
 * @param {int[]}numeros
 * @returns {int}
 */
function promedio(numeros:number[]):number{
    return numeros.reduce((a,b)=>b+a)/numeros.length;
}
/**
 * @param {int[]}numeros
 * @returns {int}
 */
function varianza(numeros:number[]):number{
	let promedio1 = promedio(numeros);
	let diferencias = numeros.map(a => Math.pow( a - promedio1,2));
	return promedio( diferencias);
}
/**
 * @param {int[]}numeros
 * @returns {int} 
 */
function desviacionEstandar(numeros:number[]):number{
	return Math.sqrt( varianza(numeros));
}
function sumarTodosNumeros(array:any[]):number{
    return Array.isArray(array) && array.length > 0   ? array.reduce((a,b)=>{ 
		if (a.length > 0 ){
			a = sumarTodosNumeros(a);
		}
		if (b.length > 0 ){
			b = sumarTodosNumeros(b);
		}
		return a + b;
	}):0;
}
export interface Estadistica {
	promedio: (numeros:number[])=> number 
	varianza:(numeros:number[])=>number 
	desviacionEstandar:(numeros:number[])=>number
	sumarTodosNumeros:(array:any|number[][])=>number
}
export type tipoEstadistica = {
	promedio:  number 
	varianza:number 
	desviacionEstandar:number
	sumarTodosNumeros:number
}
var estadisticas:any ={promedio:promedio,
    varianza:varianza,
	desviacionEstandar:desviacionEstandar,
	sumarTodosNumeros:sumarTodosNumeros
};
export{estadisticas}



