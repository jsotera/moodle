package edu.masanz.da.ut2.modelo;

public class VideoJuego {
    private String nombre;
    private int vecesUtilizado;

    /**
     * Crea un videojuego sin nombre y sin usos.
     */
    public VideoJuego() {
        this.nombre = "";
        this.vecesUtilizado = 0;
    }

    /**
     * Crea un videojuego con nombre y sin usos.
     *
     * @param nombre nombre del videojuego
     */
    public VideoJuego(String nombre) {
        this.nombre = nombre;
        this.vecesUtilizado = 0;
    }

    /**
     * Devuelve una descripcion del videojuego.
     *
     * @return texto con el nombre y numero de usos
     */
    @Override
    public String toString() {
        return "VideoJuego{nombre='" + nombre + "', vecesUtilizado=" + vecesUtilizado + "}";
    }

    /**
     * Devuelve el nombre del videojuego.
     *
     * @return nombre del videojuego
     */
    public String getNombre() {
        return nombre;
    }

    /**
     * Modifica el nombre del videojuego.
     *
     * @param nombre nuevo nombre del videojuego
     */
    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    /**
     * Devuelve cuantas veces se ha utilizado el videojuego.
     *
     * @return numero de usos del videojuego
     */
    public int getVecesUtilizado() {
        return vecesUtilizado;
    }

    /**
     * Incrementa en uno el numero de usos del videojuego.
     */
    void incrementarVecesUtilizado() {
        vecesUtilizado++;
    }
}
