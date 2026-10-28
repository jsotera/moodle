package edu.masanz.da.ut3.app;

import edu.masanz.da.ut3.util.Configuracion;
import javafx.application.Application;
import javafx.scene.Scene;
import javafx.scene.canvas.Canvas;
import javafx.scene.canvas.GraphicsContext;
import javafx.scene.input.KeyCode;
import javafx.scene.layout.Pane;
import javafx.stage.Stage;

public class CuadroApp extends Application {

    private GraphicsContext gc;
    private int tamano = 20;
    private int x = (Configuracion.ANCHO_CANVAS - 20) / 2;
    private int y = (Configuracion.ALTO_CANVAS - 20) / 2;
    private boolean circulo = true;
    private int color = 0;

    /** @param args argumentos que se pasan al arranque de JavaFX */
    public static void main(String[] args) {
        launch(args);
    }

    /** @param stage ventana de la aplicacion, proporcionada por JavaFX */
    @Override
    public void start(Stage stage) {
        Pane root = crearGUI();
        Scene scene = new Scene(root);

        scene.setOnKeyPressed(event -> {
            KeyCode keyCode = event.getCode();
            switch (keyCode) {
                case W, A, S, D, UP, DOWN, LEFT, RIGHT, SPACE -> {
                    procesarTecla(keyCode);
                    ajustarLimites();
                    dibujarFigura();
                }
                default -> {}
            }
        });

        stage.setScene(scene);
        stage.setTitle("Dibujando lo que quiero");
        stage.setResizable(false);
        stage.show();
    }

    /** @return panel que contiene el lienzo y prepara el estado inicial */
    private Pane crearGUI() {
        Pane panel = new Pane();
        Canvas canvas = new Canvas(Configuracion.ANCHO_CANVAS, Configuracion.ALTO_CANVAS);
        this.gc = canvas.getGraphicsContext2D();
        this.gc.setFill(Configuracion.NEGRO);
        this.gc.fillRect(0, 0, Configuracion.ANCHO_CANVAS, Configuracion.ALTO_CANVAS);
        dibujarFigura();
        panel.getChildren().add(canvas);
        return panel;
    }

    /** Dibuja la figura actual sin borrar las marcas anteriores; 0 blanco, 1 azul, 2 rojo. */
    private void dibujarFigura() {
        // TODO 01: Dibuja la figura con su posicion, tamano, forma y color actuales sin borrar el rastro anterior.
    }

    /**
     * WASD desplaza diez pixeles; izquierda elige circulo y derecha cuadrado.
     * Arriba y abajo cambian cinco pixeles el tamano, limitado a 1-100.
     * Espacio avanza ciclicamente por los colores 0, 1 y 2.
     * @param keyCode tecla recibida por la interfaz; no requiere dibujar aqui
     */
    private void procesarTecla(KeyCode keyCode) {
        // TODO 02: Actualiza la posicion, la forma, el tamano o el color de la figura segun la tecla pulsada.
    }

    /** x e y son la esquina superior izquierda; toda la figura debe caber en el canvas. */
    private void ajustarLimites() {
        // TODO 03: Ajusta las coordenadas para que la figura completa permanezca dentro del lienzo tras cualquier cambio.
    }
}
