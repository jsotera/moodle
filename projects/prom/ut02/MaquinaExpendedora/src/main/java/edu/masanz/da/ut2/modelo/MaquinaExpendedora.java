package edu.masanz.da.ut2.modelo;

import java.util.Random;

public class MaquinaExpendedora {
    private static int cajaGlobalCentimos = 0;
    private static int ventasGlobales = 0;
    private static int probabilidadFallo = 25;

    private String ubicacion;
    private Producto producto1;
    private Producto producto2;
    private Producto producto3;

    /**
     * Crea una maquina sin ubicacion y sin productos.
     */
    public MaquinaExpendedora() {
        this.ubicacion = "";
    }

    /**
     * Crea una maquina indicando su ubicacion.
     *
     * @param ubicacion lugar donde se encuentra la maquina
     */
    public MaquinaExpendedora(String ubicacion) {
        this.ubicacion = ubicacion;
    }

    /**
     * Devuelve una descripcion de la maquina.
     *
     * @return texto con ubicacion y productos
     */
    @Override
    public String toString() {
        return "MaquinaExpendedora{ubicacion='" + ubicacion
                + "', producto1=" + producto1
                + ", producto2=" + producto2
                + ", producto3=" + producto3 + "}";
    }

    /**
     * Devuelve el dinero acumulado por todas las maquinas.
     *
     * @return caja global en centimos
     */
    public static int consultarCajaGlobalCentimos() {
        return cajaGlobalCentimos;
    }

    /**
     * Devuelve cuantas ventas correctas se han realizado entre todas las maquinas.
     *
     * @return numero de ventas globales
     */
    public static int consultarVentasGlobales() {
        return ventasGlobales;
    }

    /**
     * Devuelve la probabilidad de fallo compartida por todas las maquinas.
     *
     * @return probabilidad de fallo en porcentaje
     */
    public static int consultarProbabilidadFallo() {
        return probabilidadFallo;
    }

    /**
     * Modifica la probabilidad de fallo compartida por todas las maquinas.
     *
     * @param nuevaProbabilidadFallo nueva probabilidad de fallo entre 0 y 100
     */
    public static void configurarProbabilidadFallo(int nuevaProbabilidadFallo) {
        probabilidadFallo = nuevaProbabilidadFallo;
    }

    /**
     * Reinicia la caja y las ventas compartidas por todas las maquinas.
     */
    public static void reiniciarEstadisticasGlobales() {
        cajaGlobalCentimos = 0;
        ventasGlobales = 0;
    }

    /**
     * Devuelve la ubicacion de la maquina.
     *
     * @return ubicacion de la maquina
     */
    public String getUbicacion() {
        return ubicacion;
    }

    /**
     * Modifica la ubicacion de la maquina.
     *
     * @param ubicacion nueva ubicacion
     */
    public void setUbicacion(String ubicacion) {
        this.ubicacion = ubicacion;
    }

    /**
     * Coloca un producto en el primer hueco de la maquina.
     *
     * @param producto1 producto colocado en el primer hueco
     */
    public void setProducto1(Producto producto1) {
        this.producto1 = producto1;
    }

    /**
     * Coloca un producto en el segundo hueco de la maquina.
     *
     * @param producto2 producto colocado en el segundo hueco
     */
    public void setProducto2(Producto producto2) {
        this.producto2 = producto2;
    }

    /**
     * Coloca un producto en el tercer hueco de la maquina.
     *
     * @param producto3 producto colocado en el tercer hueco
     */
    public void setProducto3(Producto producto3) {
        this.producto3 = producto3;
    }

    /**
     * Intenta vender el primer producto.
     */
    public void venderProducto1() {
        vender(producto1);
    }

    /**
     * Intenta vender el segundo producto.
     */
    public void venderProducto2() {
        vender(producto2);
    }

    /**
     * Intenta vender el tercer producto.
     */
    public void venderProducto3() {
        vender(producto3);
    }

    /**
     * Muestra por consola la informacion de la maquina.
     */
    public void mostrarInformacion() {
        System.out.println(this);
    }

    /**
     * Intenta vender un producto concreto.
     *
     * @param producto producto que se quiere vender
     */
    private void vender(Producto producto) {
        if (producto == null) {
            System.out.println("No hay producto en ese hueco.");
            return;
        }

        if (hayFalloAleatorio()) {
            System.out.println("La maquina de " + ubicacion + " ha fallado al vender "
                    + producto.getNombre() + ".");
            return;
        }

        if (producto.retirarUnidad()) {
            cajaGlobalCentimos = cajaGlobalCentimos + producto.getPrecioCentimos();
            ventasGlobales++;
            System.out.println("Venta correcta en " + ubicacion + ": " + producto.getNombre() + ".");
        } else {
            System.out.println("No queda stock de " + producto.getNombre() + ".");
        }
    }

    /**
     * Calcula si la venta falla utilizando Random.
     *
     * @return true si la venta falla, false si puede continuar
     */
    private boolean hayFalloAleatorio() {
        int numero = new Random().nextInt(100) + 1;
        return numero <= probabilidadFallo;
    }
}
