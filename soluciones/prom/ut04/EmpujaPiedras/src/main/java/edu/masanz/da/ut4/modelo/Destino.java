package edu.masanz.da.ut4.modelo;

/** Casilla de destino inmutable; no es un obstaculo. */
public class Destino {
    private final int x;
    private final int y;

    /**
     * @param x columna no negativa
     * @param y fila no negativa
     * @throws IllegalArgumentException si alguna coordenada es negativa
     */
    public Destino(int x, int y) {
        if (x < 0 || y < 0) {
            throw new IllegalArgumentException("Coordenadas negativas.");
        }
        this.x = x;
        this.y = y;
    }

    /** @return columna */
    public int getX() {
        return x;
    }

    /** @return fila */
    public int getY() {
        return y;
    }

    /** @return descripcion de la casilla */
    @Override
    public String toString() {
        return "Destino(" + x + ", " + y + ")";
    }
}
