package edu.masanz.da.ut3.gui;

import java.util.Scanner;

/** Entrada y salida de consola mediante metodos estaticos. */
public class GUI {
    private static Scanner scanner = new Scanner(System.in);

    public static final String RESET = "\u001B[0m";
    public static final String ROJO = "\u001B[31m";
    public static final String VERDE = "\u001B[32m";
    public static final String AMARILLO = "\u001B[33m";
    public static final String AZUL = "\u001B[34m";
    public static final String MAGENTA = "\u001B[35m";
    public static final String CIAN = "\u001B[36m";
    public static final String BLANCO = "\u001B[37m";

    /** Muestra el titulo del examen. */
    public static void mostrarTitulo() { System.out.println("EXAMEN UT3"); }

    /** Muestra los escenarios disponibles y la opcion de salir. */
    public static void mostrarMapas() {
        System.out.println();
        System.out.println("Mapas disponibles:");
        System.out.println("\t1. Mapa de exploración");
        System.out.println("\t2. Mapa de pasillos");
        System.out.println("\t3. Mapa de supervivencia");
        System.out.println("\t0. Salir");
        System.out.println();
    }

    /** Muestra las acciones de juego, con 0 para salir al final. */
    public static void mostrarMenu() {
        System.out.println();
        System.out.println("Opciones disponibles:");
        System.out.println("\tW. Mover arriba");
        System.out.println("\tA. Mover izquierda");
        System.out.println("\tS. Mover abajo");
        System.out.println("\tD. Mover derecha");
        System.out.println("\t1. Utilizar un botiquín");
        System.out.println("\t2. Reiniciar el mapa");
        System.out.println("\t3. Mostrar menú");
        System.out.println("\t0. Salir");
    }

    /** Muestra el significado de los simbolos. */
    public static void mostrarLeyenda() {
        String salida = "["+AZUL + "P" + RESET+"] Personaje | ["+AMARILLO + "#" + RESET+"] Pared | [ ] Suelo | ["+VERDE + "+" + RESET+"] Botiquín | ["+ROJO + "T" + RESET+"] Trampa | ["+CIAN + "S" + RESET+"] Salida";
        System.out.println();
        System.out.println(salida);
        System.out.println();
    }

    /** @param simbolo String a imprimir entre corchetes, sin salto de linea */
    public static void mostrarCasilla(String simbolo) {
        String pintar = simbolo;
        pintar = "T".equals(pintar) ? ROJO + pintar + RESET: pintar;
        pintar = "+".equals(pintar) ? VERDE + pintar + RESET: pintar;
        pintar = "P".equals(pintar) ? AZUL + pintar + RESET: pintar;
        pintar = "#".equals(pintar) ? AMARILLO + pintar + RESET: pintar;
        pintar = "S".equals(pintar) ? CIAN + pintar + RESET: pintar;
        System.out.print("[" + pintar +"]");
    }

    /** Termina la linea actual. */
    public static void nuevaLinea() {
        System.out.println();
    }

    /** @param mensaje texto que se imprime en una linea */
    public static void mostrarMensaje(String mensaje) {
        System.out.println(mensaje);
    }

    public static void mostrarInfo(int vida, int botiquines, int movimientos, int fila, int columna) {
        System.out.println("|"+"-".repeat(52)+"|");
        System.out.printf("|"+"%7s | %10s | %11s | %4s | %6s |\n","Vida ", "Botiquines","Movimientos", "fila", "columna");
        System.out.println("|"+"-".repeat(52)+"|");
        System.out.printf("|"+"%7s | %6s     | %7s     | %4s | %6s  |\n", vida+ "/100", botiquines, movimientos, fila+" ", columna+"  ");
        System.out.println("|"+"-".repeat(52)+"|");
        System.out.println();
    }

    /**
     * Solicita al usuario una acción mediante el mensaje "Introduce una acción: ".
     * Lee la acción y conviertela a mayúsculas. Si está vacía, devuelve "0".
     * @return accion normalizada, o "0" si se ha terminado la entrada
     */
    public static String pedirAccion() {
        // TODO 01: Solicita una acción al usuario y devuelvela en mayúsculas.
        System.out.print("Introduce una acción: ");
        String accion = scanner.nextLine();
        if (accion.isBlank()) {
            return "0";
        }
        return accion.toUpperCase();
    }

    /**
     * Solicita al usuario que elija un mapa mediante el mensaje "Elige un mapa: ".
     * Lee la acción y la convierte a int, sin validar el rango.
     * @return numero introducido, o cero si se ha terminado la entrada o no es un número válido.
     * Se debe controlar el posible error con la excepción correspondiente
     */
    public static int pedirMapa() {
        // TODO 02: Solicita el número del mapa y convierte la entrada a un número entero.
        System.out.print("Elige un mapa: ");
        int numeroMapa = 0;
        try {
            numeroMapa = Integer.parseInt(scanner.nextLine());
        } catch (NumberFormatException nfe) {
            System.out.println("Elección incorrecta.");
        }
        return numeroMapa;
    }
}
