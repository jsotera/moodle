package edu.masanz.da.ut4.modelo;

import edu.masanz.da.ut4.api.Partida;
import edu.masanz.da.ut4.listados.IListado;

/** Coordina la progresion; ambas vistas utilizan este mismo modelo de juego. */
public class Juego implements Partida {
    /** {@inheritDoc} */
    @Override public int getCodigoPartida() {
        throw new UnsupportedOperationException("Pendiente de implementar: Juego.getCodigoPartida");
    }
    /** {@inheritDoc} */
    @Override public double getProgreso() {
        throw new UnsupportedOperationException("Pendiente de implementar: Juego.getProgreso");
    }
    private final int codigoPartida;
    private static int partidasCreadas;
    private final IListado<Nivel> niveles;
    private int indiceNivel;
    private String mensaje;

    /** Construye una partida con los niveles leidos por Utilidades.cargarNiveles(). */
    public Juego() {
        // TODO: implementar segun el contrato y el enunciado.
        throw new UnsupportedOperationException("Pendiente de implementar: Juego.Juego");
    }

    /**
     * @param niveles listado no nulo, no vacio y con niveles configurados correctamente
     * @throws IllegalArgumentException si el listado no es valido
     */
    public Juego(IListado<Nivel> niveles) {
        // TODO: implementar segun el contrato y el enunciado.
        throw new UnsupportedOperationException("Pendiente de implementar: Juego.Juego");
    }

    /** @return cantidad de partidas construidas correctamente en esta ejecucion */
    public static int getPartidasCreadas() {
        // TODO: implementar segun el contrato y el enunciado.
        throw new UnsupportedOperationException("Pendiente de implementar: Juego.getPartidasCreadas");
    }

    private Nivel actual() {
        // TODO: implementar segun el contrato y el enunciado.
        throw new UnsupportedOperationException("Pendiente de implementar: Juego.actual");
    }
    /** {@inheritDoc} */
    @Override public int getAnchura() {
        // TODO: implementar segun el contrato y el enunciado.
        throw new UnsupportedOperationException("Pendiente de implementar: Juego.getAnchura");
    }
    /** {@inheritDoc} */
    @Override public int getAltura() {
        // TODO: implementar segun el contrato y el enunciado.
        throw new UnsupportedOperationException("Pendiente de implementar: Juego.getAltura");
    }
    /** {@inheritDoc} */
    @Override public int getNumeroNivel() {
        // TODO: implementar segun el contrato y el enunciado.
        throw new UnsupportedOperationException("Pendiente de implementar: Juego.getNumeroNivel");
    }
    /** {@inheritDoc} */
    @Override public int getTotalNiveles() {
        // TODO: implementar segun el contrato y el enunciado.
        throw new UnsupportedOperationException("Pendiente de implementar: Juego.getTotalNiveles");
    }
    /** {@inheritDoc} */
    @Override public String getTituloNivel() {
        // TODO: implementar segun el contrato y el enunciado.
        throw new UnsupportedOperationException("Pendiente de implementar: Juego.getTituloNivel");
    }
    /** {@inheritDoc} */
    @Override public int getMovimientos() {
        // TODO: implementar segun el contrato y el enunciado.
        throw new UnsupportedOperationException("Pendiente de implementar: Juego.getMovimientos");
    }
    /** {@inheritDoc} */
    @Override public int getEmpujes() {
        // TODO: implementar segun el contrato y el enunciado.
        throw new UnsupportedOperationException("Pendiente de implementar: Juego.getEmpujes");
    }
    /** {@inheritDoc} */
    @Override public int getCantidadDestinos() {
        // TODO: implementar segun el contrato y el enunciado.
        throw new UnsupportedOperationException("Pendiente de implementar: Juego.getCantidadDestinos");
    }
    /** {@inheritDoc} */
    @Override public int getDestinosCubiertos() {
        // TODO: implementar segun el contrato y el enunciado.
        throw new UnsupportedOperationException("Pendiente de implementar: Juego.getDestinosCubiertos");
    }
    /** {@inheritDoc} */
    @Override public boolean estaResuelto() {
        // TODO: implementar segun el contrato y el enunciado.
        throw new UnsupportedOperationException("Pendiente de implementar: Juego.estaResuelto");
    }
    /** {@inheritDoc} */
    @Override public boolean estaTerminada() {
        // TODO: implementar segun el contrato y el enunciado.
        throw new UnsupportedOperationException("Pendiente de implementar: Juego.estaTerminada");
    }
    /** {@inheritDoc} */
    @Override public boolean esVistaPrevia() {
        // TODO: implementar segun el contrato y el enunciado.
        throw new UnsupportedOperationException("Pendiente de implementar: Juego.esVistaPrevia");
    }
    /** {@inheritDoc} */
    @Override public String getMensaje() {
        // TODO: implementar segun el contrato y el enunciado.
        throw new UnsupportedOperationException("Pendiente de implementar: Juego.getMensaje");
    }
    /** {@inheritDoc} */
    @Override public char getCasilla(int x, int y) {
        // TODO: implementar segun el contrato y el enunciado.
        throw new UnsupportedOperationException("Pendiente de implementar: Juego.getCasilla");
    }

    /** {@inheritDoc} */
    @Override
    public boolean mover(String direccion) {
        // TODO: implementar segun el contrato y el enunciado.
        throw new UnsupportedOperationException("Pendiente de implementar: Juego.mover");
    }

    /** {@inheritDoc} */
    @Override
    public void reiniciar() {
        // TODO: implementar segun el contrato y el enunciado.
        throw new UnsupportedOperationException("Pendiente de implementar: Juego.reiniciar");
    }

    /** {@inheritDoc} */
    @Override
    public boolean siguienteNivel() {
        // TODO: implementar segun el contrato y el enunciado.
        throw new UnsupportedOperationException("Pendiente de implementar: Juego.siguienteNivel");
    }
}
