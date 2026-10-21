package edu.masanz.da.ut4.vista.javafx;

import edu.masanz.da.ut4.api.Partida;
import javafx.scene.canvas.Canvas;
import javafx.scene.canvas.GraphicsContext;
import javafx.scene.layout.Region;
import javafx.scene.paint.Color;

/** Dibujo suministrado: transforma simbolos del modelo en un tablero redimensionable. */
public class VistaTablero extends Region {
    private final Canvas canvas = new Canvas();
    private Partida partida;

    /** Crea la superficie de dibujo. */
    public VistaTablero() {
        getChildren().add(canvas);
        setMinSize(180, 180);
        setPrefSize(720, 520);
    }

    /** @param partida estado que debe representar; no se modifica */
    public void mostrar(Partida partida) {
        this.partida = partida;
        dibujar();
    }

    @Override
    protected void layoutChildren() {
        canvas.setWidth(getWidth());
        canvas.setHeight(getHeight());
        dibujar();
    }

    private void dibujar() {
        GraphicsContext g = canvas.getGraphicsContext2D();
        g.setFill(Color.web("#eef2f3"));
        g.fillRect(0, 0, canvas.getWidth(), canvas.getHeight());
        if (partida == null || partida.getAnchura() <= 0 || partida.getAltura() <= 0) {
            return;
        }
        double lado = Math.min(78, Math.min((canvas.getWidth() - 24) / partida.getAnchura(),
                (canvas.getHeight() - 24) / partida.getAltura()));
        if (lado <= 0) {
            return;
        }
        double inicioX = (canvas.getWidth() - lado * partida.getAnchura()) / 2;
        double inicioY = (canvas.getHeight() - lado * partida.getAltura()) / 2;
        for (int y = 0; y < partida.getAltura(); y++) {
            for (int x = 0; x < partida.getAnchura(); x++) {
                double px = inicioX + x * lado;
                double py = inicioY + y * lado;
                g.setFill((x + y) % 2 == 0 ? Color.WHITE : Color.web("#e5ebec"));
                g.fillRect(px, py, lado, lado);
                g.setStroke(Color.web("#cbd5d7"));
                g.strokeRect(px, py, lado, lado);
                char casilla = partida.getCasilla(x, y);
                if (casilla == 'D' || casilla == '*' || casilla == '+') {
                    g.setStroke(Color.web("#cf4164"));
                    g.setLineWidth(Math.max(2, lado * 0.045));
                    g.strokeOval(px + lado * 0.23, py + lado * 0.23, lado * 0.54, lado * 0.54);
                    g.setLineWidth(1);
                }
                if (casilla == 'P' || casilla == '*') {
                    g.setFill(Color.web(casilla == '*' ? "#238569" : "#56636e"));
                    g.fillRoundRect(px + lado * 0.13, py + lado * 0.13, lado * 0.74, lado * 0.74, 8, 8);
                    g.setStroke(Color.web(casilla == '*' ? "#b8f0cc" : "#aab6be"));
                    g.strokeLine(px + lado * 0.27, py + lado * 0.29, px + lado * 0.68, py + lado * 0.29);
                    if (casilla == '*') {
                        g.setStroke(Color.WHITE);
                        g.setLineWidth(3);
                        g.strokeOval(px + lado * 0.38, py + lado * 0.39, lado * 0.24, lado * 0.24);
                        g.setLineWidth(1);
                    }
                }
                if (casilla == 'J' || casilla == '+') {
                    g.setFill(Color.web("#076e9b"));
                    g.fillOval(px + lado * 0.2, py + lado * 0.2, lado * 0.6, lado * 0.6);
                    g.setFill(Color.WHITE);
                    g.fillOval(px + lado * 0.34, py + lado * 0.38, lado * 0.08, lado * 0.1);
                    g.fillOval(px + lado * 0.58, py + lado * 0.38, lado * 0.08, lado * 0.1);
                }
            }
        }
    }
}
