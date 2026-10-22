package edu.masanz.da.ut3.modelo;

/** Producto con precio en centimos y existencias propias. */
public class Producto {
    private String nombre;
    private int precioCentimos;
    private int unidades;

    /**
     * Inicializa el producto con los datos recibidos.
     * @param nombre nombre no nulo ni en blanco
     * @param precioCentimos precio positivo en centimos
     * @param unidades existencias iniciales, como minimo cero
     * @throws IllegalArgumentException si alguno de los datos no es valido
     */
    public Producto(String nombre, int precioCentimos, int unidades) {
        // TODO 11: Inicializa el producto y rechaza los datos que no cumplan sus requisitos.
    }

    /** @return nombre del producto */
    public String getNombre() {
        return nombre;
    }

    /** @return precio de una unidad en centimos */
    public int getPrecioCentimos() {
        return precioCentimos;
    }

    /** @return cantidad actual de unidades */
    public int getUnidades() {
        return unidades;
    }

    /** @return true si queda al menos una unidad */
    public boolean hayExistencias() {
        // TODO 12: Indica si el producto dispone de unidades para la venta.
        return false;
    }

    /**
     * Retira una unidad solo si quedan existencias.
     * @return true si se retiro; false si estaba agotado, sin modificar nada
     */
    public boolean retirarUnidad() {
        // TODO 13: Retira una unidad si hay existencias e indica si se ha podido retirar.
        return false;
    }

    /**
     * Incrementa las existencias, sin cambiar nombre ni precio.
     * @param cantidad unidades que se desean anadir
     * @return true si cantidad es positiva; false en otro caso, sin cambios
     */
    public boolean reponer(int cantidad) {
        // TODO 14: Aumenta las existencias con la cantidad solicitada si es positiva e indica si se ha podido reponer.
        return false;
    }

    /** @return descripcion con nombre, precio en centimos y unidades */
    @Override
    public String toString() {
        return "Producto{nombre='" + nombre + "', precioCentimos=" + precioCentimos
                + ", unidades=" + unidades + "}";
    }
}
