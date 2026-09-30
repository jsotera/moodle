package edu.masanz.da.ut2.app;

import edu.masanz.da.ut2.modelo.Consola;
import edu.masanz.da.ut2.modelo.Persona;
import edu.masanz.da.ut2.modelo.VideoJuego;

public class Main {
    public static void main(String[] args) {
        // TODO Crea varias personas.
        Persona persona1 = new Persona("Ane");

        // TODO Crea consolas con propietario.
        Consola consola = new Consola("RetroBox", persona1);

        // TODO Crea videojuegos.
        VideoJuego videoJuego = new VideoJuego("Pixel Kart");

        // TODO Haz que una persona reciba una consola, inserte un juego y la utilice.

        // TODO Presta la consola a otra persona y vuelve a utilizarla.

        // TODO Comprueba el estado del propietario cuando la consola se estropee.
        //  Recuerda que la consola puede estar en uso por otra persona,
        //  pero su propietario sigue siendo siempre el mismo objeto Persona.
    }
}
