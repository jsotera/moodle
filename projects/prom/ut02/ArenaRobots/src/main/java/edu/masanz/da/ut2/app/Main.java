package edu.masanz.da.ut2.app;

import edu.masanz.da.ut2.modelo.Arena;
import edu.masanz.da.ut2.modelo.Robot;

public class Main {
    public static void main(String[] args) {
        // TODO Crea una arena.
        Arena arena = new Arena();

        // TODO Crea 6 robots e inscribelos en la arena.
        Robot robot1 = new Robot("Ares");

        // TODO Realiza varias rondas de combate.

        // TODO Muestra el podio.

        // TODO Parte avanzada:
        //  Restablece la arena, inscribe solo a los 3 robots que iban ganando
        //  y realiza 10 rondas nuevas sin modificar manualmente sus vidas.
    }
}
