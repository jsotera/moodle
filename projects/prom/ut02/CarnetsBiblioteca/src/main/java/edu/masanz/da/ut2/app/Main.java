package edu.masanz.da.ut2.app;

import edu.masanz.da.ut2.modelo.CarnetBiblioteca;
import edu.masanz.da.ut2.modelo.Persona;

public class Main {
    public static void main(String[] args) {
        // TODO Consulta el siguiente numero antes de crear carnets.
        System.out.println(CarnetBiblioteca.consultarSiguienteNumero());

        // TODO Crea varias personas.
        Persona persona1 = new Persona("Ane");

        // TODO Crea varios carnets y asignales titulares.
        CarnetBiblioteca carnet1 = new CarnetBiblioteca(persona1);

        // TODO Consulta el siguiente numero despues de crear carnets.

        // TODO Muestra la informacion de personas y carnets.

        // TODO Desactiva un carnet y comprueba que el resto no cambia.

        // TODO Crea un nuevo carnet al final y observa que el contador static sigue avanzando.
    }
}
