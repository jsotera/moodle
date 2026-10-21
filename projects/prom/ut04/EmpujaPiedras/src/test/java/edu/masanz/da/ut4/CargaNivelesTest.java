package edu.masanz.da.ut4;

import edu.masanz.da.ut4.configuracion.Constantes;
import edu.masanz.da.ut4.listados.IListado;
import edu.masanz.da.ut4.modelo.Nivel;
import edu.masanz.da.ut4.utilidades.Utilidades;
import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.*;

/** Contrato de lectura del texto, sin depender del algoritmo elegido. */
class CargaNivelesTest {
    @Test
    void cargaLosTresMapasYConservaSusSimbolos() {
        IListado<Nivel> niveles = Utilidades.cargarNiveles();
        assertEquals(3, niveles.getCantidad());
        assertEquals("Primer empuje", niveles.obtener(0).getTitulo());
        assertEquals("Dos entregas", niveles.obtener(1).getTitulo());
        assertEquals("Tres caminos", niveles.obtener(2).getTitulo());
        for (int i = 0; i < niveles.getCantidad(); i++) {
            Nivel nivel = niveles.obtener(i);
            assertEquals(i + 6, nivel.getAnchura());
            assertEquals(i + 5, nivel.getAltura());
            assertEquals(i + 1, nivel.getCantidadDestinos());
            assertEquals('J', nivel.getCasilla(1, 2));
            assertEquals('P', nivel.getCasilla(2, 2));
            assertFalse(nivel.estaResuelto());
        }
    }

    @Test
    void aceptaCrLfYSinSaltoFinal() {
        String texto = Constantes.NIVELES;
        texto = texto.substring(0, texto.length() - 1).replace("\n", "\r\n");
        assertEquals(3, Utilidades.cargarNiveles(texto).getCantidad());
        assertEquals(3, Utilidades.cargarNiveles(Constantes.NIVELES).getCantidad());
    }

    @Test
    void dimensionesYCoordenadasNoEstanCodificadasEnJava() {
        Nivel nivel = Utilidades.cargarNiveles("Prueba\nD.PJ\n....").obtener(0);
        assertEquals(4, nivel.getAnchura());
        assertEquals(2, nivel.getAltura());
        assertEquals('D', nivel.getCasilla(0, 0));
        assertEquals('P', nivel.getCasilla(2, 0));
        assertEquals('J', nivel.getCasilla(3, 0));
        assertTrue(nivel.mover(-1, 0));
    }

    @Test
    void conservaDestinosBajoPersonajeYPiedra() {
        Nivel nivel = Utilidades.cargarNiveles("Capas\n+*P.\n....\n").obtener(0);
        assertEquals('+', nivel.getCasilla(0, 0));
        assertEquals('*', nivel.getCasilla(1, 0));
        assertEquals(2, nivel.getCantidadDestinos());
        assertEquals(1, nivel.getDestinosCubiertos());
        assertTrue(nivel.mover(0, 1));
        assertEquals('D', nivel.getCasilla(0, 0));
    }

    @Test
    void cadaCargaCreaObjetosIndependientes() {
        Nivel a = Utilidades.cargarNiveles().obtener(0);
        Nivel b = Utilidades.cargarNiveles().obtener(0);
        assertNotSame(a, b);
        assertNotSame(a.buscarPiedra(2, 2), b.buscarPiedra(2, 2));
        assertTrue(a.mover(1, 0));
        assertEquals('P', b.getCasilla(2, 2));
        assertEquals(0, b.getMovimientos());
    }

    @Test
    void rechazaTextosVaciosYSeparadoresSinNivel() {
        assertThrows(IllegalArgumentException.class, () -> Utilidades.cargarNiveles(null));
        assertThrows(IllegalArgumentException.class, () -> Utilidades.cargarNiveles(" "));
        assertThrows(IllegalArgumentException.class, () -> Utilidades.cargarNiveles("Solo titulo"));
        assertThrows(IllegalArgumentException.class, () -> Utilidades.cargarNiveles("\nJPD\n"));
        assertThrows(IllegalArgumentException.class, () -> Utilidades.cargarNiveles("---\nJPD\n"));
        assertThrows(IllegalArgumentException.class, () -> Utilidades.cargarNiveles("A\nJPD\n---\n"));
        assertThrows(IllegalArgumentException.class, () -> Utilidades.cargarNiveles("A\nJPD\n---\n---\nB\nJPD\n"));
    }

    @Test
    void rechazaRectangulosSimbolosYPersonajesIncorrectos() {
        assertThrows(IllegalArgumentException.class, () -> Utilidades.cargarNiveles("A\nJPD\n..\n"));
        assertThrows(IllegalArgumentException.class, () -> Utilidades.cargarNiveles("A\nJPD\n\n"));
        assertThrows(IllegalArgumentException.class, () -> Utilidades.cargarNiveles("A\nJPD#\n"));
        assertThrows(IllegalArgumentException.class, () -> Utilidades.cargarNiveles("A\n.PD\n"));
        assertThrows(IllegalArgumentException.class, () -> Utilidades.cargarNiveles("A\nJJPD\n"));
        assertThrows(IllegalArgumentException.class, () -> Utilidades.cargarNiveles("A\n+JPD\n"));
    }

    @Test
    void rechazaCantidadesNoPositivasODistintas() {
        assertThrows(IllegalArgumentException.class, () -> Utilidades.cargarNiveles("A\nJ..\n"));
        assertThrows(IllegalArgumentException.class, () -> Utilidades.cargarNiveles("A\nJPPD\n"));
        assertThrows(IllegalArgumentException.class, () -> Utilidades.cargarNiveles("A\nJPDD\n"));
    }
}
