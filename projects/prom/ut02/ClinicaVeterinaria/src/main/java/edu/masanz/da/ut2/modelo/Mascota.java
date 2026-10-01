package edu.masanz.da.ut2.modelo;

public class Mascota {
    private String nombre;
    private String tipo;
    private int salud;
    private boolean vacunada;
    private String estado;

    /**
     * Crea una mascota sin datos, con salud cero y sin vacunar.
     */
    public Mascota() {
        this.nombre = "";
        this.tipo = "";
        this.estado = "sin revisar";
    }

    /**
     * Crea una mascota con nombre, tipo y salud inicial.
     *
     * @param nombre nombre de la mascota
     * @param tipo tipo de animal
     * @param salud valor de salud de la mascota
     */
    public Mascota(String nombre, String tipo, int salud) {
        this.nombre = nombre;
        this.tipo = tipo;
        this.salud = salud;
        this.vacunada = false;
        this.estado = "sin revisar";
    }

    /**
     * Devuelve una descripcion completa de la mascota.
     *
     * @return texto con los datos de la mascota
     */
    @Override
    public String toString() {
        return "Mascota{nombre='" + nombre + "', tipo='" + tipo
                + "', salud=" + salud + ", vacunada=" + vacunada
                + ", estado='" + estado + "'}";
    }

    /**
     * Devuelve el nombre de la mascota.
     *
     * @return nombre de la mascota
     */
    public String getNombre() {
        return nombre;
    }

    /**
     * Modifica el nombre de la mascota.
     *
     * @param nombre nuevo nombre de la mascota
     */
    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    /**
     * Devuelve el tipo de animal.
     *
     * @return tipo de animal
     */
    public String getTipo() {
        return tipo;
    }

    /**
     * Modifica el tipo de animal.
     *
     * @param tipo nuevo tipo de animal
     */
    public void setTipo(String tipo) {
        this.tipo = tipo;
    }

    /**
     * Devuelve la salud actual de la mascota.
     *
     * @return salud de la mascota
     */
    public int getSalud() {
        return salud;
    }

    /**
     * Modifica la salud actual de la mascota.
     *
     * @param salud nueva salud de la mascota
     */
    public void setSalud(int salud) {
        this.salud = salud;
    }

    /**
     * Devuelve si la mascota esta vacunada.
     *
     * @return true si esta vacunada, false en caso contrario
     */
    public boolean isVacunada() {
        return vacunada;
    }

    /**
     * Modifica si la mascota esta vacunada.
     *
     * @param vacunada nuevo estado de vacunacion
     */
    public void setVacunada(boolean vacunada) {
        this.vacunada = vacunada;
    }

    /**
     * Devuelve el estado textual de la mascota.
     *
     * @return estado de la mascota
     */
    public String getEstado() {
        return estado;
    }

    /**
     * Modifica el estado textual de la mascota.
     *
     * @param estado nuevo estado de la mascota
     */
    public void setEstado(String estado) {
        this.estado = estado;
    }

    /**
     * Muestra la informacion completa de la mascota.
     */
    public void mostrarInformacion() {
        System.out.println(this);
    }
}
