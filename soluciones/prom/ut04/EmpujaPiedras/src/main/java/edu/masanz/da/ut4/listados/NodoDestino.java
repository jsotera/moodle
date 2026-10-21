package edu.masanz.da.ut4.listados;

import edu.masanz.da.ut4.modelo.Destino;

/** Nodo interno del listado. El enlace no forma parte del objeto del juego. */
class NodoDestino {
    private Destino elemento;
    private NodoDestino siguiente;

    NodoDestino(Destino elemento) {
        this.elemento = elemento;
    }

    Destino getElemento() { return elemento; }
    void setElemento(Destino elemento) { this.elemento = elemento; }
    NodoDestino getSiguiente() { return siguiente; }
    void setSiguiente(NodoDestino siguiente) { this.siguiente = siguiente; }
}
