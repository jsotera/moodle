package edu.masanz.da.ut4.modelo;

import edu.masanz.da.ut4.listados.IListado;

/** Reglas del tablero. No almacena una matriz ni conoce ninguna vista. */
public class Nivel {
    private final String titulo;
    private final int anchura;
    private final int altura;
    private final Personaje personaje;
    private final IListado<Piedra> piedras;
    private final IListado<Destino> destinos;
    private int movimientos;
    private int empujes;

    /**
     * Construye un tablero inicialmente sin piedras ni destinos.
     * @param titulo nombre no vacio
     * @param anchura numero positivo de columnas
     * @param altura numero positivo de filas
     * @param personaje personaje no nulo situado dentro del tablero
     * @throws IllegalArgumentException si algun dato no es valido
     */
    public Nivel(String titulo, int anchura, int altura, Personaje personaje) {
        // TODO: implementar segun el contrato y el enunciado.
        throw new UnsupportedOperationException("Pendiente de implementar: Nivel.Nivel");
    }

    /**
     * Incorpora una piedra al configurar el nivel, antes de comenzar a jugar.
     * @param piedra objeto no nulo dentro del tablero y en una casilla libre de personaje y piedras
     * @throws IllegalArgumentException si no se puede incluir
     */
    public void incluirPiedra(Piedra piedra) {
        // TODO: implementar segun el contrato y el enunciado.
        throw new UnsupportedOperationException("Pendiente de implementar: Nivel.incluirPiedra");
    }

    /**
     * Incorpora un destino; puede coincidir con el personaje o una piedra.
     * @param destino objeto no nulo dentro del tablero, sin otro destino en esa casilla
     * @throws IllegalArgumentException si no se puede incluir
     */
    public void incluirDestino(Destino destino) {
        // TODO: implementar segun el contrato y el enunciado.
        throw new UnsupportedOperationException("Pendiente de implementar: Nivel.incluirDestino");
    }

    /**
     * Comprueba que el nivel tiene piedras y destinos en igual cantidad.
     * @throws IllegalArgumentException si el nivel no esta listo para jugar
     */
    public void validarConfiguracion() {
        // TODO: implementar segun el contrato y el enunciado.
        throw new UnsupportedOperationException("Pendiente de implementar: Nivel.validarConfiguracion");
    }

    /** @return titulo del nivel */
    public String getTitulo() {
        // TODO: implementar segun el contrato y el enunciado.
        throw new UnsupportedOperationException("Pendiente de implementar: Nivel.getTitulo");
    }
    /** @return numero de columnas */
    public int getAnchura() {
        // TODO: implementar segun el contrato y el enunciado.
        throw new UnsupportedOperationException("Pendiente de implementar: Nivel.getAnchura");
    }
    /** @return numero de filas */
    public int getAltura() {
        // TODO: implementar segun el contrato y el enunciado.
        throw new UnsupportedOperationException("Pendiente de implementar: Nivel.getAltura");
    }
    /** @return movimientos validos */
    public int getMovimientos() {
        // TODO: implementar segun el contrato y el enunciado.
        throw new UnsupportedOperationException("Pendiente de implementar: Nivel.getMovimientos");
    }
    /** @return empujes validos */
    public int getEmpujes() {
        // TODO: implementar segun el contrato y el enunciado.
        throw new UnsupportedOperationException("Pendiente de implementar: Nivel.getEmpujes");
    }
    /** @return cantidad de destinos */
    public int getCantidadDestinos() {
        // TODO: implementar segun el contrato y el enunciado.
        throw new UnsupportedOperationException("Pendiente de implementar: Nivel.getCantidadDestinos");
    }

    /**
     * @param x columna
     * @param y fila
     * @return true si la posicion pertenece al tablero
     */
    public boolean estaDentro(int x, int y) {
        // TODO: implementar segun el contrato y el enunciado.
        throw new UnsupportedOperationException("Pendiente de implementar: Nivel.estaDentro");
    }

    /**
     * @param x columna
     * @param y fila
     * @return piedra de la casilla, o null si no hay ninguna
     */
    public Piedra buscarPiedra(int x, int y) {
        // TODO: implementar segun el contrato y el enunciado.
        throw new UnsupportedOperationException("Pendiente de implementar: Nivel.buscarPiedra");
    }

    /**
     * @param x columna
     * @param y fila
     * @return true si existe un destino en esa posicion
     */
    public boolean hayDestino(int x, int y) {
        // TODO: implementar segun el contrato y el enunciado.
        throw new UnsupportedOperationException("Pendiente de implementar: Nivel.hayDestino");
    }

    /** @return numero de destinos cubiertos actualmente */
    public int getDestinosCubiertos() {
        // TODO: implementar segun el contrato y el enunciado.
        throw new UnsupportedOperationException("Pendiente de implementar: Nivel.getDestinosCubiertos");
    }

    /** @return true si hay al menos un destino y todos estan cubiertos */
    public boolean estaResuelto() {
        // TODO: implementar segun el contrato y el enunciado.
        throw new UnsupportedOperationException("Pendiente de implementar: Nivel.estaResuelto");
    }

    /**
     * Consulta simbolos para ambas vistas; el destino se conserva bajo los objetos.
     * @param x columna
     * @param y fila
     * @return '.', 'J', 'P', 'D', '*' o '+'
     * @throws IllegalArgumentException si la coordenada queda fuera del tablero
     */
    public char getCasilla(int x, int y) {
        // TODO: implementar segun el contrato y el enunciado.
        throw new UnsupportedOperationException("Pendiente de implementar: Nivel.getCasilla");
    }

    /**
     * Valida todo el empuje antes de modificar ningun objeto.
     * @param dx desplazamiento horizontal
     * @param dy desplazamiento vertical
     * @return true si se realiza el movimiento; false si se bloquea o ya esta resuelto
     * @throws IllegalArgumentException si el desplazamiento no es de una casilla ortogonal
     */
    public boolean mover(int dx, int dy) {
        // TODO: implementar segun el contrato y el enunciado.
        throw new UnsupportedOperationException("Pendiente de implementar: Nivel.mover");
    }

    /** Recupera el estado inicial de todos los objetos y los contadores. */
    public void reiniciar() {
        // TODO: implementar segun el contrato y el enunciado.
        throw new UnsupportedOperationException("Pendiente de implementar: Nivel.reiniciar");
    }

    /** @return resumen del nivel */
    @Override
    public String toString() {
        // TODO: implementar segun el contrato y el enunciado.
        throw new UnsupportedOperationException("Pendiente de implementar: Nivel.toString");
    }
}
