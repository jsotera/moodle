package edu.masanz.da.ut4.listados;

import edu.masanz.da.ut4.modelo.Nivel;

/** Lista simplemente enlazada con un primer nodo y un contador. */
public class ListadoNiveles implements IListado<Nivel> {
    private NodoNivel primero;
    private int cantidad;

    /** Construye una lista vacia. */
    public ListadoNiveles() {
        // TODO: implementar segun el contrato y el enunciado.
        throw new UnsupportedOperationException("Pendiente de implementar: ListadoNiveles.ListadoNiveles");
    }

    /** {@inheritDoc} */
    @Override
    public void incluir(Nivel elemento) {
        // TODO: implementar segun el contrato y el enunciado.
        throw new UnsupportedOperationException("Pendiente de implementar: ListadoNiveles.incluir");
    }

    /** {@inheritDoc} */
    @Override
    public Nivel obtener(int indice) {
        // TODO: implementar segun el contrato y el enunciado.
        throw new UnsupportedOperationException("Pendiente de implementar: ListadoNiveles.obtener");
    }

    /** {@inheritDoc} */
    @Override
    public Nivel eliminar(int indice) {
        // TODO: implementar segun el contrato y el enunciado.
        throw new UnsupportedOperationException("Pendiente de implementar: ListadoNiveles.eliminar");
    }

    /** {@inheritDoc} */
    @Override
    public Nivel sustituir(int indice, Nivel elemento) {
        // TODO: implementar segun el contrato y el enunciado.
        throw new UnsupportedOperationException("Pendiente de implementar: ListadoNiveles.sustituir");
    }

    /** {@inheritDoc} */
    @Override
    public int getCantidad() {
        // TODO: implementar segun el contrato y el enunciado.
        throw new UnsupportedOperationException("Pendiente de implementar: ListadoNiveles.getCantidad");
    }

    /** {@inheritDoc} */
    @Override
    public boolean estaVacio() {
        // TODO: implementar segun el contrato y el enunciado.
        throw new UnsupportedOperationException("Pendiente de implementar: ListadoNiveles.estaVacio");
    }

    /** {@inheritDoc} */
    @Override
    public void vaciar() {
        // TODO: implementar segun el contrato y el enunciado.
        throw new UnsupportedOperationException("Pendiente de implementar: ListadoNiveles.vaciar");
    }

    /** {@inheritDoc} */
    @Override
    public String toString() {
        // TODO: implementar segun el contrato y el enunciado.
        throw new UnsupportedOperationException("Pendiente de implementar: ListadoNiveles.toString");
    }

    private NodoNivel buscarNodo(int indice) {
        // TODO: implementar segun el contrato y el enunciado.
        throw new UnsupportedOperationException("Pendiente de implementar: ListadoNiveles.buscarNodo");
    }

    private void validarElemento(Nivel elemento, int indiceIgnorado) {
        // TODO: implementar segun el contrato y el enunciado.
        throw new UnsupportedOperationException("Pendiente de implementar: ListadoNiveles.validarElemento");
    }
}
