# EmpujaPiedras — Proyecto base

Proyecto de PROM UT4. Abre el proyecto en IntelliJ IDEA utilizando JDK 25.

## Clases proporcionadas completas

- `edu.masanz.da.ut4.vista.javafx.AplicacionJavaFX`
- `edu.masanz.da.ut4.vista.javafx.VistaTablero`
- `edu.masanz.da.ut4.app.MainJavaFX`
- `edu.masanz.da.ut4.conf.Const`

Estas cuatro clases se conservan tal como las ha proporcionado el docente.

## Trabajo del alumnado

Implementa `GUI`, `Personaje`, `Nivel`, `Util` y `MainConsola`, siguiendo
`enunciado.html`. Se incluyen sus paquetes, imports y firmas públicas; debes
declarar los atributos necesarios e implementar constructores, accesores y
resto de métodos.

La base compila con JDK 25. Los métodos con retorno incluyen únicamente el
valor provisional correspondiente: `0`, `false` o `null`. Los constructores y
los métodos `void` permanecen vacíos. Estos valores permiten compilar, pero no
implementan el funcionamiento del juego: debes sustituirlos por la lógica
correspondiente antes de utilizar la aplicación.

Conserva las firmas que utiliza la interfaz gráfica. En `Personaje`, por ejemplo,
los accesores y el constructor también deben implementarse.

## Ejecución

Cuando las clases estén implementadas, ejecuta el método `main` de `MainConsola`
para la versión de texto o el de `MainJavaFX` para la interfaz gráfica desde el
triángulo verde de IntelliJ IDEA.

La configuración mantiene las dependencias JavaFX del proyecto de referencia.
No se incluyen las clases, listados, vistas previas ni pruebas de la versión
anterior de EmpujaPiedras.
