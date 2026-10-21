package edu.masanz.da.ut4;

import edu.masanz.da.ut4.utilidades.Utilidades;
import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.*;

/** Contratos de calculos y rangos, sin exigir un resultado aleatorio concreto. */
class UtilidadesTest {
    @Test
    void porcentajeDecimalYValidaciones() {
        assertEquals(100.0 / 3, Utilidades.calcularPorcentaje(1, 3), 0.0001);
        assertEquals(0, Utilidades.calcularPorcentaje(0, 3));
        assertEquals(100, Utilidades.calcularPorcentaje(3, 3));
        assertThrows(IllegalArgumentException.class, () -> Utilidades.calcularPorcentaje(1, 0));
        assertThrows(IllegalArgumentException.class, () -> Utilidades.calcularPorcentaje(-1, 3));
        assertThrows(IllegalArgumentException.class, () -> Utilidades.calcularPorcentaje(4, 3));
    }

    @Test
    void codigoDentroDelIntervalo() {
        for (int i = 0; i < 100; i++) {
            int codigo = Utilidades.generarCodigo();
            assertTrue(codigo >= 1000 && codigo <= 9999);
        }
    }
}
