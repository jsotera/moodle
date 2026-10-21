package edu.masanz.da.ut4.app;

import edu.masanz.da.ut4.vista.javafx.AplicacionJavaFX;
import javafx.application.Application;

/** Lanzador separado de Application para facilitar su ejecucion desde el IDE. */
public final class MainJavaFX {
    private MainJavaFX() { }

    /** @param args --demo activa expresamente el catalogo visual estatico */
    public static void main(String[] args) {
        Application.launch(AplicacionJavaFX.class, args);
    }
}
