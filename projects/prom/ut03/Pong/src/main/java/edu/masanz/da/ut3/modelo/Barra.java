package edu.masanz.da.ut3.modelo;

import edu.masanz.da.ut3.util.Configuracion;
import javafx.scene.canvas.GraphicsContext;

public class Barra {

    private int x;
    private int y;
    private int velocidad;
    private GraphicsContext gc;
    private boolean enMovimiento;
    private int direccion;

    public Barra(GraphicsContext gc, int coordX, int coordY, int velocidad){
        this.gc = gc;
        this.x = coordX;
        this.y = coordY;
        this.velocidad = velocidad;
        this.enMovimiento = false;
        this.direccion = 0;
    }


    /** Avanza solo si esta en movimiento y limita toda la barra al alto del canvas. */
    public void actualizarCoordenadas() {
        // TODO 11: Mueve la barra cuando corresponda y limita su posicion para que permanezca completamente dentro del lienzo.
    }

    public void actualizarFigura() {
        gc.setFill(Configuracion.ROJO);
        gc.fillRect(this.x, this.y, Configuracion.ANCHURA_BARRA, Configuracion.ALTURA_BARRA);
    }

    /** @return coordenada horizontal de la esquina superior izquierda */
    public int getX() { return x; }

    /** @return coordenada vertical de la esquina superior izquierda */
    public int getY() { return y; }

    public void setEnMovimiento(boolean enMovimiento) {
        this.enMovimiento = enMovimiento;
    }

    public void setDireccion(int direccion) {
        this.direccion = direccion;
    }
}
