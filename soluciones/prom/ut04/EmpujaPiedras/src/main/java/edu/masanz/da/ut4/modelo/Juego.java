package edu.masanz.da.ut4.modelo;

import edu.masanz.da.ut4.api.Partida;
import edu.masanz.da.ut4.listados.IListado;
import edu.masanz.da.ut4.utilidades.Utilidades;

/** Coordina la progresion; ambas vistas utilizan este mismo modelo de juego. */
public class Juego implements Partida {
    private static int partidasCreadas;
    private final int codigoPartida;
    private final IListado<Nivel> niveles;
    private int indiceNivel;
    private String mensaje;

    /** Construye una partida con los niveles leidos por Utilidades.cargarNiveles(). */
    public Juego() {
        this(Utilidades.cargarNiveles());
    }

    /**
     * @param niveles listado no nulo, no vacio y con niveles configurados correctamente
     * @throws IllegalArgumentException si el listado no es valido
     */
    public Juego(IListado<Nivel> niveles) {
        if (niveles == null || niveles.estaVacio()) {
            throw new IllegalArgumentException("Se necesita al menos un nivel.");
        }
        for (int i = 0; i < niveles.getCantidad(); i++) {
            niveles.obtener(i).validarConfiguracion();
            niveles.obtener(i).reiniciar();
        }
        this.niveles = niveles;
        codigoPartida = Utilidades.generarCodigo();
        indiceNivel = 0;
        mensaje = "Lleva las piedras a sus destinos.";
        partidasCreadas++;
    }

    /** @return cantidad de partidas construidas correctamente en esta ejecucion */
    public static int getPartidasCreadas() { return partidasCreadas; }

    private Nivel actual() { return niveles.obtener(indiceNivel); }
    /** {@inheritDoc} */
    @Override public int getCodigoPartida() { return codigoPartida; }
    /** {@inheritDoc} */
    @Override public double getProgreso() {
        return Utilidades.calcularPorcentaje(getDestinosCubiertos(), getCantidadDestinos());
    }
    /** {@inheritDoc} */
    @Override public int getAnchura() { return actual().getAnchura(); }
    /** {@inheritDoc} */
    @Override public int getAltura() { return actual().getAltura(); }
    /** {@inheritDoc} */
    @Override public int getNumeroNivel() { return indiceNivel + 1; }
    /** {@inheritDoc} */
    @Override public int getTotalNiveles() { return niveles.getCantidad(); }
    /** {@inheritDoc} */
    @Override public String getTituloNivel() { return actual().getTitulo(); }
    /** {@inheritDoc} */
    @Override public int getMovimientos() { return actual().getMovimientos(); }
    /** {@inheritDoc} */
    @Override public int getEmpujes() { return actual().getEmpujes(); }
    /** {@inheritDoc} */
    @Override public int getCantidadDestinos() { return actual().getCantidadDestinos(); }
    /** {@inheritDoc} */
    @Override public int getDestinosCubiertos() { return actual().getDestinosCubiertos(); }
    /** {@inheritDoc} */
    @Override public boolean estaResuelto() { return actual().estaResuelto(); }
    /** {@inheritDoc} */
    @Override public boolean estaTerminada() { return indiceNivel == niveles.getCantidad() - 1 && estaResuelto(); }
    /** {@inheritDoc} */
    @Override public boolean esVistaPrevia() { return false; }
    /** {@inheritDoc} */
    @Override public String getMensaje() { return mensaje; }
    /** {@inheritDoc} */
    @Override public char getCasilla(int x, int y) { return actual().getCasilla(x, y); }

    /** {@inheritDoc} */
    @Override
    public boolean mover(String direccion) {
        if (direccion == null) {
            throw new IllegalArgumentException("Direccion no valida.");
        }
        int dx = 0;
        int dy = 0;
        switch (direccion.toUpperCase()) {
            case "W": dy = -1; break;
            case "A": dx = -1; break;
            case "S": dy = 1; break;
            case "D": dx = 1; break;
            default: throw new IllegalArgumentException("Utiliza W, A, S o D.");
        }
        boolean realizado = actual().mover(dx, dy);
        if (estaTerminada()) {
            mensaje = "Has completado todos los niveles. Enhorabuena.";
        } else if (estaResuelto()) {
            mensaje = "Nivel resuelto. Puedes pasar al siguiente.";
        } else {
            mensaje = realizado ? "Movimiento realizado." : "Movimiento bloqueado.";
        }
        return realizado;
    }

    /** {@inheritDoc} */
    @Override
    public void reiniciar() {
        actual().reiniciar();
        mensaje = "Nivel reiniciado.";
    }

    /** {@inheritDoc} */
    @Override
    public boolean siguienteNivel() {
        if (!estaResuelto() || estaTerminada()) {
            mensaje = estaTerminada() ? "La partida ya esta completada." : "Primero debes resolver este nivel.";
            return false;
        }
        indiceNivel++;
        actual().reiniciar();
        mensaje = "Nuevo nivel.";
        return true;
    }
}
