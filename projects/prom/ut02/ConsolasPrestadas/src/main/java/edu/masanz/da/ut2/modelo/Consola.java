package edu.masanz.da.ut2.modelo;

import java.util.Random;

public class Consola {
    private final Persona propietario;
    private String modelo;
    private boolean operativa;
    private VideoJuego juegoInsertado;

    /**
     * Crea una consola con propietario fijo.
     *
     * @param propietario persona propietaria de la consola
     */
    public Consola(Persona propietario) {
        this.propietario = propietario;
        this.modelo = "";
        this.operativa = true;
    }

    /**
     * Crea una consola con modelo y propietario fijo.
     *
     * @param modelo modelo de la consola
     * @param propietario persona propietaria de la consola
     */
    public Consola(String modelo, Persona propietario) {
        this.modelo = modelo;
        this.propietario = propietario;
        this.operativa = true;
    }

    /**
     * Devuelve una descripcion de la consola.
     *
     * @return texto con modelo, propietario, estado y juego insertado
     */
    @Override
    public String toString() {
        return "Consola{modelo='" + modelo + "', propietario="
                + propietario.getNombre() + ", operativa=" + operativa
                + ", juegoInsertado=" + juegoInsertado + "}";
    }

    /**
     * Devuelve el propietario de la consola.
     *
     * @return propietario original de la consola
     */
    public Persona getPropietario() {
        return propietario;
    }

    /**
     * Devuelve el modelo de la consola.
     *
     * @return modelo de la consola
     */
    public String getModelo() {
        return modelo;
    }

    /**
     * Modifica el modelo de la consola.
     *
     * @param modelo nuevo modelo de la consola
     */
    public void setModelo(String modelo) {
        this.modelo = modelo;
    }

    /**
     * Devuelve si la consola esta operativa.
     *
     * @return true si funciona, false si esta estropeada
     */
    public boolean isOperativa() {
        return operativa;
    }

    /**
     * Devuelve el juego insertado actualmente.
     *
     * @return juego insertado o null si no hay juego
     */
    public VideoJuego getJuegoInsertado() {
        return juegoInsertado;
    }

    /**
     * Inserta un videojuego en la consola.
     *
     * @param videoJuego videojuego que se insertara
     */
    void insertarJuego(VideoJuego videoJuego) {
        if (!operativa) {
            System.out.println("No se puede insertar el juego porque la consola esta estropeada.");
            return;
        }

        juegoInsertado = videoJuego;
        System.out.println("Se ha insertado " + videoJuego.getNombre() + " en " + modelo + ".");
    }

    /**
     * Utiliza la consola con el juego insertado.
     */
    void utilizar() {
        if (!operativa) {
            System.out.println("La consola " + modelo + " esta estropeada.");
            return;
        }

        if (juegoInsertado == null) {
            System.out.println("No se puede utilizar " + modelo + " porque no tiene juego insertado.");
            return;
        }

        juegoInsertado.incrementarVecesUtilizado();
        System.out.println("Ejecutando " + juegoInsertado.getNombre()
                + " en " + modelo + ". Uso numero "
                + juegoInsertado.getVecesUtilizado() + ".");

        if (juegoInsertado.getVecesUtilizado() > 3) {
            estropear("El juego se ha utilizado mas de 3 veces.");
        } else if (new Random().nextBoolean()) {
            estropear("La consola se ha roto por mala suerte.");
        }
    }

    /**
     * Estropea la consola y enfada a su propietario original.
     *
     * @param motivo explicacion de la averia
     */
    private void estropear(String motivo) {
        operativa = false;
        propietario.setEstado("enfadado");
        System.out.println(motivo);
        System.out.println("La consola " + modelo + " se ha estropeado.");
        System.out.println(propietario.getNombre() + " se ha enfadado.");
    }
}
