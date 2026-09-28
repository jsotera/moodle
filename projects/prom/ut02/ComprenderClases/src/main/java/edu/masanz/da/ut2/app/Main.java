package edu.masanz.da.ut2.app;

import edu.masanz.da.ut2.modelo.Pelicula;
import edu.masanz.da.ut2.modelo.Persona;

public class Main {
    public static void main(String[] args) {
        Persona directora = new Persona("Ane");
        Pelicula pelicula = new Pelicula("La noche del codigo", directora);

        System.out.println(directora.presentarse());
        System.out.println(pelicula.obtenerResumen());
    }
}
