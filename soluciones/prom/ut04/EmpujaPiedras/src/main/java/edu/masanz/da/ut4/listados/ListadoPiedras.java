package edu.masanz.da.ut4.listados;

import edu.masanz.da.ut4.modelo.Piedra;

/** Lista simplemente enlazada con un primer nodo y un contador. */
public class ListadoPiedras implements IListado<Piedra> {
    private NodoPiedra primero;
    private int cantidad;

    /** Construye una lista vacia. */
    public ListadoPiedras() {
        primero = null;
        cantidad = 0;
    }

    /** {@inheritDoc} */
    @Override
    public void incluir(Piedra elemento) {
        validarElemento(elemento, -1);
        NodoPiedra nuevo = new NodoPiedra(elemento);
        if (primero == null) {
            primero = nuevo;
        } else {
            NodoPiedra actual = primero;
            while (actual.getSiguiente() != null) {
                actual = actual.getSiguiente();
            }
            actual.setSiguiente(nuevo);
        }
        cantidad++;
    }

    /** {@inheritDoc} */
    @Override
    public Piedra obtener(int indice) {
        return buscarNodo(indice).getElemento();
    }

    /** {@inheritDoc} */
    @Override
    public Piedra eliminar(int indice) {
        NodoPiedra retirado = buscarNodo(indice);
        if (indice == 0) {
            primero = retirado.getSiguiente();
        } else {
            buscarNodo(indice - 1).setSiguiente(retirado.getSiguiente());
        }
        retirado.setSiguiente(null);
        cantidad--;
        return retirado.getElemento();
    }

    /** {@inheritDoc} */
    @Override
    public Piedra sustituir(int indice, Piedra elemento) {
        NodoPiedra nodo = buscarNodo(indice);
        validarElemento(elemento, indice);
        Piedra anterior = nodo.getElemento();
        nodo.setElemento(elemento);
        return anterior;
    }

    /** {@inheritDoc} */
    @Override
    public int getCantidad() {
        return cantidad;
    }

    /** {@inheritDoc} */
    @Override
    public boolean estaVacio() {
        return cantidad == 0;
    }

    /** {@inheritDoc} */
    @Override
    public void vaciar() {
        primero = null;
        cantidad = 0;
    }

    /** {@inheritDoc} */
    @Override
    public String toString() {
        String texto = "[";
        NodoPiedra actual = primero;
        while (actual != null) {
            texto += actual.getElemento();
            actual = actual.getSiguiente();
            if (actual != null) {
                texto += ", ";
            }
        }
        return texto + "]";
    }

    private NodoPiedra buscarNodo(int indice) {
        if (indice < 0 || indice >= cantidad) {
            throw new IndexOutOfBoundsException(indice);
        }
        NodoPiedra actual = primero;
        for (int i = 0; i < indice; i++) {
            actual = actual.getSiguiente();
        }
        return actual;
    }

    private void validarElemento(Piedra elemento, int indiceIgnorado) {
        if (elemento == null) {
            throw new IllegalArgumentException("El elemento no puede ser null.");
        }
        NodoPiedra actual = primero;
        int indice = 0;
        while (actual != null) {
            if (actual.getElemento() == elemento && indice != indiceIgnorado) {
                throw new IllegalArgumentException("La misma referencia ya esta incluida.");
            }
            indice++;
            actual = actual.getSiguiente();
        }
    }
}
