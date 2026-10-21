package edu.masanz.da.ut4;

import edu.masanz.da.ut4.modelo.Juego;
import edu.masanz.da.ut4.vista.consola.VistaConsola;
import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.PrintStream;
import java.nio.charset.StandardCharsets;
import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.*;

/** Comprueba que la vista delega y que una entrada incorrecta no termina la partida. */
class ConsolaTest {
    @Test
    void tecladoYConversionesUsanElMismoModelo() throws Exception {
        var entradaOriginal = System.in;
        var salidaOriginal = System.out;
        ByteArrayOutputStream salida = new ByteArrayOutputStream();
        try {
            System.setIn(new ByteArrayInputStream("texto\n9\nD\nD\nN\nQ\n".getBytes(StandardCharsets.UTF_8)));
            System.setOut(new PrintStream(salida, true, StandardCharsets.UTF_8));
            Juego juego = new Juego();
            new VistaConsola().ejecutar(juego);
            assertEquals(2, juego.getNumeroNivel());
            assertEquals(0, juego.getMovimientos());
            String texto = salida.toString(StandardCharsets.UTF_8);
            assertTrue(texto.contains("numero entre 0 y 3"));
            assertTrue(texto.contains("fuera del menu"));
        } finally {
            System.setIn(entradaOriginal);
            System.setOut(salidaOriginal);
        }
    }
}
