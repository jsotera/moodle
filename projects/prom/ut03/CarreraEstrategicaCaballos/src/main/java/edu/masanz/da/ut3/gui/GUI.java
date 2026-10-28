package edu.masanz.da.ut3.gui;

import java.util.concurrent.Callable;
import java.util.concurrent.CancellationException;
import java.util.concurrent.ExecutionException;
import java.util.concurrent.FutureTask;
import javafx.application.Platform;
import javafx.geometry.Insets;
import javafx.scene.Parent;
import javafx.scene.Scene;
import javafx.scene.control.ChoiceDialog;
import javafx.scene.control.Dialog;
import javafx.scene.control.Label;
import javafx.scene.layout.Pane;
import javafx.scene.layout.VBox;
import javafx.scene.paint.Color;
import javafx.scene.shape.Line;
import javafx.scene.shape.Rectangle;
import javafx.stage.Stage;

/**
 * Interfaz suministrada. No aplica reglas de potencia, movimiento o victoria.
 * Mantiene JavaFX en su hilo y permite que main pida datos de forma secuencial.
 * No es necesario modificar ni estudiar la gestion interna de hilos.
 */
public class GUI {
    private static final int METROS_PISTA = 200;
    private static final int ANCHO_PISTA = 600;
    private static final int ORIGEN_X = 10;
    private static final Color COLOR_UNO = Color.web("#007F86");
    private static final Color COLOR_DOS = Color.web("#C63B51");

    private static volatile boolean abierta;
    private static volatile boolean programaTerminado;
    private static Stage ventana;
    private static Dialog<?> dialogoActual;
    private static Label ronda;
    private static Label datosUno;
    private static Label datosDos;
    private static Label resultado;
    private static Rectangle caballoUno;
    private static Rectangle caballoDos;

    /**
     * Abre una unica ventana y permite continuar la logica en main.
     * Debe llamarse una sola vez, desde el hilo normal de main.
     */
    public static void abrir() {
        programaTerminado = false;
        FutureTask<Void> inicio = new FutureTask<>(() -> {
            Platform.setImplicitExit(false);
            ventana = new Stage();
            ventana.setTitle("Carrera estrategica de caballos");
            ventana.setScene(new Scene(crearContenido()));
            ventana.setResizable(false);
            ventana.setOnCloseRequest(event -> {
                abierta = false;
                if (dialogoActual != null) {
                    dialogoActual.close();
                }
                if (programaTerminado) {
                    Platform.exit();
                }
            });
            ventana.show();
            abierta = true;
            return null;
        });
        Platform.startup(inicio);
        esperar(inicio);
    }

    /** @return true mientras la ventana principal no se haya cerrado */
    public static boolean estaAbierta() {
        return abierta;
    }

    /**
     * Solicita una estrategia para un participante y espera su seleccion.
     * No aplica ni valida reglas de potencia: eso pertenece al ejercicio.
     * @param nombre nombre del participante que toma la decision
     * @return 1 maxima, 2 normal, 3 minima o 4 descansar
     * @throws CancellationException si se cancela o cierra la ventana
     */
    public static int pedirOpcion(String nombre) {
        return enInterfaz(() -> {
            ChoiceDialog<String> selector = new ChoiceDialog<>(
                    "2. Normal",
                    "1. Maxima", "2. Normal", "3. Minima", "4. Descansar");
            selector.initOwner(ventana);
            selector.setTitle("Estrategia");
            selector.setHeaderText(nombre + ": elige tu estrategia");
            selector.setContentText("Opcion:");
            dialogoActual = selector;
            try {
                var eleccion = selector.showAndWait();
                if (eleccion.isEmpty() || !abierta) {
                    if (abierta) {
                        resultado.setText("Carrera interrumpida.");
                    }
                    throw new CancellationException();
                }
                return Integer.parseInt(eleccion.get().substring(0, 1));
            } finally {
                dialogoActual = null;
            }
        });
    }

    /**
     * Muestra un numero de ronda, sin incrementarlo ni decidir el fin de carrera.
     * @param numero ronda actual, entre 0 y 20
     */
    public static void mostrarRonda(int numero) {
        enInterfaz(() -> {
            ronda.setText("Ronda " + numero + "/20");
            return null;
        });
    }

    /**
     * Actualiza una ficha y la posicion visual a partir de los datos recibidos.
     * No consume potencia ni acumula distancia; muestra los valores de main.
     * @param participante 1 para el primer carril o 2 para el segundo
     * @param nombre nombre que se muestra
     * @param potencia potencia actual calculada en main
     * @param distancia metros acumulados calculados en main
     * @param accion descripcion de la opcion realmente aplicada
     */
    public static void mostrarParticipante(int participante, String nombre,
            int potencia, int distancia, String accion) {
        if (participante != 1 && participante != 2) {
            throw new IllegalArgumentException("El participante debe ser 1 o 2.");
        }
        enInterfaz(() -> {
            Label datos = participante == 1 ? datosUno : datosDos;
            Rectangle caballo = participante == 1 ? caballoUno : caballoDos;
            datos.setText(nombre + " | Potencia: " + potencia + "/100 | Distancia: "
                    + distancia + " m | " + accion);
            double posicion = Math.max(0, Math.min(METROS_PISTA, distancia));
            caballo.setX(ORIGEN_X + posicion * ANCHO_PISTA / METROS_PISTA);
            return null;
        });
    }

    /** @param mensaje resultado ya decidido en main, incluido un posible empate */
    public static void mostrarResultado(String mensaje) {
        enInterfaz(() -> {
            resultado.setText(mensaje);
            return null;
        });
    }

    /**
     * Marca el fin de main y conserva el dibujo hasta cerrar la ventana.
     * Si la ventana ya estaba cerrada, termina tambien el hilo de JavaFX.
     * Este metodo forma parte del codigo proporcionado.
     */
    public static void finalizar() {
        programaTerminado = true;
        if (!abierta) {
            Platform.exit();
        }
    }

    private static Parent crearContenido() {
        Label titulo = new Label("Carrera estrategica");
        titulo.setStyle("-fx-font-size: 22px; -fx-font-weight: bold;");
        ronda = new Label("Ronda 0/20");
        ronda.setStyle("-fx-font-size: 16px;");
        datosUno = new Label("Participante 1");
        datosDos = new Label("Participante 2");
        caballoUno = new Rectangle(ORIGEN_X, 12, 20, 20);
        caballoDos = new Rectangle(ORIGEN_X, 12, 20, 20);
        caballoUno.setFill(COLOR_UNO);
        caballoDos.setFill(COLOR_DOS);
        resultado = new Label("Esperando carrera.");
        resultado.setWrapText(true);
        resultado.setStyle("-fx-font-weight: bold;");
        datosUno.setWrapText(true);
        datosDos.setWrapText(true);
        VBox contenido = new VBox(12, titulo, ronda, datosUno, crearCarril(caballoUno),
                datosDos, crearCarril(caballoDos),
                new Label("Escala: 0 a 200 metros. La carrera dura 20 rondas."),
                resultado);
        contenido.setPadding(new Insets(24));
        contenido.setPrefWidth(720);
        contenido.setStyle("-fx-background-color: #ffffff; -fx-font-size: 14px;");
        return contenido;
    }

    private static Pane crearCarril(Rectangle caballo) {
        Pane carril = new Pane();
        carril.setMinHeight(64);
        carril.setPrefHeight(64);
        carril.setMaxHeight(64);
        Line pista = new Line(ORIGEN_X, 34, ORIGEN_X + ANCHO_PISTA, 34);
        pista.setStroke(Color.web("#555555"));
        carril.getChildren().add(pista);
        for (int metros = 0; metros <= METROS_PISTA; metros += 50) {
            int x = ORIGEN_X + metros * ANCHO_PISTA / METROS_PISTA;
            Line marca = new Line(x, 32, x, 40);
            Label texto = new Label(String.valueOf(metros));
            texto.relocate(x, 42);
            carril.getChildren().addAll(marca, texto);
        }
        carril.getChildren().add(caballo);
        return carril;
    }

    private static <T> T enInterfaz(Callable<T> operacion) {
        if (!abierta) {
            throw new CancellationException();
        }
        if (Platform.isFxApplicationThread()) {
            try {
                return operacion.call();
            } catch (RuntimeException e) {
                throw e;
            } catch (Exception e) {
                throw new IllegalStateException(e);
            }
        }
        FutureTask<T> tarea = new FutureTask<>(() -> {
            if (!abierta) {
                throw new CancellationException();
            }
            return operacion.call();
        });
        Platform.runLater(tarea);
        return esperar(tarea);
    }

    private static <T> T esperar(FutureTask<T> tarea) {
        try {
            return tarea.get();
        } catch (InterruptedException e) {
            Thread.currentThread().interrupt();
            throw new CancellationException();
        } catch (ExecutionException e) {
            if (e.getCause() instanceof RuntimeException causa) {
                throw causa;
            }
            throw new IllegalStateException(e.getCause());
        }
    }
}
