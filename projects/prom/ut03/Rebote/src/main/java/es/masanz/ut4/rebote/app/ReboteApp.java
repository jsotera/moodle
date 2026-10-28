package es.masanz.ut4.rebote.app;

import es.masanz.ut4.rebote.model.Pelota;
import es.masanz.ut4.rebote.util.Configuracion;
import javafx.animation.KeyFrame;
import javafx.animation.Timeline;
import javafx.application.Application;
import javafx.scene.Scene;
import javafx.scene.canvas.Canvas;
import javafx.scene.canvas.GraphicsContext;
import javafx.scene.layout.Pane;
import javafx.stage.Stage;
import javafx.util.Duration;

public class ReboteApp extends Application {

    private GraphicsContext gc;
    private Pelota pelota;

    /** @param args argumentos que se pasan al arranque de JavaFX */
    public static void main(String[] args) {
        launch(args);
    }

    /** @param stage ventana de la aplicacion, proporcionada por JavaFX */
    @Override
    public void start(Stage stage) {
        Pane root = crearGUI();
        Scene scene = new Scene(root);

        // Con esta configuracion, la pantalla tendra un refresco de 40 FPS (es decir, 1000ms/25ms=40FPS)
        // En otras palabras, llamaremos cada 25ms a lo que tenemos aqui dentro
        Timeline timeline = new Timeline(new KeyFrame(Duration.millis(25), e -> {
            actualizarFondo();
            actualizarPelota();
        }));
        timeline.setCycleCount(Timeline.INDEFINITE);
        timeline.play();

        stage.setScene(scene);
        stage.setTitle("Pelota con rebote");
        stage.setResizable(false);
        stage.show();
    }

    /** @return panel que contiene el lienzo y prepara el estado inicial */
    private Pane crearGUI() {
        Pane panel = new Pane();
        Canvas canvas = new Canvas(Configuracion.ANCHO_CANVAS, Configuracion.ALTO_CANVAS);
        this.gc = canvas.getGraphicsContext2D();
        this.pelota = new Pelota(this.gc, 0, 0, 2);
        panel.getChildren().add(canvas);
        return panel;
    }

    private void actualizarFondo(){
        gc.setFill(Configuracion.NEGRO);
        gc.fillRect(0, 0, Configuracion.ANCHO_CANVAS, Configuracion.ALTO_CANVAS);
    }

    private void actualizarPelota(){
        pelota.actualizarCoordenadas();
        pelota.actualizarFigura();
    }
}
