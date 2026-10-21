package edu.masanz.da.ut4.listados;

/**
 * Contrato de un listado simplemente enlazado; sus indices comienzan en cero.
 * @param <T> tipo de objeto que admite cada instancia del listado
 */
public interface IListado<T> {
    /**
     * Anade al final la referencia recibida, sin copiar el objeto.
     * @param elemento objeto no nulo y no incluido previamente por identidad
     * @throws IllegalArgumentException si es null o ya pertenece al listado
     */
    void incluir(T elemento);
    /**
     * @param indice posicion a consultar
     * @return la misma referencia almacenada en esa posicion
     * @throws IndexOutOfBoundsException si no existe
     */
    T obtener(int indice);
    /**
     * Elimina y devuelve el objeto, sin modificar sus propiedades.
     * @param indice posicion a eliminar
     * @return referencia eliminada
     * @throws IndexOutOfBoundsException si no existe
     */
    T eliminar(int indice);
    /**
     * Sustituye una referencia, conservando la posicion y la cantidad.
     * @param indice posicion a sustituir
     * @param elemento nueva referencia, no nula ni presente en otra posicion
     * @return referencia anterior; sustituir por la misma referencia es valido
     * @throws IndexOutOfBoundsException si no existe el indice
     * @throws IllegalArgumentException si el elemento no es admisible
     */
    T sustituir(int indice, T elemento);
    /** @return cantidad actual de elementos */
    int getCantidad();
    /** @return true si no contiene elementos */
    boolean estaVacio();
    /** Elimina todos los enlaces del listado; no modifica los objetos retirados. */
    void vaciar();
    /** @return representacion de todos los elementos en orden, o [] si esta vacio */
    String toString();
}
