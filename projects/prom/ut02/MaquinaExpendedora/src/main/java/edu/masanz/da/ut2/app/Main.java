package edu.masanz.da.ut2.app;

import edu.masanz.da.ut2.modelo.MaquinaExpendedora;
import edu.masanz.da.ut2.modelo.Producto;

public class Main {
    public static void main(String[] args) {
        // TODO Reinicia las estadisticas globales.
        MaquinaExpendedora.reiniciarEstadisticasGlobales();

        // TODO Configura la probabilidad de fallo compartida por todas las maquinas.
        MaquinaExpendedora.configurarProbabilidadFallo(25);

        // TODO Crea varios productos.
        Producto agua = new Producto("Agua", 120, 3);

        // TODO Crea dos maquinas y coloca productos en ellas.
        MaquinaExpendedora maquina1 = new MaquinaExpendedora("Entrada");

        // TODO Realiza varias ventas invocando metodos de instancia.

        // TODO Consulta la caja global y las ventas globales invocando metodos static.

        // TODO Cambia la probabilidad de fallo y prueba nuevas ventas.
    }
}
