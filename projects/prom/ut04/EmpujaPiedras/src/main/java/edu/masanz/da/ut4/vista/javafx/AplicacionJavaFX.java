package edu.masanz.da.ut4.vista.javafx;

import edu.masanz.da.ut4.modelo.Nivel;
import edu.masanz.da.ut4.utilidades.Util;
import javafx.application.Application;
import javafx.geometry.Insets;
import javafx.scene.Scene;
import javafx.scene.control.Button;
import javafx.scene.control.Label;
import javafx.scene.control.Separator;
import javafx.scene.input.KeyCode;
import javafx.scene.input.KeyEvent;
import javafx.scene.layout.BorderPane;
import javafx.scene.layout.HBox;
import javafx.scene.layout.VBox;
import javafx.stage.Stage;

public class AplicacionJavaFX extends Application {

    private Nivel nivel;
    private final VistaTablero tablero = new VistaTablero();
    private final Label titulo = new Label();
    private final Label contadores = new Label();
    private final Label mensaje = new Label();
    private final Label modo = new Label();
    private final Button siguiente = new Button("Siguiente nivel");

    @Override
    public void start(Stage stage) {
        nivel = Util.generarNivel(0);
        generarEscena(stage);
        actualizar();
        stage.show();
    }

    private void generarEscena(Stage stage) {
        Label marca = new Label("Empuja piedras");
        marca.setStyle("-fx-font-size: 24px; -fx-font-weight: bold; -fx-text-fill: #16343a;");
        modo.setStyle("-fx-text-fill: #63767a;");
        titulo.setStyle("-fx-font-size: 18px; -fx-font-weight: bold;");
        contadores.setStyle("-fx-font-size: 14px;");
        mensaje.setWrapText(true);
        mensaje.setMinHeight(42);

        Button reiniciar = new Button("Reiniciar");
        reiniciar.setOnAction(e -> ejecutar("R"));
        siguiente.setOnAction(e -> ejecutar("N"));

        HBox acciones = new HBox(10, reiniciar, siguiente);
        VBox cabecera = new VBox(8, marca, modo, new Separator(), titulo, contadores, acciones);
        cabecera.setPadding(new Insets(20, 24, 16, 24));

        Label leyenda = new Label("Azul: personaje    Gris: piedra    Aro rosa: destino    Verde: piedra colocada");
        leyenda.setWrapText(true);
        HBox teclado = new HBox(8);
        agregarBoton(teclado, "A", "A");
        agregarBoton(teclado, "S", "S");
        agregarBoton(teclado, "D", "D");
        HBox filaSuperior = new HBox();
        filaSuperior.setPadding(new Insets(0, 0, 0, 56));
        agregarBoton(filaSuperior, "W", "W");
        VBox controles = new VBox(6, filaSuperior, teclado);
        VBox pie = new VBox(10, leyenda, controles, mensaje);
        pie.setPadding(new Insets(16, 24, 20, 24));
        BorderPane root = new BorderPane(tablero, cabecera, null, pie, null);
        root.setStyle("-fx-background-color: #ffffff; -fx-font-family: 'System';");
        Scene scene = new Scene(root, 820, 780);
        // El filtro evita que el foco en los botones rompa los controles del tablero.
        scene.addEventFilter(KeyEvent.KEY_PRESSED, e -> {
            KeyCode key = e.getCode();
            if (key == KeyCode.W || key == KeyCode.A || key == KeyCode.S || key == KeyCode.D
                    || key == KeyCode.R || key == KeyCode.N) {
                ejecutar(key.getName());
                e.consume();
            }
        });
        stage.setTitle("Empuja piedras - PROM UT1 a UT4");
        stage.setScene(scene);
        stage.setMinWidth(620);
        stage.setMinHeight(680);
    }

    private void agregarBoton(HBox fila, String texto, String accion) {
        Button boton = new Button(texto);
        boton.setMinSize(48, 36);
        boton.setOnAction(e -> ejecutar(accion));
        fila.getChildren().add(boton);
    }

    private void ejecutar(String accion) {
        try {
            switch (accion) {
                case "R": nivel.reiniciar(); break;
                case "N": nivel.siguienteNivel(); break;
                default: nivel.mover(accion);
            }
            actualizar();
        } catch (UnsupportedOperationException | IndexOutOfBoundsException | IllegalArgumentException e) {
            mensaje.setText(e.getMessage());
        }
    }

    private void actualizar() {
        titulo.setText("Nivel " + nivel.getNumNivel() + " / " + Util.getTotalNiveles() + " - " + nivel.getTitulo());
        siguiente.setDisable(!nivel.estaTerminada());
        tablero.mostrar(nivel);
    }
}
