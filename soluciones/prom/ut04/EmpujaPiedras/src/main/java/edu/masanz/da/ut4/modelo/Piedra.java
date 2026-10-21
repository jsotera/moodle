package edu.masanz.da.ut4.modelo;

/** Piedra con posicion inicial inmutable y posicion actual modificable. */
public class Piedra {
    private final int xInicial;
    private final int yInicial;
    private int x;
    private int y;

    /**
     * @param x columna inicial no negativa
     * @param y fila inicial no negativa
     * @throws IllegalArgumentException si alguna coordenada es negativa
     */
    public Piedra(int x, int y) {
        if (x < 0 || y < 0) {
            throw new IllegalArgumentException("Coordenadas negativas.");
        }
        xInicial = x;
        yInicial = y;
        this.x = x;
        this.y = y;
    }

    /** @return columna actual */
    public int getX() {
        return x;
    }

    /** @return fila actual */
    public int getY() {
        return y;
    }

    /**
     * Cambia la posicion; Nivel comprueba antes los limites y colisiones.
     * @param x columna no negativa
     * @param y fila no negativa
     * @throws IllegalArgumentException si alguna coordenada es negativa
     */
    public void colocarEn(int x, int y) {
        if (x < 0 || y < 0) {
            throw new IllegalArgumentException("Coordenadas negativas.");
        }
        this.x = x;
        this.y = y;
    }

    /** Recupera las coordenadas iniciales. */
    public void reiniciar() {
        x = xInicial;
        y = yInicial;
    }

    /** @return descripcion de la posicion actual */
    @Override
    public String toString() {
        return "Piedra(" + x + ", " + y + ")";
    }
}
