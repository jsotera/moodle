package edu.masanz.da.ut4;

import edu.masanz.da.ut4.modelo.*;
import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.*;

/** Casos reproducibles de movimiento, empuje, reinicio y avance. */
class JuegoTest {
    @Test
    void construccionesInvalidas() {
        assertThrows(IllegalArgumentException.class, () -> new Personaje(-1, 0));
        assertThrows(IllegalArgumentException.class, () -> new Piedra(0, -1));
        assertThrows(IllegalArgumentException.class, () -> new Destino(-1, 0));
        assertThrows(IllegalArgumentException.class, () -> new Nivel("", 4, 4, new Personaje(0, 0)));
        assertThrows(IllegalArgumentException.class, () -> new Nivel("A", 0, 4, new Personaje(0, 0)));
        assertThrows(IllegalArgumentException.class, () -> new Nivel("A", 4, 4, null));
        assertThrows(IllegalArgumentException.class, () -> new Nivel("A", 4, 4, new Personaje(4, 0)));
    }

    @Test
    void noConfundeUnTableroVacioConUnNivelResuelto() {
        Nivel nivel = new Nivel("A", 5, 4, new Personaje(0, 0));
        assertFalse(nivel.estaResuelto());
        assertThrows(IllegalArgumentException.class, nivel::validarConfiguracion);
        nivel.incluirPiedra(new Piedra(1, 1));
        assertThrows(IllegalArgumentException.class, nivel::validarConfiguracion);
    }

    @Test
    void rechazaColisionesInicialesPeroPermitePiedraSobreDestino() {
        Nivel nivel = new Nivel("A", 4, 4, new Personaje(0, 0));
        assertThrows(IllegalArgumentException.class, () -> nivel.incluirPiedra(new Piedra(0, 0)));
        assertThrows(IllegalArgumentException.class, () -> nivel.incluirPiedra(new Piedra(4, 0)));
        nivel.incluirPiedra(new Piedra(1, 1));
        assertThrows(IllegalArgumentException.class, () -> nivel.incluirPiedra(new Piedra(1, 1)));
        nivel.incluirDestino(new Destino(1, 1));
        assertThrows(IllegalArgumentException.class, () -> nivel.incluirDestino(new Destino(1, 1)));
        nivel.validarConfiguracion();
        assertTrue(nivel.estaResuelto());
        assertEquals('*', nivel.getCasilla(1, 1));
    }

    @Test
    void bloqueaElBordeSinConsumirMovimientos() {
        Nivel nivel = new Nivel("A", 4, 4, new Personaje(0, 0));
        assertFalse(nivel.mover(-1, 0));
        assertFalse(nivel.mover(0, -1));
        assertEquals('J', nivel.getCasilla(0, 0));
        assertEquals(0, nivel.getMovimientos());
        assertThrows(IllegalArgumentException.class, () -> nivel.mover(1, 1));
        assertThrows(IllegalArgumentException.class, () -> nivel.getCasilla(4, 0));
    }

    @Test
    void noEmpujaDosPiedrasNiSacaUnaFueraDelMapa() {
        Nivel nivel = new Nivel("A", 4, 3, new Personaje(0, 1));
        Piedra primera = new Piedra(1, 1);
        nivel.incluirPiedra(primera);
        nivel.incluirPiedra(new Piedra(2, 1));
        assertFalse(nivel.mover(1, 0));
        assertEquals(1, primera.getX());
        assertEquals('J', nivel.getCasilla(0, 1));
        assertEquals(0, nivel.getMovimientos());
        Nivel borde = new Nivel("B", 3, 3, new Personaje(1, 1));
        borde.incluirPiedra(new Piedra(2, 1));
        assertFalse(borde.mover(1, 0));
        assertEquals(0, borde.getEmpujes());
    }

    @Test
    void conservaElDestinoBajoElJugadorYLaPiedra() {
        Nivel nivel = new Nivel("A", 6, 3, new Personaje(0, 1));
        nivel.incluirPiedra(new Piedra(2, 1));
        nivel.incluirDestino(new Destino(1, 1));
        assertTrue(nivel.mover(1, 0));
        assertEquals('+', nivel.getCasilla(1, 1));
        assertTrue(nivel.mover(1, 0));
        assertEquals('D', nivel.getCasilla(1, 1));
        assertTrue(nivel.mover(0, -1));
        assertTrue(nivel.mover(1, 0));
        assertTrue(nivel.mover(1, 0));
        assertTrue(nivel.mover(0, 1));
        assertTrue(nivel.mover(-1, 0));
        assertTrue(nivel.mover(-1, 0));
        assertEquals('*', nivel.getCasilla(1, 1));
        assertTrue(nivel.estaResuelto());
    }

    @Test
    void reiniciaLosMismosObjetosSinPerderLasPosicionesIniciales() {
        Nivel nivel = new Nivel("A", 6, 4, new Personaje(1, 2));
        Piedra piedra = new Piedra(2, 2);
        nivel.incluirPiedra(piedra);
        nivel.incluirDestino(new Destino(4, 2));
        nivel.mover(1, 0);
        assertSame(piedra, nivel.buscarPiedra(3, 2));
        nivel.reiniciar();
        assertSame(piedra, nivel.buscarPiedra(2, 2));
        assertEquals('J', nivel.getCasilla(1, 2));
        assertEquals(0, nivel.getMovimientos());
        assertEquals(0, nivel.getEmpujes());
    }

    @Test
    void losTresNivelesSonResolublesYElAvanceEstaProtegido() {
        Juego juego = new Juego();
        assertFalse(juego.siguienteNivel());
        ejecutar(juego, "DD");
        assertTrue(juego.estaResuelto());
        assertEquals(2, juego.getMovimientos());
        assertFalse(juego.mover("W"));
        assertEquals(2, juego.getMovimientos());
        assertTrue(juego.siguienteNivel());
        assertEquals(0, juego.getMovimientos());
        ejecutar(juego, "DDDASD");
        assertTrue(juego.estaResuelto());
        assertTrue(juego.siguienteNivel());
        ejecutar(juego, "DDDDAAASDDDASD");
        assertTrue(juego.estaTerminada());
        assertFalse(juego.siguienteNivel());
        juego.reiniciar();
        assertFalse(juego.estaTerminada());
        assertEquals(3, juego.getNumeroNivel());
        assertEquals(0, juego.getMovimientos());
    }

    @Test
    void partidasIndependientesYContadorEstatico() {
        int antes = Juego.getPartidasCreadas();
        Juego a = new Juego();
        Juego b = new Juego();
        a.mover("d");
        assertEquals(1, a.getMovimientos());
        assertEquals(0, b.getMovimientos());
        assertEquals(antes + 2, Juego.getPartidasCreadas());
        assertThrows(IllegalArgumentException.class, () -> a.mover("X"));
        assertThrows(IllegalArgumentException.class, () -> a.mover(null));
        assertEquals(1, a.getMovimientos());
    }

    private void ejecutar(Juego juego, String secuencia) {
        for (int i = 0; i < secuencia.length(); i++) {
            assertTrue(juego.mover(String.valueOf(secuencia.charAt(i))), "Paso " + i);
        }
    }
}
