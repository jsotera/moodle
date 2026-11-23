package edu.masanz.da.ut3.app;

import edu.masanz.da.ut3.gui.GUI;
import edu.masanz.da.ut3.modelo.Mapa;
import edu.masanz.da.ut3.modelo.Personaje;
import edu.masanz.da.ut3.util.Conf;

/** Coordina la interfaz de consola y las reglas del mapa. */
public class Main {

    /**
     * Muestra los mapas disponibles y solicita un mapa inicial en un rango del 1 a 3.
     * Repite ante un error o dato no valido.
     * 0 sale sin crear el mapa.
     * Despues muestra el menu y mantiene el juego hasta salir, ganar o morir.
     * Tras cada accion distinta de 0 vuelve a dibujar. al finalizar muestra un unico mensaje.
     * Muestra mensajes personalizados en caso de finalizar el juego por salir, ganar o morir.
     */
    public static void main(String[] args) {
        GUI.mostrarTitulo();
        // TODO 31: Selecciona un mapa controlando las entradas incorrectas y ejecuta el juego hasta que finalice.
    }
}
