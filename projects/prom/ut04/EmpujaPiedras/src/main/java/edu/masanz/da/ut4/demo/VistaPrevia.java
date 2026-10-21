package edu.masanz.da.ut4.demo;

import edu.masanz.da.ut4.api.Partida;
import edu.masanz.da.ut4.configuracion.Constantes;

/**
 * Catalogo visual estatico para comprobar las vistas antes de implementar el modelo.
 * No contiene un algoritmo de movimiento, empuje, victoria ni listado.
 */
public class VistaPrevia implements Partida {
    private int numero = 1;

    // Solo recorta texto para dibujarlo; no crea entidades ni listados del modelo.
    private String getTextoNivel() {
        String texto = Constantes.NIVELES;
        int inicio = 0;
        for (int i = 1; i < numero; i++) {
            inicio = texto.indexOf("\n---\n", inicio) + 5;
        }
        int fin = texto.indexOf("\n---\n", inicio);
        return texto.substring(inicio, fin == -1 ? texto.length() : fin + 1);
    }

    private String getTablero() {
        String texto = getTextoNivel();
        return texto.substring(texto.indexOf('\n') + 1);
    }

    /** {@inheritDoc} */
    @Override public int getCodigoPartida() { return 0; }
    /** {@inheritDoc} */
    @Override public double getProgreso() { return 0; }

    /** {@inheritDoc} */
    @Override public int getAnchura() { return getTablero().indexOf('\n'); }
    /** {@inheritDoc} */
    @Override public int getAltura() { return getTablero().length() / (getAnchura() + 1); }
    /** {@inheritDoc} */
    @Override public int getNumeroNivel() { return numero; }
    /** {@inheritDoc} */
    @Override public int getTotalNiveles() {
        int cantidad = 1;
        int separador = Constantes.NIVELES.indexOf("\n---\n");
        while (separador != -1) {
            cantidad++;
            separador = Constantes.NIVELES.indexOf("\n---\n", separador + 5);
        }
        return cantidad;
    }
    /** {@inheritDoc} */
    @Override public String getTituloNivel() {
        String texto = getTextoNivel();
        return texto.substring(0, texto.indexOf('\n'));
    }
    /** {@inheritDoc} */
    @Override public int getMovimientos() { return 0; }
    /** {@inheritDoc} */
    @Override public int getEmpujes() { return 0; }
    /** {@inheritDoc} */
    @Override public int getCantidadDestinos() {
        String tablero = getTablero();
        int cantidad = 0;
        for (int i = 0; i < tablero.length(); i++) {
            if ("D*+".indexOf(tablero.charAt(i)) != -1) {
                cantidad++;
            }
        }
        return cantidad;
    }
    /** {@inheritDoc} */
    @Override public int getDestinosCubiertos() { return 0; }
    /** {@inheritDoc} */
    @Override public boolean estaResuelto() { return false; }
    /** {@inheritDoc} */
    @Override public boolean estaTerminada() { return false; }
    /** {@inheritDoc} */
    @Override public boolean esVistaPrevia() { return true; }
    /** {@inheritDoc} */
    @Override public String getMensaje() { return "Vista previa estatica: implementa el modelo para poder jugar."; }

    /** {@inheritDoc} */
    @Override
    public char getCasilla(int x, int y) {
        if (x < 0 || y < 0 || x >= getAnchura() || y >= getAltura()) {
            throw new IllegalArgumentException("Casilla fuera del tablero.");
        }
        return getTablero().charAt(y * (getAnchura() + 1) + x);
    }

    /** {@inheritDoc} */
    @Override public boolean mover(String direccion) {
        if (direccion == null || !(direccion.equalsIgnoreCase("W") || direccion.equalsIgnoreCase("A")
                || direccion.equalsIgnoreCase("S") || direccion.equalsIgnoreCase("D"))) {
            throw new IllegalArgumentException("Utiliza W, A, S o D.");
        }
        return false;
    }
    /** {@inheritDoc} */
    @Override public void reiniciar() { }
    /** Recorre ejemplos; no representa el avance de una partida real. */
    @Override public boolean siguienteNivel() {
        numero = numero % getTotalNiveles() + 1;
        return true;
    }
}
