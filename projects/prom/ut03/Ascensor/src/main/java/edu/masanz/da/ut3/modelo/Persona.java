package edu.masanz.da.ut3.modelo;

/** Persona con un peso y una planta de destino que no cambian durante su viaje. */
public class Persona {
    private String nombre;
    private int pesoKg;
    private int plantaDestino;

    /**
     * Inicializa los datos del viaje.
     * @param nombre nombre no nulo ni en blanco
     * @param pesoKg peso entero positivo en kilogramos
     * @param plantaDestino planta entre Ascensor.PLANTA_MINIMA y Ascensor.PLANTA_MAXIMA
     * @throws IllegalArgumentException si alguno de los datos no es valido
     */
    public Persona(String nombre, int pesoKg, int plantaDestino) {
        // TODO 11: Inicializa los datos de la persona y rechaza los que no cumplan los requisitos.
    }

    /** @return nombre de la persona */
    public String getNombre() {
        return nombre;
    }

    /** @return peso en kilogramos */
    public int getPesoKg() {
        return pesoKg;
    }

    /** @return planta a la que quiere llegar */
    public int getPlantaDestino() {
        return plantaDestino;
    }

    /** @return descripcion con nombre, peso y destino */
    @Override
    public String toString() {
        return "Persona{nombre='" + nombre + "', pesoKg=" + pesoKg
                + ", plantaDestino=" + plantaDestino + "}";
    }
}
