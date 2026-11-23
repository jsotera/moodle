package edu.masanz.da.ut3.modelo;

import edu.masanz.da.ut3.util.Conf;

/** Estado del personaje, sin lectura de teclado ni impresiones. */
public class Personaje {

    private int fila;
    private int columna;
    private int vida;
    private int botiquines;
    private int movimientos;

    /** Crea un personaje en (1, 1), con 100 de vida y contadores a cero. */
    public Personaje() {
        fila = Conf.FILA_INICIAL;
        columna = Conf.COLUMNA_INICIAL;
        vida = Conf.VIDA_MAXIMA;
        botiquines = 0;
        movimientos = 0;
    }

    /** @return true si la vida actual es mayor que cero, false en caso contrario */
    public boolean estaVivo() {
        // TODO 11: Indica si el personaje sigue con vida.
        return false;
    }

    /**
     * Descuenta un danio positivo sin dejar la vida por debajo de cero.
     * @param puntos danio recibido; cero y negativos no producen cambios
     */
    public void recibirDanio(int puntos) {
        // TODO 12: Aplica el daño recibido sin permitir una vida negativa.
    }

    /** Incrementa en uno el inventario, sin cambiar la vida. */
    public void recogerBotiquin() {
        botiquines++;
    }

    /**
     * Consume un botiquin y recupera 30 puntos, sin superar 100.
     * No realiza la acción ante la falta de existencias, la vida completa o el personaje muerto.
     * @return true si se consume un botiquin, false en caso contrario
     */
    public boolean usarBotiquin() {
        // TODO 13: Utiliza un único botiquín si el personaje está vivo, tiene existencias y necesita curarse.
        return false;
    }

    /** Cuenta un desplazamiento efectivo. */
    public void registrarMovimiento() {
        movimientos++;
    }

    /** Recupera posicion inicial, 100 de vida y cero botiquines y movimientos. */
    public void reiniciar() {
        fila = Conf.FILA_INICIAL;
        columna = Conf.COLUMNA_INICIAL;
        vida = Conf.VIDA_MAXIMA;
        botiquines = 0;
        movimientos = 0;
    }

    public int getFila() {
        return fila;
    }

    public int getColumna() {
        return columna;
    }

    public int getVida() {
        return vida;
    }

    public int getBotiquines() {
        return botiquines;
    }

    public int getMovimientos() {
        return movimientos;
    }

    public void setFila(int fila) {
        this.fila = fila;
    }

    public void setColumna(int columna) {
        this.columna = columna;
    }
}
