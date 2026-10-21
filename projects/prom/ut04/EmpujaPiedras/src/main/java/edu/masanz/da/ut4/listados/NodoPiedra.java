package edu.masanz.da.ut4.listados;

import edu.masanz.da.ut4.modelo.Piedra;

/** Nodo interno del listado. El enlace no forma parte del objeto del juego. */
class NodoPiedra {
    private Piedra elemento;
    private NodoPiedra siguiente;

    NodoPiedra(Piedra elemento) {
        this.elemento = elemento;
    }

    Piedra getElemento() { return elemento; }
    void setElemento(Piedra elemento) { this.elemento = elemento; }
    NodoPiedra getSiguiente() { return siguiente; }
    void setSiguiente(NodoPiedra siguiente) { this.siguiente = siguiente; }
}
