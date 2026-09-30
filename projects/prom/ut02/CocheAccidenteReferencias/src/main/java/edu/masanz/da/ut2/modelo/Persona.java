package edu.masanz.da.ut2.modelo;

public class Persona {
    private String nombre;
    private String lesion;

    /**
     * Crea una persona sin nombre y sin lesion.
     */
    public Persona() {
        this.nombre = "";
        this.lesion = "";
    }

    /**
     * Crea una persona con nombre y sin lesion.
     *
     * @param nombre nombre de la persona
     */
    public Persona(String nombre) {
        this.nombre = nombre;
        this.lesion = "";
    }

    /**
     * Crea una persona indicando todos sus datos.
     *
     * @param nombre nombre de la persona
     * @param lesion texto que describe la lesion
     */
    public Persona(String nombre, String lesion) {
        this.nombre = nombre;
        this.lesion = lesion;
    }

    /**
     * Devuelve una descripcion de la persona y de su estado.
     *
     * @return texto con el nombre y la lesion de la persona
     */
    @Override
    public String toString() {
        if (lesion == null || lesion.isEmpty()) {
            return nombre + " no tiene lesiones";
        }

        return nombre + " tiene " + lesion;
    }

    /**
     * Devuelve el nombre de la persona.
     *
     * @return nombre de la persona
     */
    public String getNombre() {
        return nombre;
    }

    /**
     * Modifica el nombre de la persona.
     *
     * @param nombre nuevo nombre de la persona
     */
    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    /**
     * Devuelve la lesion actual de la persona.
     *
     * @return texto con la lesion de la persona
     */
    public String getLesion() {
        return lesion;
    }

    /**
     * Modifica la lesion actual de la persona.
     *
     * @param lesion nueva lesion de la persona
     */
    public void setLesion(String lesion) {
        this.lesion = lesion;
    }

    /**
     * Muestra por consola informacion sobre la lesion de la persona.
     */
    public void informarSobreLesion() {
        if (lesion == null || lesion.isEmpty()) {
            System.out.println(nombre + " no sufre ninguna lesion.");
        } else {
            System.out.println(nombre + " sufre la siguiente lesion: " + lesion + ".");
        }
    }
}
