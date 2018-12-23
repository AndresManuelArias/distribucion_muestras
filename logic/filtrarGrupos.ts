const estadisticas = require('./estadisticas.js');
type DatosPoblacion ={ 
    estadisticasPoblacion:any,
    caracteristicasPoblacion:any,
    listadoPersonas:string[]
}
type tipoEstadistica={ 
    promedio:number,
    varianza:number ,
    desviacionEstandar:number ,
    sumarTodosNumeros:number  
}
type func=(persona:string)=>boolean;
function filtrarGrupos(poblacion:any[string],datosPoblacion:DatosPoblacion,personaPorGrupo:number,listadoPoblacion:string[]):func{
    personaPorGrupo = personaPorGrupo?personaPorGrupo:poblacion.length;
    let coleccionarPersona:string[] = [];
    return (persona:string)=>{
        debugger
        coleccionarPersona.push(persona)
        let resultado:boolean = true;
        let posicionInicioGrupoAnalizar:number=Math.floor(coleccionarPersona.length/personaPorGrupo)*personaPorGrupo
        let posicionFinalGrupoAnalizar:number=posicionInicioGrupoAnalizar+personaPorGrupo;
        let grupoAnalizar = coleccionarPersona.filter((persona,index)=> index <= posicionFinalGrupoAnalizar && index >= posicionInicioGrupoAnalizar)
        if( grupoAnalizar.length >= personaPorGrupo*0.6){
            
            for(let caracteristica in datosPoblacion.estadisticasPoblacion){
                let habilidad:tipoEstadistica =datosPoblacion.estadisticasPoblacion[caracteristica]
                let coleccionPuntajes:number[]=[];
                grupoAnalizar.forEach((personaAgregadas:string)=>{
                    coleccionPuntajes.push(poblacion[personaAgregadas][caracteristica])
                })
                let promedioGrupo = estadisticas.promedio(coleccionPuntajes)
                resultado =      promedioGrupo >= habilidad.promedio - habilidad.varianza && promedioGrupo <= habilidad.promedio +habilidad.varianza;// trabajar con la varianza
                if(resultado === false){ break}else{
                    console.log('coleccionarPersona',coleccionarPersona.length,resultado)                

                };
            }
        }
        if(coleccionarPersona.length === listadoPoblacion.length || resultado === false){
            coleccionarPersona = [];
        }
        return resultado;
   };
}
export = filtrarGrupos;

