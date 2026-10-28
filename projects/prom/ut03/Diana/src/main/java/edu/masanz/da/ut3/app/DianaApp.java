package edu.masanz.da.ut3.app;

import edu.masanz.da.ut3.util.Configuracion;
import javafx.application.Application;
import javafx.scene.Scene;
import javafx.scene.canvas.Canvas;
import javafx.scene.canvas.GraphicsContext;
import javafx.scene.layout.Pane;
import javafx.stage.Stage;

public class DianaApp extends Application {

    /** @param args argumentos que se pasan al arranque de JavaFX */
    public static void main(String[] args) {
        launch(args);
    }

    /** @param stage ventana de la aplicacion, proporcionada por JavaFX */
    @Override
    public void start(Stage stage) {
        Pane root = crearGUI();
        Scene scene = new Scene(root);
        stage.setScene(scene);
        stage.setTitle("Dibujando una diana");
        stage.setResizable(false);
        stage.show();
    }

    /** @return panel que contiene el lienzo y prepara el estado inicial */
    private Pane crearGUI() {
        Pane panel = new Pane();
        Canvas canvas = new Canvas(Configuracion.ANCHO_CANVAS, Configuracion.ALTO_CANVAS);
        GraphicsContext gc = canvas.getGraphicsContext2D();
        gc.setFill(Configuracion.NEGRO);
        gc.fillRect(0, 0, Configuracion.ANCHO_CANVAS, Configuracion.ALTO_CANVAS);
        dibujarDiana(gc);
        panel.getChildren().add(canvas);
        return panel;
    }

    /**
     * Dibuja diez circulos concentricos de diametros 400, 360, ..., 40.
     * Alterna blanco y rojo, empezando por blanco en el circulo exterior.
     * El centro es (200, 200) y la anchura radial de cada anillo es 20.
     * @param gc contexto de dibujo preparado por la interfaz
     */
    private void dibujarDiana(GraphicsContext gc) {
        // TODO 01: Dibuja una diana centrada con circulos concentricos de tamano decreciente y colores blanco y rojo alternos.
    }
}
