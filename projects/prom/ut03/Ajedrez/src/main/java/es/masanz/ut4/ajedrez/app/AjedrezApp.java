package es.masanz.ut4.ajedrez.app;

import es.masanz.ut4.ajedrez.util.Configuracion;
import javafx.application.Application;
import javafx.scene.Scene;
import javafx.scene.canvas.Canvas;
import javafx.scene.canvas.GraphicsContext;
import javafx.scene.layout.Pane;
import javafx.stage.Stage;

public class AjedrezApp extends Application {

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
        stage.setTitle("Dibujando un tablero de ajedrez");
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
        dibujarAjedrez(gc);
        panel.getChildren().add(canvas);
        return panel;
    }

    /**
     * Dibuja 64 casillas de 50 pixeles, alternando azul y blanco.
     * La esquina superior izquierda es azul y no quedan huecos ni margenes.
     * @param gc contexto de dibujo preparado por la interfaz
     */
    private void dibujarAjedrez(GraphicsContext gc) {
        // TODO 01: Dibuja un tablero de ocho filas y ocho columnas alternando casillas azules y blancas mediante bucles.
    }
}
