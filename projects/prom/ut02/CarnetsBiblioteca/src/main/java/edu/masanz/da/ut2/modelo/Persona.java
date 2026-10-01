package edu.masanz.da.ut2.modelo;

public class Persona {
    private String nombre;
    private CarnetBiblioteca carnet;

    /**
     * Crea una persona sin nombre y sin carnet.
     */
    public Persona() {
        this.nombre = "";
    }

    /**
     * Crea una persona con nombre y sin carnet.
     *
     * @param nombre nombre de la persona
     */
    public Persona(String nombre) {
        this.nombre = nombre;
    }

    /**
     * Devuelve una descripcion de la persona.
     *
     * @return texto con el nombre y el carnet asociado
     */
    @Override
    public String toString() {
        return "Persona{nombre='" + nombre + "', carnet=" + obtenerInfoCarnet() + "}";
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
     * Devuelve el carnet de biblioteca de la persona.
     *
     * @return carnet de biblioteca o null si no tiene carnet
     */
    public CarnetBiblioteca getCarnet() {
        return carnet;
    }

    /**
     * Asigna un carnet de biblioteca a la persona.
     *
     * @param carnet carnet que se asignara a la persona
     */
    public void setCarnet(CarnetBiblioteca carnet) {
        this.carnet = carnet;
    }

    /**
     * Muestra por consola la informacion de la persona.
     */
    public void mostrarInformacion() {
        System.out.println(this);
    }

    /**
     * Devuelve informacion breve del carnet de la persona.
     *
     * @return texto con informacion del carnet o un mensaje si no tiene carnet
     */
    private String obtenerInfoCarnet() {
        if (carnet == null) {
            return "sin carnet";
        }

        return String.valueOf(carnet.getNumero());
    }
}
