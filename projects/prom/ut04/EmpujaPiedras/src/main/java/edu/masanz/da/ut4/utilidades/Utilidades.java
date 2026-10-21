package edu.masanz.da.ut4.utilidades;

import edu.masanz.da.ut4.listados.IListado;
import edu.masanz.da.ut4.modelo.Nivel;
import edu.masanz.da.ut4.configuracion.Constantes;

/** Operaciones independientes del estado de un tablero. */
public class Utilidades {
    /** @return niveles nuevos construidos desde configuracion.Constantes.NIVELES */
    public static IListado<Nivel> cargarNiveles() {
        return cargarNiveles(Constantes.NIVELES);
    }

    /**
     * Lee titulo y filas rectangulares; separa niveles con una linea ---.
     * Usa indexOf, substring, charAt y bucles, sin split ni arrays.
     * Los simbolos son . J P D * +. Admite LF, CRLF y salto final opcional.
     * @param texto datos de los niveles
     * @return listado nuevo con objetos independientes en cada carga
     * @throws IllegalArgumentException si falta titulo, tablero o personaje,
     * hay varios personajes, simbolos desconocidos, filas de distinta anchura,
     * niveles vacios o cantidades de piedras y destinos no positivas o distintas
     */
    public static IListado<Nivel> cargarNiveles(String texto) {
        // TODO: deducir dimensiones y posiciones; construir y validar los niveles.
        throw new UnsupportedOperationException("Pendiente de implementar: Utilidades.cargarNiveles");
    }

    /**
     * Genera un identificador visual, no necesariamente unico.
     * @return numero aleatorio entre 1000 y 9999, ambos incluidos
     */
    public static int generarCodigo() {
        // TODO: utilizar Random para generar el codigo solicitado.
        throw new UnsupportedOperationException("Pendiente de implementar: Utilidades.generarCodigo");
    }

    /**
     * Calcula un porcentaje sin division entera.
     * @param parte cantidad entre cero y total
     * @param total cantidad positiva
     * @return porcentaje decimal entre cero y cien
     * @throws IllegalArgumentException si las cantidades no son validas
     */
    public static double calcularPorcentaje(int parte, int total) {
        // TODO: validar y calcular el porcentaje decimal.
        throw new UnsupportedOperationException("Pendiente de implementar: Utilidades.calcularPorcentaje");
    }
}
