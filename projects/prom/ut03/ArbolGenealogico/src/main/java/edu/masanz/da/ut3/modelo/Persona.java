package edu.masanz.da.ut3.modelo;

import java.util.Random;

/** Una persona conserva referencias a sus dos progenitores, no copias. */
public class Persona {
    private String nombre;
    private Persona padre;
    private Persona madre;

    /**
     * Conserva el nombre recibido y comienza sin progenitores conocidos.
     * @param nombre nombre no nulo ni en blanco, sin saltos ni tabuladores;
     * puede ser un nombre propio o iniciales con formato A.B.C
     */
    public Persona(String nombre) {
        this.nombre = nombre;
        padre = null;
        madre = null;
    }

    /**
     * Conserva el nombre y las referencias recibidas, sin generar personas.
     * @param nombre nombre no nulo ni en blanco, sin saltos ni tabuladores
     * @param padre padre conocido, o null si se desconoce
     * @param madre madre conocida, o null si se desconoce
     */
    public Persona(String nombre, Persona padre, Persona madre) {
        this.nombre = nombre;
        this.padre = padre;
        this.madre = madre;
    }

    /**
     * Genera tres iniciales independientes de la A a la Z, separadas por puntos.
     * Cada letra procede de convertir a char un entero aleatorio entre 65 y 90.
     * @param random generador no nulo que proporciona la aplicacion
     * @return nombre de cinco caracteres, por ejemplo J.J.S
     */
    public static String generarNombreAleatorio(Random random) {
        // TODO 11: Genera un nombre con tres letras mayusculas aleatorias separadas por puntos mediante conversiones de int a char.
        return null;
    }

    /** @return nombre o iniciales de la persona */
    public String getNombre() {
        return nombre;
    }

    /** @return padre, o null si no se ha generado */
    public Persona getPadre() {
        return padre;
    }

    /** @param padre referencia que se conserva como padre */
    public void setPadre(Persona padre) {
        this.padre = padre;
    }

    /** @return madre, o null si no se ha generado */
    public Persona getMadre() {
        return madre;
    }

    /** @param madre referencia que se conserva como madre */
    public void setMadre(Persona madre) {
        this.madre = madre;
    }

    /** @return nombre entre corchetes, por ejemplo [J.J.S] o [Lucia] */
    @Override
    public String toString() {
        return "[" + nombre + "]";
    }
}
