package edu.masanz.da.ut4.vista.javafx;

import edu.masanz.da.ut4.api.Partida;
import edu.masanz.da.ut4.demo.VistaPrevia;
import edu.masanz.da.ut4.modelo.Juego;
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

/** Interfaz suministrada. Traduce eventos a llamadas al mismo contrato que la consola. */
public class AplicacionJavaFX extends Application {
    private Partida partida;
    private final VistaTablero tablero = new VistaTablero();
    private final Label titulo = new Label();
    private final Label contadores = new Label();
    private final Label mensaje = new Label();
    private final Label modo = new Label();
    private final Button siguiente = new Button("Siguiente nivel");

    /** @param stage ventana proporcionada por JavaFX */
    @Override
    public void start(Stage stage) {
        String aviso = null;
        if (getParameters().getRaw().contains("--demo")) {
            partida = new VistaPrevia();
        } else {
            try {
                Partida nueva = new Juego();
                comprobarLectura(nueva);
                partida = nueva;
            } catch (UnsupportedOperationException e) {
                partida = new VistaPrevia();
                aviso = e.getMessage();
            }
        }
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
        Button cargar = new Button("Cargar mi implementacion");
        cargar.setOnAction(e -> cargarModelo());
        HBox acciones = new HBox(10, reiniciar, siguiente, cargar);
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
        actualizar();
        if (aviso != null) {
            mensaje.setText(aviso + ". Se muestra una vista previa estatica.");
        }
        stage.show();
    }

    private void agregarBoton(HBox fila, String texto, String accion) {
        Button boton = new Button(texto);
        boton.setMinSize(48, 36);
        boton.setOnAction(e -> ejecutar(accion));
        fila.getChildren().add(boton);
    }

    private void cargarModelo() {
        try {
            Partida nueva = new Juego();
            // Comprueba el contrato antes de abandonar una vista previa funcional.
            comprobarLectura(nueva);
            partida = nueva;
            actualizar();
        } catch (UnsupportedOperationException | IndexOutOfBoundsException | IllegalArgumentException e) {
            mensaje.setText(e.getMessage());
        }
    }

    private void ejecutar(String accion) {
        try {
            switch (accion) {
                case "R": partida.reiniciar(); break;
                case "N": partida.siguienteNivel(); break;
                default: partida.mover(accion);
            }
            actualizar();
        } catch (UnsupportedOperationException | IndexOutOfBoundsException | IllegalArgumentException e) {
            mensaje.setText(e.getMessage());
        }
    }

    private void actualizar() {
        titulo.setText("Nivel " + partida.getNumeroNivel() + " / " + partida.getTotalNiveles() + " - " + partida.getTituloNivel());
        contadores.setText("Movimientos: " + partida.getMovimientos() + "    Empujes: " + partida.getEmpujes()
                + "    Destinos: " + partida.getDestinosCubiertos() + " / " + partida.getCantidadDestinos());
        modo.setText(partida.esVistaPrevia() ? "Vista previa del proyecto base"
                : "Partida " + partida.getCodigoPartida() + " | " + String.format("%.1f", partida.getProgreso()) + "% completado");
        mensaje.setText(partida.getMensaje());
        siguiente.setText(partida.esVistaPrevia() ? "Ver otro ejemplo" : "Siguiente nivel");
        siguiente.setDisable(!partida.esVistaPrevia() && (!partida.estaResuelto() || partida.estaTerminada()));
        tablero.mostrar(partida);
    }

    private void comprobarLectura(Partida nueva) {
        nueva.getCodigoPartida();
        nueva.getProgreso();
        nueva.getNumeroNivel();
        nueva.getTotalNiveles();
        nueva.getTituloNivel();
        nueva.getMovimientos();
        nueva.getEmpujes();
        nueva.getDestinosCubiertos();
        nueva.getCantidadDestinos();
        nueva.getMensaje();
        nueva.esVistaPrevia();
        nueva.estaResuelto();
        nueva.estaTerminada();
        for (int y = 0; y < nueva.getAltura(); y++) {
            for (int x = 0; x < nueva.getAnchura(); x++) {
                nueva.getCasilla(x, y);
            }
        }
    }
}
