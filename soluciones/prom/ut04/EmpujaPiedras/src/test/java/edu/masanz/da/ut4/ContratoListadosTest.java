package edu.masanz.da.ut4;

import edu.masanz.da.ut4.listados.*;
import edu.masanz.da.ut4.modelo.*;
import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.*;

/** Pruebas suministradas: comprueban el contrato, no una forma concreta de implementarlo. */
class ContratoListadosTest {
    @Test
    void destinosConservaEnlacesYRechazaSustitucionesInvalidas() {
        IListado<Destino> lista = new ListadoDestinos();
        Destino a = new Destino(0, 0);
        Destino b = new Destino(1, 0);
        Destino c = new Destino(2, 0);
        Destino d = new Destino(3, 0);
        lista.incluir(a); lista.incluir(b); lista.incluir(c); lista.incluir(d);
        assertThrows(IllegalArgumentException.class, () -> lista.incluir(null));
        assertThrows(IllegalArgumentException.class, () -> lista.sustituir(0, b));
        assertThrows(IllegalArgumentException.class, () -> lista.sustituir(0, null));
        assertThrows(IndexOutOfBoundsException.class, () -> lista.sustituir(-1, a));
        assertSame(a, lista.sustituir(0, a));
        assertSame(b, lista.eliminar(1));
        assertSame(a, lista.eliminar(0));
        assertSame(d, lista.eliminar(1));
        assertSame(c, lista.eliminar(0));
        assertEquals("[]", lista.toString());
        assertEquals(0, lista.getCantidad());
        assertThrows(IndexOutOfBoundsException.class, () -> lista.eliminar(0));
        lista.incluir(a);
        assertSame(a, lista.obtener(0));
    }

    @Test
    void nivelesConservaEnlacesYRechazaSustitucionesInvalidas() {
        IListado<Nivel> lista = new ListadoNiveles();
        Nivel a = new Nivel("A", 4, 4, new Personaje(0, 0));
        Nivel b = new Nivel("B", 4, 4, new Personaje(1, 0));
        Nivel c = new Nivel("C", 4, 4, new Personaje(2, 0));
        Nivel d = new Nivel("D", 4, 4, new Personaje(3, 0));
        lista.incluir(a); lista.incluir(b); lista.incluir(c); lista.incluir(d);
        assertThrows(IllegalArgumentException.class, () -> lista.incluir(null));
        assertThrows(IllegalArgumentException.class, () -> lista.sustituir(0, b));
        assertThrows(IllegalArgumentException.class, () -> lista.sustituir(0, null));
        assertThrows(IndexOutOfBoundsException.class, () -> lista.sustituir(-1, a));
        assertSame(a, lista.sustituir(0, a));
        assertSame(b, lista.eliminar(1));
        assertSame(a, lista.eliminar(0));
        assertSame(d, lista.eliminar(1));
        assertSame(c, lista.eliminar(0));
        assertEquals("[]", lista.toString());
        assertEquals(0, lista.getCantidad());
        assertThrows(IndexOutOfBoundsException.class, () -> lista.eliminar(0));
        lista.incluir(a);
        assertSame(a, lista.obtener(0));
    }

    @Test
    void listaVaciaEIndicesIncorrectos() {
        IListado<Piedra> lista = new ListadoPiedras();
        assertTrue(lista.estaVacio());
        assertEquals(0, lista.getCantidad());
        assertEquals("[]", lista.toString());
        assertThrows(IndexOutOfBoundsException.class, () -> lista.obtener(0));
        assertThrows(IndexOutOfBoundsException.class, () -> lista.obtener(-1));
        assertThrows(IndexOutOfBoundsException.class, () -> lista.eliminar(0));
    }

    @Test
    void conservaOrdenEIdentidad() {
        IListado<Piedra> lista = new ListadoPiedras();
        Piedra a = new Piedra(1, 1);
        Piedra b = new Piedra(2, 1);
        lista.incluir(a);
        lista.incluir(b);
        assertSame(a, lista.obtener(0));
        assertSame(b, lista.obtener(1));
        lista.obtener(0).colocarEn(3, 3);
        assertEquals(3, a.getX());
        assertEquals(2, lista.getCantidad());
        assertThrows(IndexOutOfBoundsException.class, () -> lista.obtener(2));
    }

    @Test
    void eliminaPrimeroIntermedioUltimoYUnico() {
        IListado<Piedra> lista = new ListadoPiedras();
        Piedra a = new Piedra(0, 0);
        Piedra b = new Piedra(1, 0);
        Piedra c = new Piedra(2, 0);
        Piedra d = new Piedra(3, 0);
        lista.incluir(a); lista.incluir(b); lista.incluir(c); lista.incluir(d);
        assertSame(b, lista.eliminar(1));
        assertSame(a, lista.eliminar(0));
        assertSame(d, lista.eliminar(1));
        assertSame(c, lista.eliminar(0));
        assertTrue(lista.estaVacio());
        lista.incluir(a);
        assertSame(a, lista.obtener(0));
    }

    @Test
    void sustitucionVaciadoYErroresNoAlteranLaLista() {
        IListado<Piedra> lista = new ListadoPiedras();
        Piedra a = new Piedra(1, 1);
        Piedra b = new Piedra(2, 2);
        Piedra c = new Piedra(3, 3);
        assertThrows(IllegalArgumentException.class, () -> lista.incluir(null));
        lista.incluir(a); lista.incluir(b);
        assertThrows(IllegalArgumentException.class, () -> lista.incluir(a));
        assertThrows(IllegalArgumentException.class, () -> lista.sustituir(0, b));
        assertThrows(IllegalArgumentException.class, () -> lista.sustituir(0, null));
        assertThrows(IndexOutOfBoundsException.class, () -> lista.sustituir(8, c));
        assertSame(a, lista.sustituir(0, a));
        assertSame(a, lista.sustituir(0, c));
        assertSame(c, lista.obtener(0));
        assertEquals(2, lista.getCantidad());
        assertTrue(lista.toString().contains(c.toString()));
        lista.vaciar();
        lista.vaciar();
        assertTrue(lista.estaVacio());
        assertEquals(3, c.getX());
    }

    @Test
    void listadoDeDestinosCumpleElContrato() {
        IListado<Destino> lista = new ListadoDestinos();
        Destino a = new Destino(1, 1);
        Destino b = new Destino(2, 2);
        lista.incluir(a); lista.incluir(b);
        assertSame(a, lista.obtener(0));
        assertThrows(IllegalArgumentException.class, () -> lista.incluir(a));
        assertSame(b, lista.eliminar(1));
        assertSame(a, lista.sustituir(0, b));
        assertEquals(1, lista.getCantidad());
        lista.vaciar();
        assertThrows(IndexOutOfBoundsException.class, () -> lista.obtener(0));
    }

    @Test
    void listadoDeNivelesCumpleElContrato() {
        IListado<Nivel> lista = new ListadoNiveles();
        Nivel a = new Nivel("A", 4, 4, new Personaje(0, 0));
        Nivel b = new Nivel("B", 4, 4, new Personaje(1, 1));
        lista.incluir(a); lista.incluir(b);
        assertSame(a, lista.obtener(0));
        assertSame(b, lista.eliminar(1));
        assertSame(a, lista.sustituir(0, b));
        assertSame(b, lista.obtener(0));
        assertThrows(IllegalArgumentException.class, () -> lista.incluir(b));
        lista.vaciar();
        assertTrue(lista.estaVacio());
    }
}
