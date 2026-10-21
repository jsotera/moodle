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
        // TODO: implementar segun el contrato y el enunciado.
        throw new UnsupportedOperationException("Pendiente de implementar: Destino.Destino");
    }

    /** @return columna */
    public int getX() {
        // TODO: implementar segun el contrato y el enunciado.
        throw new UnsupportedOperationException("Pendiente de implementar: Destino.getX");
    }

    /** @return fila */
    public int getY() {
        // TODO: implementar segun el contrato y el enunciado.
        throw new UnsupportedOperationException("Pendiente de implementar: Destino.getY");
    }

    /** @return descripcion de la casilla */
    @Override
    public String toString() {
        // TODO: implementar segun el contrato y el enunciado.
        throw new UnsupportedOperationException("Pendiente de implementar: Destino.toString");
    }
}
