package edu.masanz.da.ut4.listados;

import edu.masanz.da.ut4.modelo.Piedra;

/** Lista simplemente enlazada con un primer nodo y un contador. */
public class ListadoPiedras implements IListado<Piedra> {
    private NodoPiedra primero;
    private int cantidad;

    /** Construye una lista vacia. */
    public ListadoPiedras() {
        // TODO: implementar segun el contrato y el enunciado.
        throw new UnsupportedOperationException("Pendiente de implementar: ListadoPiedras.ListadoPiedras");
    }

    /** {@inheritDoc} */
    @Override
    public void incluir(Piedra elemento) {
        // TODO: implementar segun el contrato y el enunciado.
        throw new UnsupportedOperationException("Pendiente de implementar: ListadoPiedras.incluir");
    }

    /** {@inheritDoc} */
    @Override
    public Piedra obtener(int indice) {
        // TODO: implementar segun el contrato y el enunciado.
        throw new UnsupportedOperationException("Pendiente de implementar: ListadoPiedras.obtener");
    }

    /** {@inheritDoc} */
    @Override
    public Piedra eliminar(int indice) {
        // TODO: implementar segun el contrato y el enunciado.
        throw new UnsupportedOperationException("Pendiente de implementar: ListadoPiedras.eliminar");
    }

    /** {@inheritDoc} */
    @Override
    public Piedra sustituir(int indice, Piedra elemento) {
        // TODO: implementar segun el contrato y el enunciado.
        throw new UnsupportedOperationException("Pendiente de implementar: ListadoPiedras.sustituir");
    }

    /** {@inheritDoc} */
    @Override
    public int getCantidad() {
        // TODO: implementar segun el contrato y el enunciado.
        throw new UnsupportedOperationException("Pendiente de implementar: ListadoPiedras.getCantidad");
    }

    /** {@inheritDoc} */
    @Override
    public boolean estaVacio() {
        // TODO: implementar segun el contrato y el enunciado.
        throw new UnsupportedOperationException("Pendiente de implementar: ListadoPiedras.estaVacio");
    }

    /** {@inheritDoc} */
    @Override
    public void vaciar() {
        // TODO: implementar segun el contrato y el enunciado.
        throw new UnsupportedOperationException("Pendiente de implementar: ListadoPiedras.vaciar");
    }

    /** {@inheritDoc} */
    @Override
    public String toString() {
        // TODO: implementar segun el contrato y el enunciado.
        throw new UnsupportedOperationException("Pendiente de implementar: ListadoPiedras.toString");
    }

    private NodoPiedra buscarNodo(int indice) {
        // TODO: implementar segun el contrato y el enunciado.
        throw new UnsupportedOperationException("Pendiente de implementar: ListadoPiedras.buscarNodo");
    }

    private void validarElemento(Piedra elemento, int indiceIgnorado) {
        // TODO: implementar segun el contrato y el enunciado.
        throw new UnsupportedOperationException("Pendiente de implementar: ListadoPiedras.validarElemento");
    }
}
