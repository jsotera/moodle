package edu.masanz.da.ut4.vista.consola;

import edu.masanz.da.ut4.api.Partida;
import edu.masanz.da.ut4.demo.VistaPrevia;
import edu.masanz.da.ut4.modelo.Juego;
import java.util.Scanner;

/** Entrada y salida suministradas. No decide colisiones ni modifica objetos del tablero. */
public class VistaConsola {
    /**
     * Ejecuta el bucle de consola; EOF y Q terminan la aplicacion.
     * @param partida partida inyectada, o null para construir el modelo del alumnado
     */
    public void ejecutar(Partida partida) {
        if (partida == null) {
            try {
                partida = new Juego();
            } catch (UnsupportedOperationException e) {
                System.out.println(e.getMessage());
                partida = new VistaPrevia();
            }
        }
        Scanner teclado = new Scanner(System.in);
        boolean salir = false;
        while (!salir) {
            try {
                mostrar(partida);
                if (!teclado.hasNextLine()) {
                    return;
                }
                String accion = teclado.nextLine().trim().toUpperCase();
                switch (accion) {
                    case "W": case "A": case "S": case "D": partida.mover(accion); break;
                    case "R": partida.reiniciar(); break;
                    case "N": partida.siguienteNivel(); break;
                    case "M": partida = new Juego(); break;
                    case "Q": salir = true; break;
                    default:
                        int opcion = Integer.parseInt(accion);
                        switch (opcion) {
                            case 0: salir = true; break;
                            case 1: partida.reiniciar(); break;
                            case 2: partida.siguienteNivel(); break;
                            case 3: partida = new Juego(); break;
                            default: System.out.println("Opcion numerica fuera del menu.");
                        }
                }
            } catch (UnsupportedOperationException | IndexOutOfBoundsException e) {
                System.out.println(e.getMessage());
                return;
            } catch (NumberFormatException e) {
                System.out.println("Escribe W/A/S/D, R/N/M/Q o un numero entre 0 y 3.");
            } catch (IllegalArgumentException e) {
                System.out.println(e.getMessage());
            }
        }
    }

    /** @param partida estado a representar, sin modificarlo */
    public void mostrar(Partida partida) {
        System.out.println();
        System.out.println("EMPUJA PIEDRAS | Nivel " + partida.getNumeroNivel() + "/" + partida.getTotalNiveles());
        System.out.println(partida.getTituloNivel());
        System.out.println("Partida: " + partida.getCodigoPartida() + " | Progreso: " + partida.getProgreso() + "%");
        System.out.println("Movimientos: " + partida.getMovimientos() + " | Empujes: " + partida.getEmpujes()
                + " | Destinos: " + partida.getDestinosCubiertos() + "/" + partida.getCantidadDestinos());
        for (int y = 0; y < partida.getAltura(); y++) {
            for (int x = 0; x < partida.getAnchura(); x++) {
                System.out.print("+---");
            }
            System.out.println("+");
            for (int x = 0; x < partida.getAnchura(); x++) {
                char casilla = partida.getCasilla(x, y);
                System.out.print("| " + (casilla == '.' ? ' ' : casilla) + " ");
            }
            System.out.println("|");
        }
        for (int x = 0; x < partida.getAnchura(); x++) {
            System.out.print("+---");
        }
        System.out.println("+");
        System.out.println("J jugador | P piedra | D destino | * piedra en destino | + jugador en destino");
        System.out.println(partida.getMensaje());
        System.out.println("W/A/S/D mover | R reiniciar | N siguiente | M cargar modelo | Q salir");
        System.out.println("Menu numerico: 0 salir | 1 reiniciar | 2 siguiente | 3 cargar modelo");
        System.out.print("> ");
    }
}
