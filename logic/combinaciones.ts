var conteo:number = 0;
function combinaciones(array:any[],corte?:(dato:string|number,conteoRecursividad?:number)=> boolean){
   debugger;
   console.log(conteo++)
   let coleccion:any[] = [];
   for(let dato of array){
        debugger;
        let continuar:boolean = typeof corte == "function"?corte(dato,conteo):true;
        if(continuar){
            if(array.length >1 ){
                let nuevoArray:any[] = array.filter(dato2=>   dato2 !== dato  );            
                let combinacion:any[] = combinaciones( nuevoArray,corte);
                combinacion = combinacion.map(datos => datos.concat(dato))
                coleccion =  coleccion.concat( combinacion);    
            }else{
                return [array];
            }         
        }  
    }
    return coleccion;
}
export  {combinaciones}
combinaciones([1,2,3,4,5])
// combinaciones([1,2,3,4,5]).filter((dato,index, array)=>{

// 	return array.filter(dato1 => {
// 		return JSON.stringify(dato1)===  JSON.stringify(dato)
// 	}).length  === 1
// })
// [1,2,3,4,5,6,7,8].reduce((a,b)=> a*b)