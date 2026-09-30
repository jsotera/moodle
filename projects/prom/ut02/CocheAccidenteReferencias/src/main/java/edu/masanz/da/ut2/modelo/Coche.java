package edu.masanz.da.ut2.modelo;

public class Coche {
    private Persona conductor;
    private Persona copiloto;
    private Persona pasajero1;
    private Persona pasajero2;
    private int velocidad;
    private boolean estaArrancado;
    private String modelo;

    /**
     * Crea un coche sin modelo, parado, apagado y sin ocupantes.
     */
    public Coche() {
        this.modelo = "";
        this.velocidad = 0;
        this.estaArrancado = false;
    }

    /**
     * Crea un coche con modelo, parado, apagado y sin ocupantes.
     *
     * @param modelo modelo del coche
     */
    public Coche(String modelo) {
        this.modelo = modelo;
        this.velocidad = 0;
        this.estaArrancado = false;
    }

    /**
     * Crea un coche con modelo y conductor inicial.
     *
     * @param modelo modelo del coche
     * @param conductor persona que conducira el coche
     */
    public Coche(String modelo, Persona conductor) {
        this.modelo = modelo;
        this.conductor = conductor;
        this.velocidad = 0;
        this.estaArrancado = false;
    }

    /**
     * Devuelve el conductor actual.
     *
     * @return conductor del coche
     */
    public Persona getConductor() {
        return conductor;
    }

    /**
     * Devuelve el copiloto actual.
     *
     * @return copiloto del coche
     */
    public Persona getCopiloto() {
        return copiloto;
    }

    /**
     * Devuelve el primer pasajero trasero.
     *
     * @return primer pasajero trasero
     */
    public Persona getPasajero1() {
        return pasajero1;
    }

    /**
     * Devuelve el segundo pasajero trasero.
     *
     * @return segundo pasajero trasero
     */
    public Persona getPasajero2() {
        return pasajero2;
    }

    /**
     * Devuelve la velocidad actual.
     *
     * @return velocidad actual del coche
     */
    public int getVelocidad() {
        return velocidad;
    }

    /**
     * Devuelve si el coche esta arrancado.
     *
     * @return true si esta arrancado, false si esta detenido
     */
    public boolean isEstaArrancado() {
        return estaArrancado;
    }

    /**
     * Devuelve el modelo del coche.
     *
     * @return modelo del coche
     */
    public String getModelo() {
        return modelo;
    }

    /**
     * Modifica el modelo del coche.
     *
     * @param modelo nuevo modelo del coche
     */
    public void setModelo(String modelo) {
        this.modelo = modelo;
    }

    /**
     * Muestra por consola una descripcion completa del coche.
     */
    public void descripcion() {
        System.out.println("Modelo: " + modelo);
        System.out.println("Arrancado: " + estaArrancado);
        System.out.println("Velocidad: " + velocidad + " km/h");
        System.out.println("Conductor: " + obtenerNombreSeguro(conductor));
        System.out.println("Copiloto: " + obtenerNombreSeguro(copiloto));
        System.out.println("Pasajero 1: " + obtenerNombreSeguro(pasajero1));
        System.out.println("Pasajero 2: " + obtenerNombreSeguro(pasajero2));
    }

    /**
     * Asigna la persona que conducira el coche.
     *
     * @param conductor nuevo conductor del coche
     */
    public void asignarConductor(Persona conductor) {
        this.conductor = conductor;
    }

    /**
     * Asigna una persona al primer asiento libre de pasajero.
     *
     * @param pasajero persona que se quiere subir al coche
     * @return true si ha podido subir, false en caso contrario
     */
    public boolean asignarPasajero(Persona pasajero) {
        if (pasajero == conductor) {
            System.out.println(pasajero.getNombre() + " no puede ser pasajero porque ya es conductor.");
            return false;
        }

        if (pasajero == copiloto || pasajero == pasajero1 || pasajero == pasajero2) {
            System.out.println(pasajero.getNombre() + " ya esta dentro del coche.");
            return false;
        }

        if (copiloto == null) {
            copiloto = pasajero;
            return true;
        } else if (pasajero1 == null) {
            pasajero1 = pasajero;
            return true;
        } else if (pasajero2 == null) {
            pasajero2 = pasajero;
            return true;
        }

        System.out.println("No entran mas pasajeros en el coche.");
        return false;
    }

    /**
     * Arranca el coche.
     */
    public void arrancar() {
        estaArrancado = true;
        System.out.println("El coche ha arrancado.");
    }

    /**
     * Detiene el coche y deja su velocidad a 0.
     */
    public void detener() {
        velocidad = 0;
        estaArrancado = false;
        System.out.println("El coche se ha detenido.");
    }

    /**
     * Aumenta la velocidad del coche si esta arrancado.
     *
     * @param velocidadAIncrementar cantidad de velocidad que se quiere aumentar
     */
    public void acelerar(int velocidadAIncrementar) {
        if (!estaArrancado) {
            System.out.println("No se puede acelerar porque el coche no esta arrancado.");
            return;
        }

        if (velocidadAIncrementar <= 0) {
            System.out.println("La velocidad a incrementar debe ser positiva.");
            return;
        }

        velocidad = velocidad + velocidadAIncrementar;
        System.out.println("El coche acelera hasta " + velocidad + " km/h.");
    }

    /**
     * Asigna lesiones a los ocupantes en funcion de la velocidad del coche.
     */
    public void tenerAccidente() {
        if (velocidad == 0) {
            System.out.println("El coche esta parado. No hay accidente.");
            return;
        }

        String lesion = calcularLesionPorVelocidad();

        System.out.println("El coche ha tenido un accidente a " + velocidad + " km/h.");
        asignarLesion(conductor, lesion);
        asignarLesion(copiloto, lesion);
        asignarLesion(pasajero1, lesion);
        asignarLesion(pasajero2, lesion);

        detener();
    }

    /**
     * Calcula el tipo de lesion segun la velocidad actual.
     *
     * @return texto que describe la lesion
     */
    private String calcularLesionPorVelocidad() {
        if (velocidad < 30) {
            return "un susto";
        } else if (velocidad < 60) {
            return "dolor cervical";
        } else if (velocidad < 100) {
            return "fractura leve";
        }

        return "lesion grave";
    }

    /**
     * Asigna una lesion a una persona si existe.
     *
     * @param persona persona a la que se asigna la lesion
     * @param lesion lesion que se va a asignar
     */
    private void asignarLesion(Persona persona, String lesion) {
        if (persona != null) {
            persona.setLesion(lesion);
        }
    }

    /**
     * Devuelve el nombre de una persona o un texto si el asiento esta libre.
     *
     * @param persona persona sentada en un asiento
     * @return nombre de la persona o texto de asiento libre
     */
    private String obtenerNombreSeguro(Persona persona) {
        if (persona == null) {
            return "Asiento libre";
        }

        return persona.getNombre();
    }
}
