package edu.masanz.da.ut2.modelo;

public class Persona {
    private String nombre;
    private String estado;
    private Consola consolaEnUso;

    /**
     * Crea una persona sin nombre, tranquila y sin consola en uso.
     */
    public Persona() {
        this.nombre = "";
        this.estado = "tranquilo";
    }

    /**
     * Crea una persona con nombre, tranquila y sin consola en uso.
     *
     * @param nombre nombre de la persona
     */
    public Persona(String nombre) {
        this.nombre = nombre;
        this.estado = "tranquilo";
    }

    /**
     * Crea una persona indicando todos sus datos principales.
     *
     * @param nombre nombre de la persona
     * @param estado estado emocional de la persona
     */
    public Persona(String nombre, String estado) {
        this.nombre = nombre;
        this.estado = estado;
    }

    /**
     * Devuelve una descripcion de la persona.
     *
     * @return texto con nombre, estado y consola en uso
     */
    @Override
    public String toString() {
        return "Persona{nombre='" + nombre + "', estado='" + estado
                + "', consolaEnUso=" + obtenerNombreConsolaEnUso() + "}";
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
     * Devuelve el estado emocional de la persona.
     *
     * @return estado de la persona
     */
    public String getEstado() {
        return estado;
    }

    /**
     * Modifica el estado emocional de la persona.
     *
     * @param estado nuevo estado de la persona
     */
    public void setEstado(String estado) {
        this.estado = estado;
    }

    /**
     * Devuelve la consola que esta utilizando actualmente.
     *
     * @return consola en uso o null si no tiene ninguna
     */
    public Consola getConsolaEnUso() {
        return consolaEnUso;
    }

    /**
     * Recibe una consola para poder utilizarla.
     *
     * @param consola consola que pasa a estar en uso
     */
    public void recibirConsola(Consola consola) {
        consolaEnUso = consola;
        System.out.println(nombre + " tiene ahora en uso la consola " + consola.getModelo() + ".");
    }

    /**
     * Deja de utilizar la consola actual.
     */
    public void soltarConsola() {
        consolaEnUso = null;
        System.out.println(nombre + " ya no tiene ninguna consola en uso.");
    }

    /**
     * Presta la consola que esta usando a otra persona.
     *
     * @param persona persona que recibira la consola
     */
    public void prestarConsolaEnUsoA(Persona persona) {
        if (consolaEnUso == null) {
            System.out.println(nombre + " no tiene ninguna consola para prestar.");
            return;
        }

        persona.recibirConsola(consolaEnUso);
        consolaEnUso = null;
        System.out.println(nombre + " ha prestado la consola a " + persona.getNombre() + ".");
    }

    /**
     * Inserta un videojuego en la consola que esta usando esta persona.
     *
     * @param videoJuego videojuego que se insertara
     */
    public void insertarJuegoEnConsola(VideoJuego videoJuego) {
        if (consolaEnUso == null) {
            System.out.println(nombre + " no tiene ninguna consola en uso.");
            return;
        }

        consolaEnUso.insertarJuego(videoJuego);
    }

    /**
     * Utiliza la consola que tiene actualmente en uso.
     */
    public void utilizarConsola() {
        if (consolaEnUso == null) {
            System.out.println(nombre + " no tiene ninguna consola en uso.");
            return;
        }

        consolaEnUso.utilizar();
    }

    /**
     * Muestra por consola el estado actual de la persona.
     */
    public void informarEstado() {
        System.out.println(nombre + " esta " + estado + ".");
    }

    /**
     * Obtiene el modelo de la consola en uso o un texto informativo.
     *
     * @return modelo de la consola o texto si no tiene
     */
    private String obtenerNombreConsolaEnUso() {
        if (consolaEnUso == null) {
            return "ninguna";
        }

        return consolaEnUso.getModelo();
    }
}
