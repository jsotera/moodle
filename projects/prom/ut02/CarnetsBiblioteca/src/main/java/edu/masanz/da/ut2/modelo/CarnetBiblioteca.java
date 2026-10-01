package edu.masanz.da.ut2.modelo;

public class CarnetBiblioteca {
    private static int siguienteNumero = 1000;

    private int numero;
    private Persona titular;
    private boolean activo;

    /**
     * Crea un carnet sin titular, activo y con numero automatico.
     */
    public CarnetBiblioteca() {
        this.numero = siguienteNumero;
        siguienteNumero++;
        this.activo = true;
    }

    /**
     * Crea un carnet activo con titular y numero automatico.
     *
     * @param titular persona titular del carnet
     */
    public CarnetBiblioteca(Persona titular) {
        this.numero = siguienteNumero;
        siguienteNumero++;
        this.titular = titular;
        this.activo = true;
        titular.setCarnet(this);
    }

    /**
     * Devuelve una descripcion del carnet.
     *
     * @return texto con numero, titular y estado del carnet
     */
    @Override
    public String toString() {
        return "CarnetBiblioteca{numero=" + numero
                + ", titular=" + obtenerNombreTitular()
                + ", activo=" + activo + "}";
    }

    /**
     * Devuelve el numero que recibira el siguiente carnet que se cree.
     *
     * @return siguiente numero disponible
     */
    public static int consultarSiguienteNumero() {
        return siguienteNumero;
    }

    /**
     * Reinicia el contador compartido de carnets.
     *
     * @param nuevoSiguienteNumero nuevo numero para el siguiente carnet
     */
    public static void reiniciarSiguienteNumero(int nuevoSiguienteNumero) {
        siguienteNumero = nuevoSiguienteNumero;
    }

    /**
     * Devuelve el numero del carnet.
     *
     * @return numero del carnet
     */
    public int getNumero() {
        return numero;
    }

    /**
     * Devuelve la persona titular del carnet.
     *
     * @return titular del carnet
     */
    public Persona getTitular() {
        return titular;
    }

    /**
     * Asigna una persona titular al carnet.
     *
     * @param titular nuevo titular del carnet
     */
    public void setTitular(Persona titular) {
        this.titular = titular;
        titular.setCarnet(this);
    }

    /**
     * Devuelve si el carnet esta activo.
     *
     * @return true si esta activo, false si esta desactivado
     */
    public boolean isActivo() {
        return activo;
    }

    /**
     * Activa el carnet.
     */
    public void activar() {
        activo = true;
    }

    /**
     * Desactiva el carnet.
     */
    public void desactivar() {
        activo = false;
    }

    /**
     * Muestra por consola la informacion del carnet.
     */
    public void mostrarInformacion() {
        System.out.println(this);
    }

    /**
     * Devuelve el nombre del titular o un texto si no tiene titular.
     *
     * @return nombre del titular o texto informativo
     */
    private String obtenerNombreTitular() {
        if (titular == null) {
            return "sin titular";
        }

        return titular.getNombre();
    }
}
