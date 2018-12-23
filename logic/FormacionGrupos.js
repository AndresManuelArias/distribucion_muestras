'use strict';
//@ts-check
function mostrarNumeroPersonasPorGrupo( cantidadDePersonas, numeroGruposEnPoblacion){
    return cantidadDePersonas / numeroGruposEnPoblacion;
}
function mostrarCantidadDegrupos(cantidadDePersonas,numeroPersonasPorMuestra){
    return cantidadDePersonas /numeroPersonasPorMuestra;
}
function definirNumeroPersonasYGrupos(configurarPoblacion,cantidadDePersonas){   
    let caracteristicasMuestra = { numeroPersonasPorMuestra:0,
                                    numeroGruposEnPoblacion:0};
    if(configurarPoblacion.numeroGruposEnPoblacion !== undefined){
        caracteristicasMuestra.numeroPersonasPorMuestra = Math.floor(mostrarNumeroPersonasPorGrupo( cantidadDePersonas, configurarPoblacion.numeroGruposEnPoblacion));
        caracteristicasMuestra.numeroGruposEnPoblacion =  configurarPoblacion.numeroGruposEnPoblacion;
        caracteristicasMuestra.sobrante = cantidadDePersonas % caracteristicasMuestra.numeroGruposEnPoblacion;        
    }else if(configurarPoblacion.numeroPersonasPorMuestra !== undefined){
        caracteristicasMuestra.numeroGruposEnPoblacion =  Math.floor(mostrarCantidadDegrupos(cantidadDePersonas,configurarPoblacion.numeroPersonasPorMuestra));
        caracteristicasMuestra.numeroPersonasPorMuestra = configurarPoblacion.numeroPersonasPorMuestra;
        caracteristicasMuestra.sobrante = cantidadDePersonas % caracteristicasMuestra.numeroPersonasPorMuestra;
    }
    return caracteristicasMuestra;
}
class FormacionGrupos{
    constructor(configurarPoblacion,cantidadDePersonas){
      this.cantidadGruposYPersonas = definirNumeroPersonasYGrupos(configurarPoblacion,cantidadDePersonas);
    }
    mostrarCantidadGruposYPersonas(){
        return this.cantidadGruposYPersonas;
    }
}

module.exports = FormacionGrupos;

