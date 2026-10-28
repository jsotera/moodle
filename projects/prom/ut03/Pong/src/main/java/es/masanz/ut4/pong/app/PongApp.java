package es.masanz.ut4.pong.app;

import es.masanz.ut4.pong.model.Barra;
import es.masanz.ut4.pong.model.Pelota;
import es.masanz.ut4.pong.util.Configuracion;
import javafx.animation.KeyFrame;
import javafx.animation.Timeline;
import javafx.application.Application;
import javafx.scene.Scene;
import javafx.scene.canvas.Canvas;
import javafx.scene.canvas.GraphicsContext;
import javafx.scene.input.KeyCode;
import javafx.scene.layout.Pane;
import javafx.stage.Stage;
import javafx.util.Duration;

public class PongApp extends Application {

    private GraphicsContext gc;
    private Pelota pelota;
    private Barra barraIzq;
    private Barra barraDer;
    private int puntosIzq;
    private int puntosDer;

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
            actualizarBarras();
            actualizarPelota();
            registrarPunto();
            mostrarMarcador();
        }));
        timeline.setCycleCount(Timeline.INDEFINITE);
        timeline.play();

        scene.setOnKeyPressed(event -> {
            KeyCode keyCode = event.getCode();
            switch (keyCode) {
                case W:
                    teclaPulsada(keyCode);
                    break;
                case S:
                    teclaPulsada(keyCode);
                    break;
                case UP:
                    teclaPulsada(keyCode);
                    break;
                case DOWN:
                    teclaPulsada(keyCode);
                    break;
                default:
                    break;
            }
        });

        scene.setOnKeyReleased(event -> {
            KeyCode keyCode = event.getCode();
            switch (keyCode) {
                case W:
                    teclaSoltada(keyCode);
                    break;
                case S:
                    teclaSoltada(keyCode);
                    break;
                case UP:
                    teclaSoltada(keyCode);
                    break;
                case DOWN:
                    teclaSoltada(keyCode);
                    break;
                default:
                    break;
            }
        });

        stage.setScene(scene);
        stage.setTitle("Pong");
        stage.setResizable(false);
        stage.show();
    }

    /** @return panel que contiene el lienzo y prepara el estado inicial */
    private Pane crearGUI() {
        Pane panel = new Pane();
        Canvas canvas = new Canvas(Configuracion.ANCHO_CANVAS, Configuracion.ALTO_CANVAS);
        this.gc = canvas.getGraphicsContext2D();
        this.pelota = new Pelota(this.gc,
                (Configuracion.ANCHO_CANVAS - Configuracion.DIAMETRO_PELOTA) / 2,
                (Configuracion.ALTO_CANVAS - Configuracion.DIAMETRO_PELOTA) / 2, 2);
        this.barraIzq = new Barra(this.gc, 40, 200, 2);
        this.barraDer = new Barra(this.gc, Configuracion.ANCHO_CANVAS - 40, 200, 2);
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
        pelota.analizarColision(barraIzq);
        pelota.analizarColision(barraDer);
    }

    private void actualizarBarras(){
        barraIzq.actualizarCoordenadas();
        barraIzq.actualizarFigura();
        barraDer.actualizarCoordenadas();
        barraDer.actualizarFigura();
    }

    private void teclaPulsada(KeyCode keyCode) {
        switch (keyCode) {
            case W:
                barraIzq.setEnMovimiento(true);
                barraIzq.setDireccion(Configuracion.DIRECCION_ARRIBA);
                break;
            case S:
                barraIzq.setEnMovimiento(true);
                barraIzq.setDireccion(Configuracion.DIRECCION_ABAJO);
                break;
            case UP:
                barraDer.setEnMovimiento(true);
                barraDer.setDireccion(Configuracion.DIRECCION_ARRIBA);
                break;
            case DOWN:
                barraDer.setEnMovimiento(true);
                barraDer.setDireccion(Configuracion.DIRECCION_ABAJO);
                break;
            default:
                break;
        }
    }

    /**
     * Consulta una vez el ganador: 1 es el jugador izquierdo, 2 el derecho.
     * Si hay punto, aumenta solo su contador y reinicia hacia quien lo perdio:
     * derecha para ganador 1 e izquierda para ganador 2.
     */
    private void registrarPunto() {
        // TODO 21: Actualiza el marcador cuando haya un punto y reinicia la pelota hacia el jugador que lo haya perdido.
    }

    /** Muestra los contadores sin modificar el estado de los modelos. */
    private void mostrarMarcador() {
        gc.setFill(Configuracion.BLANCO);
        gc.fillText("Izquierda: " + puntosIzq + " | Derecha: " + puntosDer, 12, 20);
    }

    private void teclaSoltada(KeyCode keyCode) {
        switch (keyCode) {
            case W:
                barraIzq.setEnMovimiento(false);
                break;
            case S:
                barraIzq.setEnMovimiento(false);
                break;
            case UP:
                barraDer.setEnMovimiento(false);
                break;
            case DOWN:
                barraDer.setEnMovimiento(false);
                break;
            default:
                break;
        }
    }

    // TODO 22: Adapta el juego para situar las barras arriba y abajo y ajustar sus controles, rebotes y puntos a la nueva orientacion.
}
