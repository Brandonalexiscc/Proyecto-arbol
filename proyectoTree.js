
class Nodo {
    constructor(valor) {
        this.valor = valor;
        this.izq = null;
        this.der = null;
        this.siguiente = null;
        this.anterior = null;
        this.indice = null
    }
}

class ArbolBinario {
    constructor() {
        this.raiz = null;
        this.primero = null;
        this.ultimo = null;
        this.pre = [];
        this.post = [];
    }
    getPre() {
        return this.pre;

    }

    getPost() {
        return this.post;

    }

    operaciones(op, i, d) {
        let resultado;
        switch (op) {
            case '+':
                resultado = i + d;
                break;
            case '-':
                resultado = i - d;
                break;
            case '*':
                resultado = i * d;
                break;
            case '/':

                resultado = i / d;
                break;
        }
        return resultado;
    }
    insertar(expresion) {
        let expresion_d = this.agregarNodo(expresion);
        for (let i = 0; i < expresion_d.length; i++) {
            if (this.primero == null) {
                this.primero = expresion_d[i];
                this.primero.siguiente = expresion_d[i + 1];

            } else {
                expresion_d[i].siguiente = expresion_d[i + 1];
                expresion_d[i].anterior = expresion_d[i - 1];
            }

        }
        return expresion_d;
    }

    agregarNodo(expresion) {
        let arreglo = [];
        for (let i = 0; i < expresion.length; i++) {
            let nodo = new Nodo(expresion[i]);
            nodo.indice = i;
            arreglo.push(nodo);
        }
        return arreglo;
    }

    crearArbol() {
        let aux = this.primero;
        let raiz = null;
        while (aux != null) {
            if ((aux.valor === '*' || aux.valor === '/')) {
                aux.der = aux.siguiente;
                aux.izq = aux.anterior;
                if (aux.siguiente.siguiente == undefined && aux.anterior.anterior == undefined) {
                    aux.siguiente = null;
                    aux.anterior = null;
                } else if (aux.siguiente.siguiente == undefined) {
                    aux.siguiente = null;
                    aux.anterior = aux.anterior.anterior;
                    aux.anterior.siguiente = aux;
                } else if (aux.anterior.anterior == undefined) {
                    aux.anterior = null;
                    aux.siguiente = aux.siguiente.siguiente;
                    aux.siguiente.anterior = aux;
                } else {
                    aux.siguiente = aux.siguiente.siguiente;
                    aux.anterior = aux.anterior.anterior;
                    aux.siguiente.anterior = aux;
                    aux.anterior.siguiente = aux;
                }
                raiz = aux;
            }
            aux = aux.siguiente;
        }
        this.raiz = raiz;
        aux = this.primero;
        while (aux != null) {
            if ((aux.valor === '-' || aux.valor === '+')) {
                aux.der = aux.siguiente;
                aux.izq = aux.anterior;
                if (aux.siguiente.siguiente == undefined
                    && aux.anterior.anterior == undefined) {
                    aux.siguiente = null;
                    aux.anterior = null;
                } else if (aux.siguiente.siguiente == undefined) {
                    aux.siguiente = null;
                    aux.anterior = aux.anterior.anterior;
                    aux.anterior.siguiente = aux;
                } else if (aux.anterior.anterior == undefined) {
                    aux.anterior = null;
                    aux.siguiente = aux.siguiente.siguiente;
                    aux.siguiente.anterior = aux;
                } else {
                    aux.siguiente = aux.siguiente.siguiente;
                    aux.anterior = aux.anterior.anterior;
                    aux.siguiente.anterior = aux;
                    aux.anterior.siguiente = aux;
                }
                raiz = aux;
            }
            aux = aux.siguiente;
        }
        this.raiz = raiz
    }

    preorder() {
        this.pre = new Array();
        if (this.raiz == null) {
            return false;
        } else {
            this._preOrder(this.raiz);
        }
    }

    _preOrder(nodox) {
        this.pre.push(nodox.valor);
        if (nodox.izq != null) {
            this._preOrder(nodox.izq);
        }
        if (nodox.der != null) {
            this._preOrder(nodox.der);
        }

    }

    postorder() {
        this.post = new Array();
        if (this.raiz == null) {
            return false;
        } else {
            this._postOrder(this.raiz);
        }
    }

    _postOrder(nodox) {

        if (nodox.izq != null) {
            this._postOrder(nodox.izq);
        }
        if (nodox.der != null) {
            this._postOrder(nodox.der);
        }
        this.post.push(nodox.valor);

    }

    imprimirPre() {
        console.log(this.pre);
    }

    imprimirPost() {
        console.log(this.post);
    }

    convertirANumeroprePos() {
        let arreglo = [];
        for (let i = 0; i < this.pre.length; i++) {
            if (this.pre[i] != '+' || this.pre[i] != '-' || this.pre[i] != '*' || this.pre[i] != '/') {
                let aux = Number(this.pre[i]);
                this.pre[i] = aux;
                arreglo.push(aux);
            } else {
                let aux = this.pre[i];
                arreglo.push(aux);
            }

        }
        this.pre = arreglo;
        arreglo = [];
        for (let i = 0; i < this.post.length; i++) {
            if (this.post[i] != '+' || this.post[i] != '-' || this.post[i] != '*' || this.post[i] != '/') {
                let aux = Number(this.post[i]);
                this.post[i] = aux;
                arreglo.push(aux);
            } else {
                let aux = this.post[i];
                arreglo.push(aux);
            }

        }
        this.post = arreglo;
    }



    resultadopre(preorder) {
        let vector = preorder;
        let aux = 0;
        for (let i = vector.length; i >= 0; i--) {
            if (vector[i] == "+") {
                aux = Number(vector[i + 1]) + Number(vector[i + 2]);
                console.log(`suma ${vector[i + 1]} + ${vector[i + 2]} = ${aux}`);
                vector.splice(i, 3, aux);
                this.resultadopre(vector);
            } else if (vector[i] == "-") {
                aux = Number(vector[i + 1]) - Number(vector[i + 2]);
                console.log(`resta ${vector[i + 1]} - ${vector[i + 2]} = ${aux}`);
                vector.splice(i, 3, aux);
                this.resultadopre(vector);
            } else if (vector[i] == "*") {
                aux = Number(vector[i + 1]) * Number(vector[i + 2]);
                console.log(`multiplicacion ${vector[i + 1]} * ${vector[i + 2]} = ${aux}`);
                vector.splice(i, 3, aux);
                this.resultadopre(vector);
            } else if (vector[i] == "/") {
                aux = Number(vector[i + 1]) / Number(vector[i + 2]);
                console.log(`division ${vector[i + 1]} / ${vector[i + 2]} = ${aux}`);
                vector.splice(i, 3, aux);
                this.resultadopre(vector);
            }
        }
        return vector[0];
    }

    resultadopost(postorder) {
        let vector = postorder;
        let aux = 0;
        for (let i = 0; i < vector.length; i++) {
            if (vector[i] == "+") {
                aux = Number(vector[i - 2]) + Number(vector[i - 1]);
                console.log(`suma ${vector[i - 2]} + ${vector[i - 1]} = ${aux}`);
                vector.splice(i - 2, 3, aux);
                this.resultadopost(vector);
            } else if (vector[i] == "-") {
                aux = Number(vector[i - 2]) - Number(vector[i - 1]);
                console.log(`resta ${vector[i - 2]} - ${vector[i - 1]} = ${aux}`);
                vector.splice(i - 2, 3, aux);
                this.resultadopost(vector);
            } else if (vector[i] == "*") {
                aux = Number(vector[i - 2]) * Number(vector[i - 1]);
                console.log(`multiplicacion ${vector[i - 2]} * ${vector[i - 1]} = ${aux}`);
                vector.splice(i - 2, 3, aux);
                this.resultadopost(vector);
            } else if (vector[i] == "/") {
                aux = Number(vector[i - 2]) / Number(vector[i - 1]);
                console.log(`division ${vector[i - 2]} / ${vector[i - 1]} = ${aux}`);
                vector.splice(i - 2, 3, aux);
                this.resultadopost(vector);
            }
        }
        return vector[0];
    }
}






let arbol = new ArbolBinario();
let expresion = "1+2-3*4/5";
arbol.insertar(expresion)
arbol.crearArbol();
arbol.preorder();
arbol.postorder();
arbol.imprimirPre();
arbol.imprimirPost();

let pre = arbol.getPre();

console.log(arbol.resultadopre(pre));
let post = arbol.getPost();
console.log(arbol.resultadopost(post));


