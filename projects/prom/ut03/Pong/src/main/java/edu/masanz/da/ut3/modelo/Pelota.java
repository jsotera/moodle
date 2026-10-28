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
     * Avanza una actualizacion y rebota solo en los bordes superior e inferior.
     * Los laterales quedan abiertos para poder anotar puntos.
     * x e y indican la esquina superior izquierda; se tiene en cuenta el diametro.
     */
    public void actualizarCoordenadas() {
        // TODO 01: Actualiza la posicion de la pelota y haz que rebote en los bordes superior e inferior dejando abiertos los laterales.
    }

    public void actualizarFigura() {
        gc.setFill(Configuracion.ROJO);
        gc.fillOval(this.x, this.y, Configuracion.DIAMETRO_PELOTA, Configuracion.DIAMETRO_PELOTA);
    }

    /**
     * Comprueba la superposicion de los rectangulos de pelota y barra.
     * Solo rebota si avanza hacia esa barra; separa la pelota para no rebotar
     * varias veces por una misma colision. No cambia la posicion de la barra.
     * @param barra barra no nula contra la que se comprueba la colision
     */
    public void analizarColision(Barra barra) {
        // TODO 02: Detecta la colision con la barra recibida y cambia la direccion horizontal de la pelota evitando rebotes repetidos.
    }

    /**
     * Consulta sin modificar el estado; la pelota debe haber salido completamente.
     * @return 1 si sale por la derecha, 2 si sale por la izquierda, 0 si no hay punto
     */
    public int obtenerGanadorDelPunto() {
        // TODO 03: Indica que jugador gana el punto cuando la pelota sale completamente por un lateral.
        return 0;
    }

    /**
     * Situa la pelota en el centro, con componentes de velocidad de modulo dos.
     * @param direccionHorizontal 1 hacia la derecha o -1 hacia la izquierda
     */
    public void reiniciar(int direccionHorizontal) {
        // TODO 04: Reinicia la pelota en el centro con la direccion horizontal indicada y movimiento vertical hacia abajo.
    }
}
