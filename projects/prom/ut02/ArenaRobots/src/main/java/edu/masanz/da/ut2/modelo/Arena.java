package edu.masanz.da.ut2.modelo;

import java.util.Random;

public class Arena {
    private Robot robot1;
    private Robot robot2;
    private Robot robot3;
    private Robot robot4;
    private Robot robot5;
    private Robot robot6;
    private Robot robot7;
    private Robot robot8;

    // Constructor vacio. Todos los robots quedan sin asignar.
    public Arena() {
    }

    // Inscribe el robot en el primer hueco libre de la arena.
    public void inscribirRobot(Robot robot) {
        if (robot1 == null) {
            robot1 = robot;
        } else if (robot2 == null) {
            robot2 = robot;
        } else if (robot3 == null) {
            robot3 = robot;
        } else if (robot4 == null) {
            robot4 = robot;
        } else if (robot5 == null) {
            robot5 = robot;
        } else if (robot6 == null) {
            robot6 = robot;
        } else if (robot7 == null) {
            robot7 = robot;
        } else if (robot8 == null) {
            robot8 = robot;
        } else {
            System.out.println("No quedan huecos libres en la arena.");
        }
    }

    // Realiza un combate de una ronda entre dos robots aleatorios.
    public void comenzarCombate() {
        if (contarRobotsVivos() < 2) {
            System.out.println("No hay suficientes robots vivos para comenzar un combate.");
            return;
        }

        Robot primerRobot = obtenerRobotAleatorioVivo();
        Robot segundoRobot = obtenerRobotAleatorioVivo();

        while (primerRobot == segundoRobot) {
            segundoRobot = obtenerRobotAleatorioVivo();
        }

        System.out.println("Comienza el combate entre " + primerRobot.getNombre()
                + " y " + segundoRobot.getNombre() + ".");

        int danioPrimerAtaque = segundoRobot.recibirAtaque(primerRobot);
        boolean segundoSigueVivo = segundoRobot.perderVida(danioPrimerAtaque);
        System.out.println(primerRobot.getNombre() + " ataca a "
                + segundoRobot.getNombre() + " y causa "
                + danioPrimerAtaque + " puntos de danio.");

        int danioSegundoAtaque = primerRobot.recibirAtaque(segundoRobot);
        boolean primeroSigueVivo = primerRobot.perderVida(danioSegundoAtaque);
        System.out.println(segundoRobot.getNombre() + " ataca a "
                + primerRobot.getNombre() + " y causa "
                + danioSegundoAtaque + " puntos de danio.");

        if (!primeroSigueVivo) {
            System.out.println(primerRobot.getNombre() + " ha caido en combate.");
        }

        if (!segundoSigueVivo) {
            System.out.println(segundoRobot.getNombre() + " ha caido en combate.");
        }
    }

    // Vacia la arena sin modificar los robots que existan fuera de ella.
    public void restablecer() {
        robot1 = null;
        robot2 = null;
        robot3 = null;
        robot4 = null;
        robot5 = null;
        robot6 = null;
        robot7 = null;
        robot8 = null;
    }

    // Devuelve el robot con mas vida.
    public Robot obtenerRobotPrimero() {
        return obtenerRobotPorPosicion(1);
    }

    // Devuelve el segundo robot con mas vida.
    public Robot obtenerRobotSegundo() {
        return obtenerRobotPorPosicion(2);
    }

    // Devuelve el tercer robot con mas vida.
    public Robot obtenerRobotTercero() {
        return obtenerRobotPorPosicion(3);
    }

    // Devuelve un texto con los tres robots que tienen mas vida.
    public String obtenerPodio() {
        return "1. " + obtenerRobotPrimero() + System.lineSeparator()
                + "2. " + obtenerRobotSegundo() + System.lineSeparator()
                + "3. " + obtenerRobotTercero();
    }

    // Cuenta cuantos robots vivos hay inscritos en la arena.
    private int contarRobotsVivos() {
        int contador = 0;

        for (int i = 1; i <= 8; i++) {
            Robot robot = obtenerRobotPorNumero(i);
            if (robot != null && robot.getVida() > 0) {
                contador++;
            }
        }

        return contador;
    }

    // Obtiene un robot vivo al azar de entre los inscritos.
    private Robot obtenerRobotAleatorioVivo() {
        Random random = new Random();
        Robot robot = null;

        while (robot == null || robot.getVida() <= 0) {
            int numeroRobot = random.nextInt(8) + 1;
            robot = obtenerRobotPorNumero(numeroRobot);
        }

        return robot;
    }

    // Devuelve el robot asociado a una posicion fisica de la arena.
    private Robot obtenerRobotPorNumero(int numeroRobot) {
        if (numeroRobot == 1) {
            return robot1;
        } else if (numeroRobot == 2) {
            return robot2;
        } else if (numeroRobot == 3) {
            return robot3;
        } else if (numeroRobot == 4) {
            return robot4;
        } else if (numeroRobot == 5) {
            return robot5;
        } else if (numeroRobot == 6) {
            return robot6;
        } else if (numeroRobot == 7) {
            return robot7;
        } else if (numeroRobot == 8) {
            return robot8;
        }

        return null;
    }

    // Busca el robot que ocupa una posicion concreta en la clasificacion por vida.
    private Robot obtenerRobotPorPosicion(int posicion) {
        Robot primero = null;
        Robot segundo = null;
        Robot tercero = null;

        for (int i = 1; i <= 8; i++) {
            Robot actual = obtenerRobotPorNumero(i);

            if (actual != null) {
                if (primero == null || actual.getVida() > primero.getVida()) {
                    tercero = segundo;
                    segundo = primero;
                    primero = actual;
                } else if (segundo == null || actual.getVida() > segundo.getVida()) {
                    tercero = segundo;
                    segundo = actual;
                } else if (tercero == null || actual.getVida() > tercero.getVida()) {
                    tercero = actual;
                }
            }
        }

        if (posicion == 1) {
            return primero;
        } else if (posicion == 2) {
            return segundo;
        } else if (posicion == 3) {
            return tercero;
        }

        return null;
    }
}
