'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
//@ts-check
/**
 * @param {int[]}numeros
 * @returns {int}
 */
function promedio(numeros) {
    return numeros.reduce((a, b) => b + a) / numeros.length;
}
/**
 * @param {int[]}numeros
 * @returns {int}
 */
function varianza(numeros) {
    let promedio1 = promedio(numeros);
    let diferencias = numeros.map(a => Math.pow(a - promedio1, 2));
    return promedio(diferencias);
}
/**
 * @param {int[]}numeros
 * @returns {int}
 */
function desviacionEstandar(numeros) {
    return Math.sqrt(varianza(numeros));
}
function sumarTodosNumeros(array) {
    return Array.isArray(array) && array.length > 0 ? array.reduce((a, b) => {
        if (a.length > 0) {
            a = sumarTodosNumeros(a);
        }
        if (b.length > 0) {
            b = sumarTodosNumeros(b);
        }
        return a + b;
    }) : 0;
}
var estadisticas = { promedio: promedio,
    varianza: varianza,
    desviacionEstandar: desviacionEstandar,
    sumarTodosNumeros: sumarTodosNumeros
};
exports.estadisticas = estadisticas;
