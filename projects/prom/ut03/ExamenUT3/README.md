# Examen UT3 - Proyecto base

Completa los 15 TODO siguiendo el enunciado incluido en el ZIP. Orden de trabajo:
GUI (01-02), Personaje (11-16), Mapa (21-24), Main (31-33).

Ejecuta app.Main. Elige el mapa 1, 2 o 3. Con 0 se sale de la seleccion inicial
o del juego. La base compila, pero requiere completar los TODO para funcionar.

Mapa contiene al personaje y las reglas de movimiento. Los tres escenarios
de 8 x 14 estan definidos en util.Conf.
obtenerCasilla devuelve un String, o null para coordenadas inexistentes.
Cada simbolo se dibuja entre corchetes: [ ], [+], [P], [#], [T] y [S].

La opcion 1 utiliza un unico botiquin; no solicita cantidades. El control de
entrada numerica se realiza al elegir el mapa, mediante NumberFormatException.
Reiniciar restaura el mismo escenario y personaje. La opcion 3 solo muestra el menu.

No se incluye una solucion en esta version. El enunciado del repositorio esta en
questions/prom/ut03/examen-practico/enunciado.html; el ZIP incluye su propia copia.
