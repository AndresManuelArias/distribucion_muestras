import {estadisticas,tipoEstadistica} from './Estadisticas';

type DatosPoblacion ={ 
    estadisticasPoblacion:any,
    caracteristicasPoblacion:any,
    listadoPersonas:string[]
}
type opcionFiltrado ={
    personaPorGrupo?:number
    porcentajesMaximoVarianza?:number
    porcentajesMinimoVarianza?:number
    minimoPersonasComenzarAnalizar?:number
    limiteGruposCorrecto?:number
}
type func=(persona:string)=>boolean;
function filtrarGrupos(datosPoblacion:DatosPoblacion,opcionFiltrado?:opcionFiltrado):func{
    let personaPorGrupo = opcionFiltrado.personaPorGrupo?opcionFiltrado.personaPorGrupo:datosPoblacion.caracteristicasPoblacion.length;
    let coleccionarPersona:string[] = [];
    let minimoPersonasComenzarAnalizar:number =  opcionFiltrado.minimoPersonasComenzarAnalizar?opcionFiltrado.minimoPersonasComenzarAnalizar:0
    let conteoGruposcorrectos = 0;
    let porcentajesMaximoVarianza:number=opcionFiltrado.porcentajesMaximoVarianza;
    let porcentajesMinimoVarianza:number=opcionFiltrado.porcentajesMinimoVarianza;
    let limiteGruposCorrecto:number = opcionFiltrado.limiteGruposCorrecto?opcionFiltrado.limiteGruposCorrecto:0
    return (persona:string)=>{
        debugger
        coleccionarPersona.push(persona)
        let resultado:boolean = true;
        let posicionInicioGrupoAnalizar:number=Math.floor(coleccionarPersona.length/personaPorGrupo)*personaPorGrupo
        let posicionFinalGrupoAnalizar:number=posicionInicioGrupoAnalizar+personaPorGrupo;
        let grupoAnalizar = coleccionarPersona.filter((persona,index)=> index <= posicionFinalGrupoAnalizar && index >= posicionInicioGrupoAnalizar)
        if( grupoAnalizar.length >= personaPorGrupo* minimoPersonasComenzarAnalizar){
            
            for(let caracteristica in datosPoblacion.estadisticasPoblacion){
                let habilidad:tipoEstadistica =datosPoblacion.estadisticasPoblacion[caracteristica]
                let coleccionPuntajes:number[]=[];
                grupoAnalizar.forEach((personaAgregadas:string)=>{
                    coleccionPuntajes.push(parseInt(datosPoblacion.caracteristicasPoblacion[personaAgregadas][caracteristica]))
                })
                let promedioGrupo = estadisticas.promedio(coleccionPuntajes)
                // console.log('promedioGrupo',promedioGrupo,'habilidad.promedio',habilidad.promedio,'coleccionPuntajes',coleccionPuntajes)
                resultado =      promedioGrupo >= habilidad.promedio - habilidad.varianza*porcentajesMinimoVarianza  && promedioGrupo <= habilidad.promedio +habilidad.varianza*porcentajesMaximoVarianza;// trabajar con la varianza
                if(resultado === false){ break}else{
                    console.log('coleccionarPersona',coleccionarPersona.length,resultado)                

                };
            }
        }
        // accion de prueba para cortar las combinaciones
        if(coleccionarPersona.length === datosPoblacion.listadoPersonas.length && limiteGruposCorrecto>0){
            conteoGruposcorrectos++;
            console.log('conteoGruposcorrectos',conteoGruposcorrectos)
            if(conteoGruposcorrectos === opcionFiltrado.limiteGruposCorrecto){
                resultado =false;
            }
        }
        // accion importante no borrar que permite generar los grupos
        if(coleccionarPersona.length === datosPoblacion.listadoPersonas.length || resultado === false){
            coleccionarPersona = [];
        }

        return resultado;
   };
}
function generarGrupos(posibilidades:string[][],personasPorGrupo:number):string[][][]{
    return  posibilidades.map(personas => {
        let grupo:string[] = []; 
        let grupos:string[][] = []; 
        let personasReverse = personas.reverse()
        
        for(let posiPersona in personasReverse){
            if (grupo.length>0 && grupo.length%personasPorGrupo === 0){
                grupos.push(grupo)
                grupo = []
            }
            grupo.push(personasReverse[posiPersona]);
            
        }
        if(grupo.length >0){
            grupos.push(grupo)
        }
        return  grupos
    })
}

function filtrarGrupo(datosPoblacion:DatosPoblacion,opcionFiltrado?:opcionFiltrado):(persona:string[])=>boolean{
    let porcentajesMaximoVarianza:number=opcionFiltrado.porcentajesMaximoVarianza;
    let porcentajesMinimoVarianza:number=opcionFiltrado.porcentajesMinimoVarianza;

    return (grupoAnalizar:string[]):boolean =>{
        let resultado:boolean = true;
        for(let caracteristica in datosPoblacion.estadisticasPoblacion){
            let habilidad:tipoEstadistica =datosPoblacion.estadisticasPoblacion[caracteristica]
            let coleccionPuntajes:number[]=[];
            grupoAnalizar.forEach((personaAgregadas:string)=>{
                coleccionPuntajes.push(parseInt(datosPoblacion.caracteristicasPoblacion[personaAgregadas][caracteristica]))
            })
            let promedioGrupo = estadisticas.promedio(coleccionPuntajes)
            // console.log('promedioGrupo',promedioGrupo,'habilidad.promedio',habilidad.promedio,'coleccionPuntajes',coleccionPuntajes)
            resultado =      promedioGrupo >= habilidad.promedio - habilidad.varianza*porcentajesMinimoVarianza  && promedioGrupo <= habilidad.promedio +habilidad.varianza*porcentajesMaximoVarianza;// trabajar con la varianza
            if(resultado === false){ break}
            return resultado
        }
    }
}
export { filtrarGrupos,generarGrupos,filtrarGrupo};

