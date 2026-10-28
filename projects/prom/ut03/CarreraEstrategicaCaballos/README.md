# CarreraEstrategicaCaballos

Proyecto base del ejercicio 3.28 de PROM UT3. Incluye dos versiones pendientes
de la misma carrera, sin solucion. El JDK del curso es el 25.

En IntelliJ, ejecuta con el triangulo verde el metodo main de:

- edu.masanz.da.ut3.app.MainConsola: version original por teclado y consola.
- edu.masanz.da.ut3.app.MainJavaFX: version con una interfaz grafica proporcionada.

El paquete base es edu.masanz.da.ut3. GUI esta en el subpaquete gui.
Ambas ejecuciones son independientes y deben aplicar exactamente las mismas reglas.
No se crean clases Caballo o Carrera, metodos auxiliares, arrays ni colecciones.
Todo el codigo del alumnado se escribe en los cuerpos de los dos main,
con variables locales, constantes, condicionales y un bucle for.

## Tareas pendientes

- MainJavaFX: TODO 01-05.
- MainConsola: TODO 11-15.

Cada TODO coincide literalmente con un punto del enunciado HTML.
GUI esta terminada y no contiene tareas pendientes. La base grafica abre
una ventana con dos carriles; no hay carrera hasta implementar los TODOs.
La base de consola termina sin mostrar nada hasta completarla.

## Reglas

Dos participantes, potencia inicial 100 y distancia inicial cero.
La carrera dura exactamente 20 rondas, no 20 segundos reales.
Cada ronda representa un segundo simulado.

1. Maxima: avanza 10 metros y consume 15 de potencia.
2. Normal: avanza 7 y consume 10.
3. Minima: avanza 3 y consume 5.
4. Descansar: no avanza y recupera 10, sin superar 100.

Si falta potencia para la opcion elegida, se aplica minima.
Su consumo nunca deja la potencia por debajo de cero.
Con potencia cero tambien se puede avanzar a minima, segun la regla original.
Se compara la distancia al terminar las 20 rondas y se contempla el empate.
Mostrar siempre la opcion realmente aplicada, no solo la solicitada.

## Uso de GUI

Las llamadas de arranque, cancelacion y finalizacion ya estan preparadas.
Conserva ese codigo y completa solo los TODOs dentro del try.
No tienes que crear eventos, temporizadores, hilos ni bucles de interfaz.

- GUI.pedirOpcion(nombre): solicita una estrategia y devuelve un entero 1-4.
- GUI.mostrarRonda(numero): muestra la ronda actual; cero es el estado inicial.
- GUI.mostrarParticipante(numero, nombre, potencia, distancia, accion):
  actualiza los datos y el cuadrado del participante 1 o 2.
- GUI.mostrarResultado(mensaje): muestra el resultado decidido en main.

Solicita las dos opciones de una ronda antes de calcular sus resultados.
Actualiza los datos de ambos despues de aplicar sus reglas.
Las posiciones se muestran en una escala fija de 0 a 200 metros,
el maximo posible en 20 rondas a velocidad maxima.
No hay una meta que termine anticipadamente la carrera.
La ventana conserva el resultado hasta que se cierra.
Cancelar la seleccion o cerrar la ventana interrumpe la version grafica;
esa situacion se gestiona en el codigo proporcionado.

Para la version de consola, usa Scanner y muestra la misma informacion.
La version grafica no debe solicitar datos mediante Scanner.
Repite la misma secuencia de estrategias en ambas para comparar resultados.

Enunciado completo:
https://jsotera.github.io/moodle/prom/ut03-ejercicios.html
