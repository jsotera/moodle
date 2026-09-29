package edu.masanz.da.ut2.modelo;

import java.util.Random;

public class Robot {
    private String nombre;
    private int vida;
    private int fuerza;
    private int defensa;

    // Constructor vacio. Deja los atributos con sus valores por defecto.
    public Robot() {
    }

    // Constructor que asigna nombre, vida fija y valores aleatorios de fuerza y defensa.
    public Robot(String nombre) {
        Random random = new Random();
        this.nombre = nombre;
        this.vida = 100;
        this.fuerza = random.nextInt(10) + 1;
        this.defensa = random.nextInt(10) + 1;
    }

    // Constructor que permite asignar todos los atributos del robot.
    public Robot(String nombre, int vida, int fuerza, int defensa) {
        this.nombre = nombre;
        this.vida = vida;
        this.fuerza = fuerza;
        this.defensa = defensa;
    }

    // Devuelve una descripcion textual del estado actual del robot.
    @Override
    public String toString() {
        return "Robot{"
                + "nombre='" + nombre + '\''
                + ", vida=" + vida
                + ", fuerza=" + fuerza
                + ", defensa=" + defensa
                + '}';
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public int getVida() {
        return vida;
    }

    public void setVida(int vida) {
        this.vida = vida;
    }

    public int getFuerza() {
        return fuerza;
    }

    public void setFuerza(int fuerza) {
        this.fuerza = fuerza;
    }

    public int getDefensa() {
        return defensa;
    }

    public void setDefensa(int defensa) {
        this.defensa = defensa;
    }

    // Calcula el danio que recibe este robot cuando le ataca otro robot.
    public int recibirAtaque(Robot agresor) {
        return agresor.getFuerza() * 4 / defensa;
    }

    // Resta vida al robot y devuelve true si sigue vivo o false si ha caido.
    public boolean perderVida(int puntosVida) {
        vida = vida - puntosVida;

        if (vida < 0) {
            vida = 0;
        }

        return vida > 0;
    }
}
