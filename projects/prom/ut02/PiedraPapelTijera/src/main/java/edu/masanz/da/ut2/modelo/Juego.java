package edu.masanz.da.ut2.modelo;

import java.util.Random;

public class Juego {
    private Persona persona1;
    private Persona persona2;

    /**
     * Crea un juego sin personas asignadas.
     */
    public Juego() {
    }

    /**
     * Crea un juego indicando las dos personas participantes.
     *
     * @param persona1 primera persona participante
     * @param persona2 segunda persona participante
     */
    public Juego(Persona persona1, Persona persona2) {
        this.persona1 = persona1;
        this.persona2 = persona2;
    }

    /**
     * Devuelve una descripcion del juego y sus participantes.
     *
     * @return texto con las personas participantes
     */
    @Override
    public String toString() {
        return "Juego{persona1=" + persona1 + ", persona2=" + persona2 + "}";
    }

    /**
     * Devuelve la primera persona participante.
     *
     * @return primera persona participante
     */
    public Persona getPersona1() {
        return persona1;
    }

    /**
     * Asigna la primera persona participante.
     *
     * @param persona1 primera persona participante
     */
    public void setPersona1(Persona persona1) {
        this.persona1 = persona1;
    }

    /**
     * Devuelve la segunda persona participante.
     *
     * @return segunda persona participante
     */
    public Persona getPersona2() {
        return persona2;
    }

    /**
     * Asigna la segunda persona participante.
     *
     * @param persona2 segunda persona participante
     */
    public void setPersona2(Persona persona2) {
        this.persona2 = persona2;
    }

    /**
     * Ejecuta una partida de piedra, papel o tijera entre las dos personas.
     */
    public void jugar() {
        if (persona1 == null || persona2 == null) {
            System.out.println("No se puede jugar porque faltan participantes.");
            return;
        }

        asignarJugadaAleatoria(persona1);
        asignarJugadaAleatoria(persona2);

        System.out.println(persona1.getNombre() + " juega " + persona1.getJugadaActual() + ".");
        System.out.println(persona2.getNombre() + " juega " + persona2.getJugadaActual() + ".");

        if (persona1.getJugadaActual().equals(persona2.getJugadaActual())) {
            persona1.sumarEmpate();
            persona2.sumarEmpate();
            System.out.println("La partida termina en empate.");
        } else if (ganaPrimeraPersona()) {
            persona1.sumarVictoria();
            persona2.sumarDerrota();
            System.out.println("Gana " + persona1.getNombre() + ".");
        } else {
            persona2.sumarVictoria();
            persona1.sumarDerrota();
            System.out.println("Gana " + persona2.getNombre() + ".");
        }
    }

    /**
     * Devuelve el marcador actual de las dos personas.
     *
     * @return texto con el marcador de ambas personas
     */
    public String obtenerMarcador() {
        if (persona1 == null || persona2 == null) {
            return "No hay suficientes participantes.";
        }

        return persona1 + System.lineSeparator() + persona2;
    }

    /**
     * Asigna una jugada aleatoria a una persona.
     *
     * @param persona persona a la que se asignara la jugada
     */
    private void asignarJugadaAleatoria(Persona persona) {
        int numero = new Random().nextInt(3);

        if (numero == 0) {
            persona.setJugadaActual("piedra");
        } else if (numero == 1) {
            persona.setJugadaActual("papel");
        } else {
            persona.setJugadaActual("tijera");
        }
    }

    /**
     * Comprueba si la primera persona gana a la segunda.
     *
     * @return true si gana la primera persona, false en caso contrario
     */
    private boolean ganaPrimeraPersona() {
        String jugada1 = persona1.getJugadaActual();
        String jugada2 = persona2.getJugadaActual();

        return jugada1.equals("piedra") && jugada2.equals("tijera")
                || jugada1.equals("papel") && jugada2.equals("piedra")
                || jugada1.equals("tijera") && jugada2.equals("papel");
    }
}
