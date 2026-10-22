package edu.masanz.da.ut3.gui;

import java.util.Scanner;

/** Entrada y salida de consola, sin dependencias de los modelos. */
public class GUI {
    public static final int ELEGIR_PROFUNDIDAD = 1;
    public static final int MOSTRAR_ARBOL = 2;
    public static final int SALIR = 0;

    private static Scanner scanner = new Scanner(System.in);

    /** Muestra el menu con la opcion de salir al final. */
    public static void mostrarMenu() {
        System.out.println();
        System.out.println("=== ARBOL GENEALOGICO ===");
        System.out.println("1. Elegir profundidad del arbol");
        System.out.println("2. Mostrar arbol");
        System.out.println("0. Salir");
    }

    /**
     * Solicita un entero sin validar si pertenece al menu o al rango de profundidad.
     * @param mensaje texto que precede a la lectura
     * @return entero leido; cero si termina la entrada sin mas datos
     */
    public static int pedirEntero(String mensaje) {
        // TODO 01: Solicita un entero con el mensaje recibido y repite la solicitud si no recibe un entero.
        return 0;
    }

    /**
     * Solicita una opcion y muestra el aviso correspondiente si no es valida.
     * Puede reutilizar pedirEntero.
     * @return opcion 0, 1 o 2; cero si termina la entrada sin mas datos
     */
    public static int pedirOpcion() {
        // TODO 02: Solicita una opcion del menu y vuelve a pedirla hasta que sea valida.
        return 0;
    }

    /** @param mensaje texto que se desea mostrar, incluido un arbol ya compuesto */
    public static void mostrarMensaje(String mensaje) {
        System.out.println(mensaje);
    }

    /** Informa de que el numero no pertenece al menu. */
    public static void mostrarOpcionIncorrecta() {
        System.out.println("Opcion no disponible. Elige 1, 2 o 0 para salir.");
    }

    /** Muestra la despedida. */
    public static void mostrarDespedida() {
        System.out.println("Hasta pronto.");
    }
}
