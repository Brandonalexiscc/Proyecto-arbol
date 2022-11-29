
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
    constructor() {
        this.raiz = null;
        this.primero = null;
        this.ultimo = null;
        this.pre = [];
        this.post = [];
    }

    insertar(valor) {
        let nuevo = new Nodo(valor);
        if (this.raiz == null) {
            this.raiz = nuevo;
            this.primero = nuevo;
            this.ultimo = nuevo;
        } else {
            let aux = this.primero;
            while (aux != null) {
                if (aux.izq == null) {
                    aux.izq = nuevo;
                    nuevo.anterior = aux;
                    this.ultimo = nuevo;
                    break;
                } else if (aux.der == null) {
                    aux.der = nuevo;
                    nuevo.anterior = aux;
                    this.ultimo = nuevo;
                    break;
                } else {
                    aux = aux.siguiente;
                }
            }
        }
        this.primero.siguiente = this.ultimo;
        this.ultimo.siguiente = this.primero;
    }

    preorder(nodo) {
        if (nodo != null) {
            this.pre.push(nodo.valor);
            this.preorder(nodo.izq);
            this.preorder(nodo.der);
        }
    }

    postorder(nodo) {
        if (nodo != null) {
            this.postorder(nodo.izq);
            this.postorder(nodo.der);
            this.post.push(nodo.valor);
        }
    }

    imprimirPre() {
        console.log(this.pre);
    }

    imprimirPost() {
        console.log(this.post);
    }

    resultadoPre() {
        let pila = [];
        let aux = this.pre.length - 1;
        while (aux >= 0) {
            if (this.pre[aux] == "+" || this.pre[aux] == "-" || this.pre[aux] == "*" || this.pre[aux] == "/") {
                let op1 = pila.pop();
                let op2 = pila.pop();
                let res = 0;
                switch (this.pre[aux]) {
                    case "+":
                        res = op1 + op2;
                        break;
                    case "-":
                        res = op1 - op2;
                        break;
                    case "*":
                        res = op1 * op2;
                        break;
                    case "/":
                        res = op1 / op2;
                        break;
                }
                pila.push(res);
            } else {
                pila.push(parseInt(this.pre[aux]));
            }
            aux--;
        }
        console.log(pila.pop());
    }

    resultadoPost() {
        let pila = [];
        let aux = 0;
        while (aux < this.post.length) {
            if (this.post[aux] == "+" || this.post[aux] == "-" || this.post[aux] == "*" || this.post[aux] == "/") {
                let op1 = pila.pop();
                let op2 = pila.pop();
                let res = 0;
                switch (this.post[aux]) {
                    case "+":
                        res = op1 + op2;
                        break;
                    case "-":
                        res = op1 - op2;
                        break;
                    case "*":
                        res = op1 * op2;
                        break;
                    case "/":
                        res = op1 / op2;
                        break;
                }
                pila.push(res);
            } else {
                pila.push(parseInt(this.post[aux]));
            }
            aux++;
        }
        console.log(pila.pop());
    }


}

let arbol = new ArbolBinario();
let expresion = "1+2-3*4/5";
let aux = "";
for (let i = 0; i < expresion.length; i++) {
    if (expresion[i] == "+" || expresion[i] == "-" || expresion[i] == "*" || expresion[i] == "/") {
        arbol.insertar(aux);
        arbol.insertar(expresion[i]);
        aux = "";
    } else {
        aux += expresion[i];
    }
}
arbol.insertar(aux);
arbol.preorder(arbol.raiz);
arbol.postorder(arbol.raiz);
arbol.imprimirPre();
arbol.imprimirPost();
arbol.resultadoPre();
arbol.resultadoPost();

/**
 resultado del preorder y postorder debe dar 7
 el acomodo del preorder debe ser = +,1,*,2,3
 el acomodo del postorder debe ser = 1,2,3,*,+
 */
