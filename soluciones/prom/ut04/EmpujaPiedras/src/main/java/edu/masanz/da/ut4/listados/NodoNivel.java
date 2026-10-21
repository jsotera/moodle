package edu.masanz.da.ut4.listados;

import edu.masanz.da.ut4.modelo.Nivel;

/** Nodo interno del listado. El enlace no forma parte del objeto del juego. */
class NodoNivel {
    private Nivel elemento;
    private NodoNivel siguiente;

    NodoNivel(Nivel elemento) {
        this.elemento = elemento;
    }

    Nivel getElemento() { return elemento; }
    void setElemento(Nivel elemento) { this.elemento = elemento; }
    NodoNivel getSiguiente() { return siguiente; }
    void setSiguiente(NodoNivel siguiente) { this.siguiente = siguiente; }
}
