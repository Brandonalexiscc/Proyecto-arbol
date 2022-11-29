/*
Crear un analizador de expresiones aritméticas, por ejemplo: 1+5*9-8/5 considerando lo siguiente
Las expresiones pueden ser con las operaciones suma, resta, multiplicación y división, no se usarán paréntesis.
Los números serán de 1 solo dígito.
El desarrollo debe incluir las siguientes tres funcionalidades
1.- Tomar la expresión y generar el árbol binario, imprimiendo la notación preorder y postorder
2.- Tomar una expresión preorder y generar el resultado
3.-Tomar una expresión postorder y generar el resultado
*/

class Nodo {
    constructor(valor) {
        this.valor = valor;
        this.izq = null;
        this.der = null;
        this.siguiente = null;
        this.anterior = null;
    }
}

class ArbolBinario {
    constructor(expresion) {
        this.expresion = expresion;
        this.raiz = null;
        this.primero = null;
        this.ultimo = null;
        this.pre = [];
        this.post = [];
    }

    separarExpresion(){
        let expresion = this.expresion.split('');

        for (let i = 0; i < expresion.length; i++) {
            this.agregar(expresion[i]);
        }
        return this.crearArbol();
    }

    agregar(valor){
        let nodo = new Nodo(valor);

        if (this.primero == null) {
            this.primero = nodo;
            this.ultimo = nodo;
        } else {
            this.ultimo.siguiente = nodo;
            nodo.anterior = this.ultimo;
            this.ultimo = nodo;
        }
    }
/**
 * It creates a tree from a list of numbers and operators.
 * @param nodo - is the node that will be created
 * @returns The root of the tree.
 */

    crearArbol(nodo){
        let aux = this.primero;
        while(aux != null){
            if(aux.valor == "+" || aux.valor == "-"){
                nodo = new Nodo(aux.valor);
                nodo.izq = new Nodo(aux.anterior.valor);
                nodo.der = new Nodo(aux.siguiente.valor);
                aux.anterior.anterior.siguiente = nodo;
                nodo.anterior = aux.anterior.anterior;
                aux.siguiente.siguiente.anterior = nodo;
                nodo.siguiente = aux.siguiente.siguiente;
                aux = aux.siguiente;
            }
            aux = aux.siguiente;
        }
        aux = this.primero;
        while(aux != null){
            if(aux.valor == "*" || aux.valor == "/"){
                nodo = new Nodo(aux.valor);
                nodo.izq = new Nodo(aux.anterior.valor);
                nodo.der = new Nodo(aux.siguiente.valor);
                aux.anterior.anterior.siguiente = nodo;
                nodo.anterior = aux.anterior.anterior;
                aux.siguiente.siguiente.anterior = nodo;
                nodo.siguiente = aux.siguiente.siguiente;
                aux = aux.siguiente;
            }
            aux = aux.siguiente;
        }

        this.raiz = this.primero;
        return this.raiz;
    }

    preorder(nodo){
        if(nodo != null){
            this.pre.push(nodo.valor);
            this.preorder(nodo.izq);
            this.preorder(nodo.der);
        }
        return this.pre;
    }

    postorder(nodo){
        if(nodo != null){
            this.postorder(nodo.izq);
            this.postorder(nodo.der);
            this.post.push(nodo.valor);
        }
        return this.post;
    }


    resultadoPreorder(nodo){
        
    }

    resultadoPostorder(nodo){
    }



}

let arbol = new ArbolBinario('1+5*9-8/5');
arbol.separarExpresion();
console.log(arbol.postorder);
