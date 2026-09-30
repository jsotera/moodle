package edu.masanz.da.ut2.modelo;

public class Persona {
    private String nombre;
    private String jugadaActual;
    private int partidasGanadas;
    private int partidasPerdidas;
    private int partidasEmpatadas;

    /**
     * Crea una persona sin nombre y con todos sus marcadores a cero.
     */
    public Persona() {
        this.nombre = "";
        this.jugadaActual = "";
    }

    /**
     * Crea una persona con nombre y con todos sus marcadores a cero.
     *
     * @param nombre nombre de la persona
     */
    public Persona(String nombre) {
        this.nombre = nombre;
        this.jugadaActual = "";
    }

    /**
     * Devuelve una descripcion completa de la persona.
     *
     * @return texto con nombre, jugada actual y marcador
     */
    @Override
    public String toString() {
        return "Persona{nombre='" + nombre + "', jugadaActual='" + jugadaActual
                + "', ganadas=" + partidasGanadas
                + ", perdidas=" + partidasPerdidas
                + ", empatadas=" + partidasEmpatadas + "}";
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
     * Devuelve la jugada actual de la persona.
     *
     * @return piedra, papel, tijera o texto vacio si todavia no ha jugado
     */
    public String getJugadaActual() {
        return jugadaActual;
    }

    /**
     * Asigna la jugada actual de la persona.
     *
     * @param jugadaActual nueva jugada de la persona
     */
    void setJugadaActual(String jugadaActual) {
        this.jugadaActual = jugadaActual;
    }

    /**
     * Devuelve cuantas partidas ha ganado.
     *
     * @return numero de partidas ganadas
     */
    public int getPartidasGanadas() {
        return partidasGanadas;
    }

    /**
     * Devuelve cuantas partidas ha perdido.
     *
     * @return numero de partidas perdidas
     */
    public int getPartidasPerdidas() {
        return partidasPerdidas;
    }

    /**
     * Devuelve cuantas partidas ha empatado.
     *
     * @return numero de partidas empatadas
     */
    public int getPartidasEmpatadas() {
        return partidasEmpatadas;
    }

    /**
     * Suma una victoria a la persona.
     */
    void sumarVictoria() {
        partidasGanadas++;
    }

    /**
     * Suma una derrota a la persona.
     */
    void sumarDerrota() {
        partidasPerdidas++;
    }

    /**
     * Suma un empate a la persona.
     */
    void sumarEmpate() {
        partidasEmpatadas++;
    }
}
