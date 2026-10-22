package edu.masanz.da.ut3.gui;

import java.util.Scanner;

/** Muestra textos y solicita datos; no conoce las clases del modelo. */
public class GUI {
    public static final int CONSULTAR = 1;
    public static final int INTRODUCIR_DINERO = 2;
    public static final int COMPRAR = 3;
    public static final int DEVOLVER_SALDO = 4;
    public static final int REPONER = 5;
    public static final int SALIR = 0;

    private static Scanner scanner = new Scanner(System.in);

    /** Muestra las opciones en orden, con salir siempre al final. */
    public static void mostrarMenu() {
        System.out.println();
        System.out.println("=== MAQUINA EXPENDEDORA ===");
        System.out.println("1. Consultar productos, saldo y recaudacion");
        System.out.println("2. Introducir dinero");
        System.out.println("3. Comprar un producto");
        System.out.println("4. Devolver el saldo");
        System.out.println("5. Reponer un producto");
        System.out.println("0. Salir");
    }

    /**
     * Solicita una opcion entre 0 y 5, ambos incluidos, y avisa si no es valida.
     * Puede reutilizar pedirEntero. No ejecuta ninguna operacion de la aplicacion.
     * @return opcion valida; cero si termina la entrada sin mas datos
     */
    public static int pedirOpcion() {
        // TODO 01: Solicita una opcion del menu y vuelve a pedirla hasta que sea valida.
        return 0;
    }

    /**
     * Lee un entero sin aplicar restricciones de precio, unidades o producto.
     * @param mensaje texto que se muestra antes de solicitar el dato
     * @return entero introducido; cero si termina la entrada sin mas datos
     */
    public static int pedirEntero(String mensaje) {
        // TODO 02: Solicita un entero con el mensaje recibido y repite la solicitud si no recibe un entero.
        return 0;
    }

    /** @param mensaje texto que se desea mostrar */
    public static void mostrarMensaje(String mensaje) {
        System.out.println(mensaje);
    }

    /**
     * Muestra los datos recibidos, sin buscarlos ni validarlos.
     * @param numero numero identificativo del producto
     * @param nombre nombre que se muestra
     * @param precioCentimos precio que se muestra
     * @param unidades existencias que se muestran
     */
    public static void mostrarProducto(int numero, String nombre, int precioCentimos, int unidades) {
        System.out.println(numero + ". " + nombre + " | precio: " + precioCentimos
                + " centimos | unidades: " + unidades);
    }

    /**
     * @param concepto etiqueta, por ejemplo Saldo, Recaudacion o Saldo devuelto
     * @param centimos importe que se muestra, sin modificarlo
     */
    public static void mostrarImporte(String concepto, int centimos) {
        System.out.println(concepto + ": " + centimos + " centimos");
    }

    /** Informa de una opcion que no corresponde al menu. */
    public static void mostrarOpcionIncorrecta() {
        System.out.println("Opcion no disponible. Elige de 1 a 5, o 0 para salir.");
    }

    /** Muestra el cierre de la aplicacion. */
    public static void mostrarDespedida() {
        System.out.println("Hasta pronto.");
    }
}
