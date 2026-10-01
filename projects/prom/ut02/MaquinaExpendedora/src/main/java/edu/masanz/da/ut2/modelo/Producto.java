package edu.masanz.da.ut2.modelo;

public class Producto {
    private String nombre;
    private int precioCentimos;
    private int stock;

    /**
     * Crea un producto sin nombre, sin precio y sin stock.
     */
    public Producto() {
        this.nombre = "";
    }

    /**
     * Crea un producto indicando nombre, precio y stock.
     *
     * @param nombre nombre del producto
     * @param precioCentimos precio del producto en centimos
     * @param stock unidades disponibles
     */
    public Producto(String nombre, int precioCentimos, int stock) {
        this.nombre = nombre;
        this.precioCentimos = precioCentimos;
        this.stock = stock;
    }

    /**
     * Devuelve una descripcion del producto.
     *
     * @return texto con nombre, precio y stock
     */
    @Override
    public String toString() {
        return "Producto{nombre='" + nombre + "', precioCentimos="
                + precioCentimos + ", stock=" + stock + "}";
    }

    /**
     * Devuelve el nombre del producto.
     *
     * @return nombre del producto
     */
    public String getNombre() {
        return nombre;
    }

    /**
     * Modifica el nombre del producto.
     *
     * @param nombre nuevo nombre del producto
     */
    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    /**
     * Devuelve el precio en centimos.
     *
     * @return precio del producto en centimos
     */
    public int getPrecioCentimos() {
        return precioCentimos;
    }

    /**
     * Modifica el precio en centimos.
     *
     * @param precioCentimos nuevo precio en centimos
     */
    public void setPrecioCentimos(int precioCentimos) {
        this.precioCentimos = precioCentimos;
    }

    /**
     * Devuelve el stock disponible.
     *
     * @return unidades disponibles
     */
    public int getStock() {
        return stock;
    }

    /**
     * Modifica el stock disponible.
     *
     * @param stock nuevo stock
     */
    public void setStock(int stock) {
        this.stock = stock;
    }

    /**
     * Reduce el stock en una unidad si hay stock disponible.
     *
     * @return true si se ha reducido el stock, false si no quedaban unidades
     */
    boolean retirarUnidad() {
        if (stock <= 0) {
            return false;
        }

        stock--;
        return true;
    }
}
