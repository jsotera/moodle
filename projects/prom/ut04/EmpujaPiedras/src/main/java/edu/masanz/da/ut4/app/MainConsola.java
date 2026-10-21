package edu.masanz.da.ut4.app;

import edu.masanz.da.ut4.demo.VistaPrevia;
import edu.masanz.da.ut4.vista.consola.VistaConsola;

/** Punto de entrada de consola, sin iniciar JavaFX. */
public final class MainConsola {
    private MainConsola() { }

    /** @param args --demo activa expresamente el catalogo visual estatico */
    public static void main(String[] args) {
        boolean demo = args.length > 0 && "--demo".equals(args[0]);
        new VistaConsola().ejecutar(demo ? new VistaPrevia() : null);
    }
}
