package edu.masanz.da.ut2.modelo;

public class Pelicula {
    private String titulo;
    private int anioEstreno;
    private Persona director;
    private Persona actrizPrincipal;
    private Persona actorPrincipal;
    private int duracionMinutos;
    private boolean estrenada;

    public Pelicula(String titulo, Persona director) {
        this.titulo = titulo;
        this.director = director;
        this.anioEstreno = 0;
        this.duracionMinutos = 0;
        this.estrenada = false;
    }

    public Pelicula(String titulo, int anioEstreno, Persona director,
                    Persona actrizPrincipal, Persona actorPrincipal,
                    int duracionMinutos) {
        this.titulo = titulo;
        this.anioEstreno = anioEstreno;
        this.director = director;
        this.actrizPrincipal = actrizPrincipal;
        this.actorPrincipal = actorPrincipal;
        this.duracionMinutos = duracionMinutos;
        this.estrenada = true;
    }

    public String getTitulo() {
        return titulo;
    }

    public void setTitulo(String titulo) {
        this.titulo = titulo;
    }

    public int getAnioEstreno() {
        return anioEstreno;
    }

    public void setAnioEstreno(int anioEstreno) {
        this.anioEstreno = anioEstreno;
    }

    public Persona getDirector() {
        return director;
    }

    public void setDirector(Persona director) {
        this.director = director;
    }

    public Persona getActrizPrincipal() {
        return actrizPrincipal;
    }

    public void setActrizPrincipal(Persona actrizPrincipal) {
        this.actrizPrincipal = actrizPrincipal;
    }

    public Persona getActorPrincipal() {
        return actorPrincipal;
    }

    public void setActorPrincipal(Persona actorPrincipal) {
        this.actorPrincipal = actorPrincipal;
    }

    public int getDuracionMinutos() {
        return duracionMinutos;
    }

    public void setDuracionMinutos(int duracionMinutos) {
        this.duracionMinutos = duracionMinutos;
    }

    public boolean isEstrenada() {
        return estrenada;
    }

    public void estrenar(int anioEstreno) {
        this.anioEstreno = anioEstreno;
        this.estrenada = true;
    }

    public void retrasarEstreno() {
        this.estrenada = false;
        this.anioEstreno = 0;
    }

    public String obtenerResumen() {
        return titulo + " es una pelicula dirigida por "
                + director.getNombre() + ".";
    }
}
