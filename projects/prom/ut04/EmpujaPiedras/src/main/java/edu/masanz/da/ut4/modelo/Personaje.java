package edu.masanz.da.ut4.modelo;

/** Personaje con posicion inicial inmutable y posicion actual modificable. */
public class Personaje {
    private final int xInicial;
    private final int yInicial;
    private int x;
    private int y;

    /**
     * @param x columna inicial no negativa
     * @param y fila inicial no negativa
     * @throws IllegalArgumentException si alguna coordenada es negativa
     */
    public Personaje(int x, int y) {
        // TODO: implementar segun el contrato y el enunciado.
        throw new UnsupportedOperationException("Pendiente de implementar: Personaje.Personaje");
    }

    /** @return columna actual */
    public int getX() {
        // TODO: implementar segun el contrato y el enunciado.
        throw new UnsupportedOperationException("Pendiente de implementar: Personaje.getX");
    }

    /** @return fila actual */
    public int getY() {
        // TODO: implementar segun el contrato y el enunciado.
        throw new UnsupportedOperationException("Pendiente de implementar: Personaje.getY");
    }

    /**
     * Cambia la posicion; Nivel comprueba antes los limites y colisiones.
     * @param x columna no negativa
     * @param y fila no negativa
     * @throws IllegalArgumentException si alguna coordenada es negativa
     */
    public void colocarEn(int x, int y) {
        // TODO: implementar segun el contrato y el enunciado.
        throw new UnsupportedOperationException("Pendiente de implementar: Personaje.colocarEn");
    }

    /** Recupera las coordenadas iniciales. */
    public void reiniciar() {
        // TODO: implementar segun el contrato y el enunciado.
        throw new UnsupportedOperationException("Pendiente de implementar: Personaje.reiniciar");
    }

    /** @return descripcion de la posicion actual */
    @Override
    public String toString() {
        // TODO: implementar segun el contrato y el enunciado.
        throw new UnsupportedOperationException("Pendiente de implementar: Personaje.toString");
    }
}
