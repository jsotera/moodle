# Examen UT3

- `enunciado.html`: pagina completa para abrir en el navegador o imprimir.
- `enunciado-fragmento.html`: contenido limpio para pegar en Moodle.
- `prom-ut03-examen-base.zip`: proyecto del alumnado, con enunciado incluido.
- `soluciones/prom-ut03-examen-resuelto.zip`: proyecto resuelto, separado de la base.
- Fuentes base: `projects/prom/ut03/ExamenUT3`.
- Fuentes resueltas: `soluciones/prom/ut03/ExamenUT3`.

El enunciado solo enlaza a la base del alumnado. No se incorpora el examen al
indice publico ni se generan libros MBZ. La carpeta de soluciones no es una
restriccion de acceso: si se publica en un repositorio publico, sera accesible.

Regenerar la pagina y ambos ZIP, comprobando la coincidencia literal de los TODO
y sus 10 puntos:

```powershell
python -X utf8 scripts/build-prom-ut03-exam.py
```

El enlace de descarga del fragmento Moodle es absoluto para GitHub Pages. En la
pagina completa es relativo y funciona junto al ZIP tanto en local como publicado.

Los tres mapas de 8 x 14 estan definidos en util.Conf y se eligen por consola al
comenzar. Mapa integra el personaje y las reglas del juego. Todas las casillas son
String; obtenerCasilla devuelve null fuera de limites. contiene es un TODO.
usarBotiquin consume una sola unidad. La conversion numerica y su captura de
NumberFormatException se trabajan al seleccionar el escenario.

Comprobaciones del material, con JAVA_HOME apuntando al JDK 25:

```powershell
python -B -X utf8 scripts/test_prom_ut03_exam.py
```

Las comprobaciones cubren ambas versiones y verifican los tres escenarios,
consultas invalidas sin excepcion, recogida, curacion, movimiento, reinicio,
victoria, derrota, entrada incorrecta, contenido de ambos ZIP y UTF-8.

## Revisión del enunciado: 9 de noviembre de 2026

El enunciado recoge la nueva distribución de tareas: GUI 01–02, Personaje 11–13,
Mapa 21–26 y Main 31. Son 12 TODO y 10 puntos: GUI 1, Personaje 1,4, Mapa 6,2 y Main 1,4.
Se han actualizado las firmas, los métodos ya suministrados, los contratos y las
pantallas, con colores en las casillas y la leyenda y una tabla de estado.
Las explicaciones no prescriben estructuras de control ni algoritmos.

Los proyectos base y resuelto no se han modificado por parte del agente. Durante
la revisión el usuario ha incorporado a la base `Mapa.gestionarAccion(String accion)`
(TODO 26), con lo que las 12 tareas ya tienen correspondencia literal.
Los ZIP se actualizan a partir de esas fuentes e incluyen el nuevo enunciado;
no se editan sus archivos Java, POM ni README.

Para actualizar únicamente la página, sin empaquetar proyectos:

```powershell
python -B -X utf8 scripts/build-prom-ut03-exam.py --statement-only
```

Diferencias observadas, sin corregir los proyectos:

- `pedirMapa()` captura la conversión fallida y devuelve 0: escribir texto termina
  la selección. El Javadoc de `main` todavía dice que se repite ante un error.
  El enunciado y el ejemplo reflejan el comportamiento actual de la solución.
- El Javadoc de las lecturas contempla fin de entrada; la solución utiliza
  `nextLine()` sin comprobarlo, por lo que EOF provoca una excepción.
- `Mapa` ya presenta el mapa y gestiona acciones mediante GUI, aunque su comentario
  de clase todavía dice que no tiene entrada ni salida de consola.
- El Javadoc de `moverJugador` en la solución aún habla de códigos de resultado
  y efectos del terreno; el método devuelve boolean y los efectos están separados.
- El README de la base todavía describe 15 TODO y la distribución anterior.
- La suite `scripts/test_prom_ut03_exam.py` conserva la API y los contratos
  anteriores (mover con códigos, 15 TODO, salida sin colores y EOF controlado).
  Sus resultados anteriores no validan esta revisión; requiere adaptación cuando
  se cierre la correspondencia entre base y solución.

La revisión del enunciado comprueba la correspondencia literal de las 12 tareas
de la base, el total de puntos y las pantallas reales
de la solución compilada en una carpeta temporal. No regenera el sitio ni MBZ.
