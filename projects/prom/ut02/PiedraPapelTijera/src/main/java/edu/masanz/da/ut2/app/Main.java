package edu.masanz.da.ut2.app;

import edu.masanz.da.ut2.modelo.Juego;
import edu.masanz.da.ut2.modelo.Persona;

public class Main {
    public static void main(String[] args) {
        // TODO Crea dos personas.
        Persona persona1 = new Persona("Ane");
        Persona persona2 = new Persona("Markel");

        // TODO Crea un juego con esas dos personas.
        Juego juego = new Juego(persona1, persona2);

        // TODO Juega varias partidas.

        // TODO Muestra el marcador desde el juego.

        // TODO Muestra tambien las personas originales.
        //  Observa que sus contadores han cambiado porque el juego
        //  ha trabajado con esas mismas referencias.
    }
}
