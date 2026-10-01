package edu.masanz.da.ut2.modelo;

public class Veterinario {
    private String nombre;
    private String especialidad;
    private int mascotasAtendidas;

    /**
     * Crea un veterinario sin datos.
     */
    public Veterinario() {
        this.nombre = "";
        this.especialidad = "";
    }

    /**
     * Crea un veterinario con nombre y especialidad.
     *
     * @param nombre nombre del veterinario
     * @param especialidad especialidad del veterinario
     */
    public Veterinario(String nombre, String especialidad) {
        this.nombre = nombre;
        this.especialidad = especialidad;
    }

    /**
     * Devuelve una descripcion del veterinario.
     *
     * @return texto con nombre, especialidad y mascotas atendidas
     */
    @Override
    public String toString() {
        return "Veterinario{nombre='" + nombre + "', especialidad='"
                + especialidad + "', mascotasAtendidas=" + mascotasAtendidas + "}";
    }

    /**
     * Atiende a una mascota y modifica su estado.
     *
     * @param mascota mascota que se va a atender
     */
    public void atender(Mascota mascota) {
        mascota.setEstado("revisada por " + nombre);
        mascota.setSalud(mascota.getSalud() + 5);
        mascotasAtendidas++;
        ClinicaVeterinaria.registrarConsulta();
        System.out.println(nombre + " ha atendido a " + mascota.getNombre() + ".");
    }

    /**
     * Vacuna a una mascota y modifica sus propiedades.
     *
     * @param mascota mascota que se va a vacunar
     */
    public void vacunar(Mascota mascota) {
        mascota.setVacunada(true);
        mascota.setEstado("vacunada por " + nombre);
        mascotasAtendidas++;
        ClinicaVeterinaria.registrarVacuna();
        System.out.println(nombre + " ha vacunado a " + mascota.getNombre() + ".");
    }

    /**
     * Opera a una mascota y modifica su salud y estado.
     *
     * @param mascota mascota que se va a operar
     */
    public void operar(Mascota mascota) {
        mascota.setSalud(mascota.getSalud() - 10);
        mascota.setEstado("operada por " + nombre);
        mascotasAtendidas++;
        ClinicaVeterinaria.registrarOperacion();
        System.out.println(nombre + " ha operado a " + mascota.getNombre() + ".");
    }

    /**
     * Devuelve el nombre del veterinario.
     *
     * @return nombre del veterinario
     */
    public String getNombre() {
        return nombre;
    }

    /**
     * Modifica el nombre del veterinario.
     *
     * @param nombre nuevo nombre del veterinario
     */
    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    /**
     * Devuelve la especialidad del veterinario.
     *
     * @return especialidad del veterinario
     */
    public String getEspecialidad() {
        return especialidad;
    }

    /**
     * Modifica la especialidad del veterinario.
     *
     * @param especialidad nueva especialidad del veterinario
     */
    public void setEspecialidad(String especialidad) {
        this.especialidad = especialidad;
    }

    /**
     * Devuelve cuantas mascotas ha atendido este veterinario.
     *
     * @return numero de mascotas atendidas
     */
    public int getMascotasAtendidas() {
        return mascotasAtendidas;
    }

    /**
     * Muestra la informacion del veterinario.
     */
    public void mostrarInformacion() {
        System.out.println(this);
    }
}
