package edu.masanz.da.ut4.modelo;

import edu.masanz.da.ut4.listados.IListado;
import edu.masanz.da.ut4.listados.ListadoPiedras;
import edu.masanz.da.ut4.listados.ListadoDestinos;

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
        if (titulo == null || titulo.isBlank() || anchura <= 0 || altura <= 0
                || personaje == null || personaje.getX() >= anchura || personaje.getY() >= altura) {
            throw new IllegalArgumentException("Datos de nivel no validos.");
        }
        this.titulo = titulo;
        this.anchura = anchura;
        this.altura = altura;
        this.personaje = personaje;
        piedras = new ListadoPiedras();
        destinos = new ListadoDestinos();
    }

    /**
     * Incorpora una piedra al configurar el nivel, antes de comenzar a jugar.
     * @param piedra objeto no nulo dentro del tablero y en una casilla libre de personaje y piedras
     * @throws IllegalArgumentException si no se puede incluir
     */
    public void incluirPiedra(Piedra piedra) {
        if (piedra == null || !estaDentro(piedra.getX(), piedra.getY())
                || buscarPiedra(piedra.getX(), piedra.getY()) != null
                || (personaje.getX() == piedra.getX() && personaje.getY() == piedra.getY())) {
            throw new IllegalArgumentException("Posicion de piedra no valida.");
        }
        piedras.incluir(piedra);
    }

    /**
     * Incorpora un destino; puede coincidir con el personaje o una piedra.
     * @param destino objeto no nulo dentro del tablero, sin otro destino en esa casilla
     * @throws IllegalArgumentException si no se puede incluir
     */
    public void incluirDestino(Destino destino) {
        if (destino == null || !estaDentro(destino.getX(), destino.getY())
                || hayDestino(destino.getX(), destino.getY())) {
            throw new IllegalArgumentException("Posicion de destino no valida.");
        }
        destinos.incluir(destino);
    }

    /**
     * Comprueba que el nivel tiene piedras y destinos en igual cantidad.
     * @throws IllegalArgumentException si el nivel no esta listo para jugar
     */
    public void validarConfiguracion() {
        if (piedras.estaVacio() || piedras.getCantidad() != destinos.getCantidad()) {
            throw new IllegalArgumentException("Debe haber tantas piedras como destinos, y al menos uno.");
        }
    }

    /** @return titulo del nivel */
    public String getTitulo() { return titulo; }
    /** @return numero de columnas */
    public int getAnchura() { return anchura; }
    /** @return numero de filas */
    public int getAltura() { return altura; }
    /** @return movimientos validos */
    public int getMovimientos() { return movimientos; }
    /** @return empujes validos */
    public int getEmpujes() { return empujes; }
    /** @return cantidad de destinos */
    public int getCantidadDestinos() { return destinos.getCantidad(); }

    /**
     * @param x columna
     * @param y fila
     * @return true si la posicion pertenece al tablero
     */
    public boolean estaDentro(int x, int y) {
        return x >= 0 && x < anchura && y >= 0 && y < altura;
    }

    /**
     * @param x columna
     * @param y fila
     * @return piedra de la casilla, o null si no hay ninguna
     */
    public Piedra buscarPiedra(int x, int y) {
        for (int i = 0; i < piedras.getCantidad(); i++) {
            Piedra piedra = piedras.obtener(i);
            if (piedra.getX() == x && piedra.getY() == y) {
                return piedra;
            }
        }
        return null;
    }

    /**
     * @param x columna
     * @param y fila
     * @return true si existe un destino en esa posicion
     */
    public boolean hayDestino(int x, int y) {
        for (int i = 0; i < destinos.getCantidad(); i++) {
            Destino destino = destinos.obtener(i);
            if (destino.getX() == x && destino.getY() == y) {
                return true;
            }
        }
        return false;
    }

    /** @return numero de destinos cubiertos actualmente */
    public int getDestinosCubiertos() {
        int cubiertos = 0;
        for (int i = 0; i < destinos.getCantidad(); i++) {
            Destino destino = destinos.obtener(i);
            if (buscarPiedra(destino.getX(), destino.getY()) != null) {
                cubiertos++;
            }
        }
        return cubiertos;
    }

    /** @return true si hay al menos un destino y todos estan cubiertos */
    public boolean estaResuelto() {
        return !destinos.estaVacio() && getDestinosCubiertos() == destinos.getCantidad();
    }

    /**
     * Consulta simbolos para ambas vistas; el destino se conserva bajo los objetos.
     * @param x columna
     * @param y fila
     * @return '.', 'J', 'P', 'D', '*' o '+'
     * @throws IllegalArgumentException si la coordenada queda fuera del tablero
     */
    public char getCasilla(int x, int y) {
        if (!estaDentro(x, y)) {
            throw new IllegalArgumentException("Casilla fuera del tablero.");
        }
        boolean destino = hayDestino(x, y);
        if (personaje.getX() == x && personaje.getY() == y) {
            return destino ? '+' : 'J';
        }
        if (buscarPiedra(x, y) != null) {
            return destino ? '*' : 'P';
        }
        return destino ? 'D' : '.';
    }

    /**
     * Valida todo el empuje antes de modificar ningun objeto.
     * @param dx desplazamiento horizontal
     * @param dy desplazamiento vertical
     * @return true si se realiza el movimiento; false si se bloquea o ya esta resuelto
     * @throws IllegalArgumentException si el desplazamiento no es de una casilla ortogonal
     */
    public boolean mover(int dx, int dy) {
        if (Math.abs(dx) + Math.abs(dy) != 1) {
            throw new IllegalArgumentException("Movimiento no valido.");
        }
        if (estaResuelto()) {
            return false;
        }
        int x = personaje.getX() + dx;
        int y = personaje.getY() + dy;
        if (!estaDentro(x, y)) {
            return false;
        }
        Piedra piedra = buscarPiedra(x, y);
        if (piedra != null) {
            int siguienteX = x + dx;
            int siguienteY = y + dy;
            if (!estaDentro(siguienteX, siguienteY) || buscarPiedra(siguienteX, siguienteY) != null) {
                return false;
            }
            piedra.colocarEn(siguienteX, siguienteY);
            empujes++;
        }
        personaje.colocarEn(x, y);
        movimientos++;
        assert movimientos >= empujes && empujes >= 0 : "Contadores incoherentes";
        assert estaDentro(personaje.getX(), personaje.getY()) : "Personaje fuera del tablero";
        return true;
    }

    /** Recupera el estado inicial de todos los objetos y los contadores. */
    public void reiniciar() {
        personaje.reiniciar();
        for (int i = 0; i < piedras.getCantidad(); i++) {
            piedras.obtener(i).reiniciar();
        }
        movimientos = 0;
        empujes = 0;
    }

    /** @return resumen del nivel */
    @Override
    public String toString() {
        return titulo + " (" + anchura + " x " + altura + ")";
    }
}
