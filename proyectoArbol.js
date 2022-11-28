class Nodo{
    constructor(valor){
        this.valor = valor;
        this.derecha = null;
        this.izquierda = null;
        this.anterior = null;
        this.siguiente = null;
    }
}

class ArbolBinario{
    constructor(){
        this.raiz = null;
        this.pre = [];
        this.post = [];
    }
/**
 * It takes a string, and returns an array of numbers and operators.
 * @param expresion - "2+2"
 * @returns An array of numbers and operators.
 */

    separarValores(expresion){
        let aux = new Array.from(expresion);
        for(let i = 0; i < aux.lenght; i++){
            if(aux[i] != "+"){
                if(aux[i] != "-"){
                    if(aux[i] != "/"){
                        if(aux[i] != "*"){
                            let number = aux[i];
                            aux[i] = parseInt(number, 10);
                        }
                    }
                }
            }
        }
        return aux; 
    }
}