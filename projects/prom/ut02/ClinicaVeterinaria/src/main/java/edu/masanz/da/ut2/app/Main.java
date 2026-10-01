package edu.masanz.da.ut2.app;

import edu.masanz.da.ut2.modelo.ClinicaVeterinaria;
import edu.masanz.da.ut2.modelo.Mascota;
import edu.masanz.da.ut2.modelo.Veterinario;

public class Main {
    public static void main(String[] args) {
        // TODO Reinicia las estadisticas globales.
        ClinicaVeterinaria.reiniciarEstadisticas();

        // TODO Configura los precios de la clinica.
        ClinicaVeterinaria.configurarPrecios(3000, 1800, 12000);

        // TODO Crea varias mascotas.
        Mascota mascota1 = new Mascota("Nala", "gato", 80);

        // TODO Crea varios veterinarios.
        Veterinario veterinario1 = new Veterinario("Ane", "general");

        // TODO Muestra las mascotas antes de atenderlas.

        // TODO Atiende, vacuna y opera mascotas pasandolas como parametro.

        // TODO Muestra las mascotas despues de pasar por los metodos.

        // TODO Muestra las estadisticas globales de la clinica.

        // TODO Muestra cada veterinario para ver su contador propio.
    }
}
