package edu.masanz.da.ut4.listados;

import edu.masanz.da.ut4.modelo.Destino;

/** Lista simplemente enlazada con un primer nodo y un contador. */
public class ListadoDestinos implements IListado<Destino> {
    private NodoDestino primero;
    private int cantidad;

    /** Construye una lista vacia. */
    public ListadoDestinos() {
        // TODO: implementar segun el contrato y el enunciado.
        throw new UnsupportedOperationException("Pendiente de implementar: ListadoDestinos.ListadoDestinos");
    }

    /** {@inheritDoc} */
    @Override
    public void incluir(Destino elemento) {
        // TODO: implementar segun el contrato y el enunciado.
        throw new UnsupportedOperationException("Pendiente de implementar: ListadoDestinos.incluir");
    }

    /** {@inheritDoc} */
    @Override
    public Destino obtener(int indice) {
        // TODO: implementar segun el contrato y el enunciado.
        throw new UnsupportedOperationException("Pendiente de implementar: ListadoDestinos.obtener");
    }

    /** {@inheritDoc} */
    @Override
    public Destino eliminar(int indice) {
        // TODO: implementar segun el contrato y el enunciado.
        throw new UnsupportedOperationException("Pendiente de implementar: ListadoDestinos.eliminar");
    }

    /** {@inheritDoc} */
    @Override
    public Destino sustituir(int indice, Destino elemento) {
        // TODO: implementar segun el contrato y el enunciado.
        throw new UnsupportedOperationException("Pendiente de implementar: ListadoDestinos.sustituir");
    }

    /** {@inheritDoc} */
    @Override
    public int getCantidad() {
        // TODO: implementar segun el contrato y el enunciado.
        throw new UnsupportedOperationException("Pendiente de implementar: ListadoDestinos.getCantidad");
    }

    /** {@inheritDoc} */
    @Override
    public boolean estaVacio() {
        // TODO: implementar segun el contrato y el enunciado.
        throw new UnsupportedOperationException("Pendiente de implementar: ListadoDestinos.estaVacio");
    }

    /** {@inheritDoc} */
    @Override
    public void vaciar() {
        // TODO: implementar segun el contrato y el enunciado.
        throw new UnsupportedOperationException("Pendiente de implementar: ListadoDestinos.vaciar");
    }

    /** {@inheritDoc} */
    @Override
    public String toString() {
        // TODO: implementar segun el contrato y el enunciado.
        throw new UnsupportedOperationException("Pendiente de implementar: ListadoDestinos.toString");
    }

    private NodoDestino buscarNodo(int indice) {
        // TODO: implementar segun el contrato y el enunciado.
        throw new UnsupportedOperationException("Pendiente de implementar: ListadoDestinos.buscarNodo");
    }

    private void validarElemento(Destino elemento, int indiceIgnorado) {
        // TODO: implementar segun el contrato y el enunciado.
        throw new UnsupportedOperationException("Pendiente de implementar: ListadoDestinos.validarElemento");
    }
}
