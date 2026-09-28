package edu.masanz.da.ut2.modelo;

public class Persona {
    private String nombre;
    private int edad;
    private String profesion;

    public Persona(String nombre) {
        this.nombre = nombre;
        this.edad = 0;
        this.profesion = "Sin indicar";
    }

    public Persona(String nombre, int edad, String profesion) {
        this.nombre = nombre;
        this.edad = edad;
        this.profesion = profesion;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public int getEdad() {
        return edad;
    }

    public void setEdad(int edad) {
        this.edad = edad;
    }

    public String getProfesion() {
        return profesion;
    }

    public void setProfesion(String profesion) {
        this.profesion = profesion;
    }

    public void cumplirAnios() {
        edad++;
    }

    public String presentarse() {
        return "Hola, soy " + nombre + ", tengo " + edad
                + " anios y trabajo como " + profesion + ".";
    }
}
