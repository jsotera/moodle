package edu.masanz.da.ut3.app;

import edu.masanz.da.ut3.gui.GUI;
import java.util.concurrent.CancellationException;

/** Completa la carrera en main; la interfaz grafica se proporciona terminada. */
public class MainJavaFX {
    /** @param args argumentos no utilizados */
    public static void main(String[] args) {
        try {
            GUI.abrir();

            // TODO 01: Define los nombres, las constantes y el estado inicial de los dos participantes.

            // TODO 02: Muestra el estado inicial de ambos participantes en la interfaz.

            // TODO 03: Ejecuta veinte rondas solicitando las decisiones y aplicando las reglas de ambos participantes.

            // TODO 04: Actualiza la interfaz tras cada ronda con la opcion aplicada, la potencia y la distancia de ambos participantes.

            // TODO 05: Muestra el resultado final de la carrera contemplando el empate.

        } catch (CancellationException e) {
            // La cancelacion y el cierre de ventana ya estan gestionados por GUI.
        } finally {
            GUI.finalizar();
        }
    }
}
