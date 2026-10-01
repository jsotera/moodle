package edu.masanz.da.ut2.modelo;

public class ClinicaVeterinaria {
    private static int totalMascotasAtendidas = 0;
    private static int totalVacunasAplicadas = 0;
    private static int totalOperaciones = 0;
    private static int ingresosTotalesCentimos = 0;

    private static int precioConsultaCentimos = 3000;
    private static int precioVacunaCentimos = 1800;
    private static int precioOperacionCentimos = 12000;

    /**
     * Reinicia las estadisticas globales de la clinica.
     */
    public static void reiniciarEstadisticas() {
        totalMascotasAtendidas = 0;
        totalVacunasAplicadas = 0;
        totalOperaciones = 0;
        ingresosTotalesCentimos = 0;
    }

    /**
     * Configura los precios compartidos por toda la clinica.
     *
     * @param precioConsultaCentimos precio de una consulta
     * @param precioVacunaCentimos precio de una vacuna
     * @param precioOperacionCentimos precio de una operacion
     */
    public static void configurarPrecios(int precioConsultaCentimos,
                                         int precioVacunaCentimos,
                                         int precioOperacionCentimos) {
        ClinicaVeterinaria.precioConsultaCentimos = precioConsultaCentimos;
        ClinicaVeterinaria.precioVacunaCentimos = precioVacunaCentimos;
        ClinicaVeterinaria.precioOperacionCentimos = precioOperacionCentimos;
    }

    /**
     * Registra una consulta en las estadisticas globales.
     */
    static void registrarConsulta() {
        totalMascotasAtendidas++;
        ingresosTotalesCentimos = ingresosTotalesCentimos + precioConsultaCentimos;
    }

    /**
     * Registra una vacuna en las estadisticas globales.
     */
    static void registrarVacuna() {
        totalVacunasAplicadas++;
        ingresosTotalesCentimos = ingresosTotalesCentimos + precioVacunaCentimos;
    }

    /**
     * Registra una operacion en las estadisticas globales.
     */
    static void registrarOperacion() {
        totalOperaciones++;
        ingresosTotalesCentimos = ingresosTotalesCentimos + precioOperacionCentimos;
    }

    /**
     * Devuelve el total de mascotas atendidas.
     *
     * @return total de mascotas atendidas
     */
    public static int getTotalMascotasAtendidas() {
        return totalMascotasAtendidas;
    }

    /**
     * Devuelve el total de vacunas aplicadas.
     *
     * @return total de vacunas aplicadas
     */
    public static int getTotalVacunasAplicadas() {
        return totalVacunasAplicadas;
    }

    /**
     * Devuelve el total de operaciones realizadas.
     *
     * @return total de operaciones
     */
    public static int getTotalOperaciones() {
        return totalOperaciones;
    }

    /**
     * Devuelve los ingresos totales en centimos.
     *
     * @return ingresos totales en centimos
     */
    public static int getIngresosTotalesCentimos() {
        return ingresosTotalesCentimos;
    }

    /**
     * Muestra por consola las estadisticas globales de la clinica.
     */
    public static void mostrarEstadisticas() {
        System.out.println("Mascotas atendidas: " + totalMascotasAtendidas);
        System.out.println("Vacunas aplicadas: " + totalVacunasAplicadas);
        System.out.println("Operaciones realizadas: " + totalOperaciones);
        System.out.println("Ingresos totales: " + ingresosTotalesCentimos + " centimos");
    }
}
