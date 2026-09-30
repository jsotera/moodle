package edu.masanz.da.ut2.modelo;

public class Rectangulo {
    private int x;
    private int y;
    private int altura;
    private int anchura;

    /**
     * Crea un rectangulo con todos sus valores a cero.
     */
    public Rectangulo() {
    }

    /**
     * Crea un rectangulo indicando coordenadas y tamanio.
     *
     * @param x coordenada horizontal de la esquina superior izquierda
     * @param y coordenada vertical de la esquina superior izquierda
     * @param altura altura del rectangulo
     * @param anchura anchura del rectangulo
     */
    public Rectangulo(int x, int y, int altura, int anchura) {
        this.x = x;
        this.y = y;
        this.altura = altura;
        this.anchura = anchura;
    }

    /**
     * Devuelve una descripcion del rectangulo.
     *
     * @return texto con coordenadas y tamanio
     */
    @Override
    public String toString() {
        return "Rectangulo{x=" + x
                + ", y=" + y
                + ", altura=" + altura
                + ", anchura=" + anchura + "}";
    }

    /**
     * Devuelve la coordenada horizontal.
     *
     * @return coordenada x
     */
    public int getX() {
        return x;
    }

    /**
     * Modifica la coordenada horizontal.
     *
     * @param x nueva coordenada x
     */
    public void setX(int x) {
        this.x = x;
    }

    /**
     * Devuelve la coordenada vertical.
     *
     * @return coordenada y
     */
    public int getY() {
        return y;
    }

    /**
     * Modifica la coordenada vertical.
     *
     * @param y nueva coordenada y
     */
    public void setY(int y) {
        this.y = y;
    }

    /**
     * Devuelve la altura.
     *
     * @return altura del rectangulo
     */
    public int getAltura() {
        return altura;
    }

    /**
     * Modifica la altura.
     *
     * @param altura nueva altura
     */
    public void setAltura(int altura) {
        this.altura = altura;
    }

    /**
     * Devuelve la anchura.
     *
     * @return anchura del rectangulo
     */
    public int getAnchura() {
        return anchura;
    }

    /**
     * Modifica la anchura.
     *
     * @param anchura nueva anchura
     */
    public void setAnchura(int anchura) {
        this.anchura = anchura;
    }
}
