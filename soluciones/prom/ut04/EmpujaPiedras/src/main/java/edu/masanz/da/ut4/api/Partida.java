package edu.masanz.da.ut4.api;

/** Contrato de lectura y acciones utilizado por ambas vistas. No depende de JavaFX. */
public interface Partida {
    /** @return codigo visual de cuatro cifras de la partida; cero en vista previa */
    int getCodigoPartida();
    /** @return porcentaje decimal de destinos cubiertos */
    double getProgreso();
    /** @return anchura del nivel actual, en casillas */
    int getAnchura();
    /** @return altura del nivel actual, en casillas */
    int getAltura();
    /** @return numero del nivel actual, comenzando en 1 */
    int getNumeroNivel();
    /** @return cantidad de niveles de la partida */
    int getTotalNiveles();
    /** @return titulo del nivel actual */
    String getTituloNivel();
    /** @return movimientos validos desde el inicio o reinicio del nivel */
    int getMovimientos();
    /** @return empujes validos desde el inicio o reinicio del nivel */
    int getEmpujes();
    /** @return cantidad de destinos del nivel actual */
    int getCantidadDestinos();
    /** @return destinos actualmente ocupados por piedras */
    int getDestinosCubiertos();
    /** @return true si todos los destinos estan cubiertos */
    boolean estaResuelto();
    /** @return true si se ha resuelto el ultimo nivel */
    boolean estaTerminada();
    /** @return true solo para la vista previa estatica suministrada */
    boolean esVistaPrevia();
    /** @return explicacion breve del resultado de la ultima accion */
    String getMensaje();

    /**
     * Consulta una casilla sin modificar el juego.
     * @param x columna, empezando en cero
     * @param y fila, empezando en cero
     * @return '.', 'J', 'P', 'D', '*' (piedra sobre destino) o '+' (jugador sobre destino)
     * @throws IllegalArgumentException si la coordenada esta fuera del tablero
     */
    char getCasilla(int x, int y);

    /**
     * Procesa una sola accion, sin lecturas de teclado ni bucles de interaccion.
     * @param direccion W, A, S o D, en mayuscula o minuscula
     * @return true si el jugador cambia de posicion; false si queda bloqueado
     * @throws IllegalArgumentException si la direccion no es reconocida
     */
    boolean mover(String direccion);

    /** Restaura el nivel actual y pone sus contadores a cero. */
    void reiniciar();

    /**
     * Avanza exclusivamente desde un nivel resuelto que no sea el ultimo.
     * @return true si cambia de nivel; false si no puede avanzar
     */
    boolean siguienteNivel();
}
