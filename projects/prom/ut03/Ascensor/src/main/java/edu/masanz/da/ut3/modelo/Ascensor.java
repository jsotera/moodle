package edu.masanz.da.ut3.modelo;

/** Ascensor de tres plazas independientes, sin arrays ni colecciones. */
public class Ascensor {
    public static final int PLANTA_MINIMA = 0;
    public static final int PLANTA_MAXIMA = 5;
    public static final int PESO_MAXIMO_KG = 200;
    public static final int CAPACIDAD = 3;

    private int plantaActual;
    private Persona persona1;
    private Persona persona2;
    private Persona persona3;

    /** Construye el ascensor vacio en la planta minima. */
    public Ascensor() {
        plantaActual = PLANTA_MINIMA;
        persona1 = null;
        persona2 = null;
        persona3 = null;
    }

    /** @return planta actual */
    public int getPlantaActual() {
        return plantaActual;
    }

    /** @return suma del peso de las personas presentes, o cero si esta vacio */
    public int getPesoActualKg() {
        // TODO 21: Calcula el peso total de las personas presentes.
        return 0;
    }

    /** @return cantidad de personas presentes, entre cero y tres */
    public int getCantidadPersonas() {
        // TODO 22: Cuenta las personas que viajan en el ascensor.
        return 0;
    }

    /**
     * Las plazas nunca se compactan: una baja deja libre esa misma posicion.
     * @param plaza posicion 1, 2 o 3
     * @return referencia almacenada, o null si esta libre o la posicion no es valida
     */
    public Persona obtenerPersona(int plaza) {
        // TODO 23: Devuelve la persona de la plaza solicitada, o null si la plaza no existe o se encuentra libre.
        return null;
    }

    /**
     * Ocupa la primera plaza libre si se cumplen todas las condiciones.
     * @param persona referencia a incorporar, sin crear una copia
     * @return true si entro; false sin cambios si es null, ya esta dentro,
     * quiere ir a la planta actual, no quedan plazas o se superan los 200 kg.
     * Alcanzar exactamente el peso maximo esta permitido.
     */
    public boolean subirPersona(Persona persona) {
        // TODO 24: Admite a la persona solicitada solo si cumple las reglas de acceso, sin cambios si se rechaza.
        return false;
    }

    /**
     * Busca por identidad y deja libre la plaza sin desplazar las demas.
     * @param persona instancia que desea bajar
     * @return true si estaba dentro y su destino es la planta actual; false
     * sin cambios si es null, no estaba o todavia no ha llegado a su destino
     */
    public boolean bajarPersona(Persona persona) {
        // TODO 25: Permite bajar a la persona solicitada solo cuando haya llegado a su destino, sin cambios si se rechaza.
        return false;
    }

    /**
     * Consulta el destino mas proximo de las personas presentes, sin moverlas.
     * @return planta mas cercana; en empate la menor; -1 si no hay personas
     */
    public int obtenerSiguienteDestino() {
        // TODO 26: Determina el siguiente destino respetando la distancia y las reglas de desempate.
        return 0;
    }

    /**
     * Cambia la planta exactamente en una unidad hacia el destino indicado.
     * Desde la planta 1, indicar destino 5 solo avanza hasta la planta 2.
     * Para llegar a la planta 5 se necesitan cuatro llamadas: 2, 3, 4 y 5.
     * Desde la planta 5, indicar destino 1 solo baja hasta la planta 4.
     * No gestiona entradas ni salidas.
     * @param destino planta objetivo que determina la direccion de un unico paso
     * @return true si se movio; false sin cambios si esta vacio, el destino
     * esta fuera de limites o ya esta en esa planta
     */
    public boolean moverUnaPlantaHacia(int destino) {
        // TODO 27: Desplaza el ascensor una sola planta hacia el destino solicitado cuando el movimiento sea posible.
        return false;
    }
}
