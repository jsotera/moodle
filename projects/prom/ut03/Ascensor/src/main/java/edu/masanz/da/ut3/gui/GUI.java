package edu.masanz.da.ut3.gui;

import java.util.Scanner;

/** Muestra textos y solicita datos; no conoce las clases del modelo. */
public class GUI {
    public static final int INICIAR = 1;
    public static final int SALIR = 0;

    private static Scanner scanner = new Scanner(System.in);

    /** Muestra las opciones en orden, con salir siempre al final. */
    public static void mostrarMenu() {
        System.out.println();
        System.out.println("=== ASCENSOR ===");
        System.out.println("1. Iniciar simulacion");
        System.out.println("0. Salir");
    }

    /**
     * Solicita 1 para iniciar o 0 para salir. Si el texto no es un entero o
     * el valor no pertenece al menu, muestra un aviso y vuelve a solicitarlo.
     * @return opcion valida; cero si termina la entrada sin mas datos
     */
    public static int pedirOpcion() {
        // TODO 01: Solicita una opcion del menu y vuelve a pedirla hasta que sea valida.
        return 0;
    }

    /** @param mensaje texto que se desea mostrar */
    public static void mostrarMensaje(String mensaje) {
        System.out.println(mensaje);
    }

    /** @param planta numero de planta que se desea mostrar */
    public static void mostrarPlanta(int planta) {
        System.out.println("Planta: " + planta);
    }

    /**
     * Muestra los datos recibidos sin consultar objetos ni comprobar reglas.
     * @param nombre nombre que se muestra
     * @param pesoKg peso que se muestra
     * @param destino planta de destino que se muestra
     */
    public static void mostrarPersona(String nombre, int pesoKg, int destino) {
        System.out.println(nombre + " | " + pesoKg + " kg | destino: " + destino);
    }

    /** @param nombre nombre de quien ha entrado */
    public static void mostrarAlguienEntra(String nombre) {
        System.out.println("Entra " + nombre + ".");
    }

    /** @param nombre nombre de quien ha salido */
    public static void mostrarAlguienSale(String nombre) {
        System.out.println("Sale " + nombre + ".");
    }

    /** Informa de una opcion que no corresponde al menu. */
    public static void mostrarOpcionIncorrecta() {
        System.out.println("Opcion no disponible. Elige 1, o 0 para salir.");
    }

    /** Muestra el cierre de la aplicacion. */
    public static void mostrarDespedida() {
        System.out.println("Hasta pronto.");
    }
}
