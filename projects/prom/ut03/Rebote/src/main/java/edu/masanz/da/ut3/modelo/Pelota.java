package edu.masanz.da.ut3.modelo;

import edu.masanz.da.ut3.util.Configuracion;
import javafx.scene.canvas.GraphicsContext;

public class Pelota {

    private int x;
    private int y;
    private int velocidadX;
    private int velocidadY;
    private GraphicsContext gc;

    public Pelota(GraphicsContext gc, int coordX, int coordY, int velocidad){
        this.gc = gc;
        this.x = coordX;
        this.y = coordY;
        this.velocidadX = velocidad;
        this.velocidadY = velocidad;
    }


    /**
     * Avanza una actualizacion y rebota en los cuatro bordes.
     * x e y representan la esquina superior izquierda de la pelota.
     * La figura completa debe caber; una esquina invierte ambas componentes.
     */
    public void actualizarCoordenadas() {
        // TODO 01: Actualiza la posicion de la pelota y sus velocidades para que rebote en los cuatro bordes sin salir del lienzo.
    }

    public void actualizarFigura() {
        gc.setFill(Configuracion.ROJO);
        gc.fillOval(this.x, this.y, Configuracion.DIAMETRO_PELOTA, Configuracion.DIAMETRO_PELOTA);
    }
}
