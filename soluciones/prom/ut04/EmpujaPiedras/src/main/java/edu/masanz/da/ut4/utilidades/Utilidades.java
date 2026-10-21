package edu.masanz.da.ut4.utilidades;

import edu.masanz.da.ut4.configuracion.Constantes;
import edu.masanz.da.ut4.listados.IListado;
import edu.masanz.da.ut4.listados.ListadoNiveles;
import edu.masanz.da.ut4.modelo.Nivel;
import edu.masanz.da.ut4.modelo.Personaje;
import edu.masanz.da.ut4.modelo.Piedra;
import edu.masanz.da.ut4.modelo.Destino;
import java.util.Random;

/** Operaciones independientes del estado de un tablero. */
public class Utilidades {
    /**
     * Carga objetos independientes a partir del texto de Constantes.
     * @return listado nuevo con todos los niveles iniciales
     */
    public static IListado<Nivel> cargarNiveles() {
        return cargarNiveles(Constantes.NIVELES);
    }

    /**
     * Interpreta titulo y filas rectangulares, separando niveles con una linea ---.
     * No utiliza split, arrays ni colecciones. Admite saltos LF y CRLF.
     * @param texto niveles con simbolos . J P D * +; salto final opcional
     * @return listado nuevo; no comparte objetos con otras cargas
     * @throws IllegalArgumentException si el texto o algun tablero no es valido
     */
    public static IListado<Nivel> cargarNiveles(String texto) {
        if (texto == null || texto.isBlank()) {
            throw new IllegalArgumentException("No hay niveles para cargar.");
        }
        texto = texto.replace("\r\n", "\n");
        if (!texto.endsWith("\n")) {
            texto += "\n";
        }
        IListado<Nivel> niveles = new ListadoNiveles();
        int inicio = 0;
        while (inicio < texto.length()) {
            int separador = texto.indexOf("\n---\n", inicio);
            int fin = separador == -1 ? texto.length() : separador + 1;
            niveles.incluir(cargarNivel(texto.substring(inicio, fin)));
            inicio = separador == -1 ? texto.length() : separador + 5;
            if (separador != -1 && inicio == texto.length()) {
                throw new IllegalArgumentException("Falta un nivel despues del separador.");
            }
        }
        return niveles;
    }

    private static Nivel cargarNivel(String texto) {
        int saltoTitulo = texto.indexOf('\n');
        String titulo = texto.substring(0, saltoTitulo).trim();
        int inicioFilas = saltoTitulo + 1;
        int finPrimeraFila = texto.indexOf('\n', inicioFilas);
        if (titulo.isEmpty() || titulo.equals("---") || finPrimeraFila == -1 || finPrimeraFila == inicioFilas) {
            throw new IllegalArgumentException("Cada nivel necesita titulo y tablero.");
        }
        int anchura = finPrimeraFila - inicioFilas;
        int altura = 0;
        Personaje personaje = null;
        int inicioFila = inicioFilas;
        // Primera pasada: valida el rectangulo y localiza al unico personaje.
        while (inicioFila < texto.length()) {
            int finFila = texto.indexOf('\n', inicioFila);
            if (finFila - inicioFila != anchura) {
                throw new IllegalArgumentException("Todas las filas deben tener la misma anchura.");
            }
            for (int x = 0; x < anchura; x++) {
                char simbolo = texto.charAt(inicioFila + x);
                if (".JPD*+".indexOf(simbolo) == -1) {
                    throw new IllegalArgumentException("Simbolo desconocido: " + simbolo);
                }
                if (simbolo == 'J' || simbolo == '+') {
                    if (personaje != null) {
                        throw new IllegalArgumentException("Solo puede haber un personaje.");
                    }
                    personaje = new Personaje(x, altura);
                }
            }
            altura++;
            inicioFila = finFila + 1;
        }
        if (personaje == null) {
            throw new IllegalArgumentException("Falta el personaje.");
        }
        Nivel nivel = new Nivel(titulo, anchura, altura, personaje);
        inicioFila = inicioFilas;
        for (int y = 0; y < altura; y++) {
            for (int x = 0; x < anchura; x++) {
                char simbolo = texto.charAt(inicioFila + x);
                if (simbolo == 'P' || simbolo == '*') {
                    nivel.incluirPiedra(new Piedra(x, y));
                }
                if (simbolo == 'D' || simbolo == '*' || simbolo == '+') {
                    nivel.incluirDestino(new Destino(x, y));
                }
            }
            inicioFila = texto.indexOf('\n', inicioFila) + 1;
        }
        nivel.validarConfiguracion();
        return nivel;
    }

    /**
     * Genera un identificador visual, no necesariamente unico.
     * @return numero aleatorio entre 1000 y 9999, ambos incluidos
     */
    public static int generarCodigo() {
        Random generador = new Random();
        return generador.nextInt(9000) + 1000;
    }

    /**
     * Calcula un porcentaje sin division entera.
     * @param parte cantidad entre cero y total
     * @param total cantidad positiva
     * @return porcentaje decimal entre cero y cien
     * @throws IllegalArgumentException si las cantidades no son validas
     */
    public static double calcularPorcentaje(int parte, int total) {
        if (total <= 0 || parte < 0 || parte > total) {
            throw new IllegalArgumentException("Cantidades no validas para un porcentaje.");
        }
        return parte * 100.0 / total;
    }
}
