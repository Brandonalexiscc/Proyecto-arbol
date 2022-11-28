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


    //separar los operadores de las expresiones 
    /**
     * It takes a string, separates the numbers and operators, and returns an array of the separated
     * values
     * @param expresion - "2+3*4"
     * @returns an array with the values of the expression separated by the operators.
     */
    separarValores(expresion){
        let array = [];
        let numero = "";
        for(let i = 0; i < expresion.length; i++){
            if(expresion[i] == "+" || expresion[i] == "-" || expresion[i] == "*" || expresion[i] == "/"){
                array.push(numero);
                array.push(expresion[i]);
                numero = "";
            }else{
                numero += expresion[i];
            }
        }
        array.push(numero);
        return array;
    }
}