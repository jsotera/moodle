# EmpujaPiedras · Base del alumnado

Proyecto integrador de PROM UT1–UT4. Implementa un juego de empuje de piedras
con una lógica común para consola y JavaFX.

## Abrir y ejecutar

1. Descomprime la carpeta completa y abre su `pom.xml` con IntelliJ IDEA.
2. Configura JDK 17 en el proyecto y en el ejecutor Maven.
3. Espera a que Maven resuelva las dependencias. La primera vez necesita Internet.
4. Abre el paquete `edu.masanz.da.ut4.app` y elige una de las dos clases:
   `MainConsola` para ejecutar en la consola de IntelliJ o `MainJavaFX` para abrir
   la ventana gráfica. Pulsa el triángulo verde junto a `main`, o haz clic derecho
   sobre la clase y selecciona **Run**. Para depurar, utiliza **Debug**.

Ambas clases ejecutan el mismo modelo. Usa `MainJavaFX`, no `AplicacionJavaFX`
directamente. IntelliJ debe haber importado las dependencias Maven del proyecto;
no necesitas descargar un SDK de JavaFX manualmente ni copiar JAR.

Como alternativa, desde una terminal en la carpeta del proyecto:

```powershell
.\mvnw.cmd compile javafx:run
.\mvnw.cmd compile exec:java
```

En Linux o macOS utiliza `sh mvnw` en lugar de `.\mvnw.cmd`. Si tienes Maven
instalado puedes usar `mvn`. También puedes ejecutar los objetivos desde la ventana
Maven de IntelliJ. No necesitas descargar un SDK de JavaFX manualmente ni copiar JAR.

Los puntos de entrada son `app.MainJavaFX` y `app.MainConsola`. Al ejecutarlos desde
IntelliJ, utiliza el classpath Maven del proyecto. Usa el lanzador `MainJavaFX`,
no la clase `AplicacionJavaFX` directamente.

## Qué verás al principio

La base compila, pero los métodos pendientes lanzan `UnsupportedOperationException`.
Los lanzadores detectan ese aviso al construir la partida y muestran una vista
previa estática de los tres escenarios. Las piedras no se mueven en esa vista:
no contiene la solución del juego ni la implementación de los listados.

Cuando completes el modelo, vuelve a ejecutar. En JavaFX también puedes pulsar
«Cargar mi implementación»; se construirá una partida nueva. En consola, M o la
opción 3 hacen lo mismo. `--demo` permite activar expresamente la vista previa.

## Tu trabajo

- `modelo`: constructores, consultas y comportamiento de Personaje, Piedra,
  Destino, Nivel y Juego.
- `listados`: `ListadoPiedras`, `ListadoDestinos` y `ListadoNiveles`, que implementan
  el contrato común `IListado<T>` con su tipo concreto. Los nodos `NodoPiedra`,
  `NodoDestino` y `NodoNivel` ya están definidos.
- `utilidades.Utilidades`: carga de niveles desde texto, generación de código
  aleatorio y porcentaje decimal. Es una clase normal con métodos estáticos,
  sin `final` ni constructor privado.
- Una clase de comprobaciones propia y documentación de tus decisiones.

Los campos declarados sirven de orientación. Puedes añadir miembros privados,
respetando los contratos públicos. Retira el `throw` de aviso al implementar cada
operación. Los métodos privados pendientes también forman parte del trabajo.

## Infraestructura proporcionada

`api.Partida`, la interfaz `IListado<T>` y los tres nodos, `configuracion`,
`demo`, `vista`, `app`, Maven Wrapper y los tests son material
suministrado. Las vistas contienen código de JavaFX que no necesitas implementar.

El modelo no importa JavaFX ni Scanner, no imprime y no espera acciones del teclado.
No cambies las vistas para corregir una regla: ambas utilizan tu implementación
del contrato Partida.

## Controles

W, A, S y D desplazan arriba, izquierda, abajo y derecha. R reinicia y N solicita
avanzar; solo se permite tras resolver el nivel actual. En consola, Q sale.
El menú numérico admite 0 salir, 1 reiniciar, 2 avanzar y 3 cargar una partida nueva.
Los datos iniciales están en `Constantes.NIVELES`; no se solicitan dimensiones por teclado.

## Un contrato y tres listados concretos

`T` representa el tipo de elemento en la interfaz. Cada implementación concreta
fija ese tipo y utiliza su propio nodo, sin declarar parámetros genéricos:

```java
IListado<Piedra> piedras = new ListadoPiedras();
IListado<Destino> destinos = new ListadoDestinos();
IListado<Nivel> niveles = new ListadoNiveles();
```

`ListadoPiedras implements IListado<Piedra>` enlaza objetos `NodoPiedra`;
los otros listados hacen lo mismo con sus respectivos tipos. Debes implementar
las tres clases. Cada instancia tiene sus propios nodos.
No uses tipos genéricos sin su parámetro ni sustituyas `T` por `Object`.

## Niveles definidos como texto

`configuracion.Constantes` contiene un único String: título, filas del mapa y
una línea `---` entre niveles. Los símbolos son `.` vacío, `J` personaje,
`P` piedra, `D` destino, `*` piedra sobre destino y `+` personaje sobre destino.

```text
Primer empuje
......
......
.JP.D.
......
......
```

Implementa `Utilidades.cargarNiveles()` para leer la constante y
`Utilidades.cargarNiveles(String texto)` para interpretar el formato utilizando
`indexOf`, `substring`, `charAt` y bucles, sin `split`, arrays ni colecciones.
Deduce dimensiones y posiciones; no escribas coordenadas fijas en el cargador.
Construye el personaje antes de crear el nivel y añade después piedras y destinos.
Cada llamada debe devolver objetos nuevos e independientes.

Admite saltos LF y CRLF, con o sin salto final. Rechaza títulos o bloques vacíos,
filas desiguales, símbolos desconocidos, personajes ausentes o repetidos y
cantidades de piedras y destinos distintas o no positivas. No admitas un separador
antes del primer nivel ni después del último. La vista previa solo muestra el
texto proporcionado: no construye entidades ni sustituye este trabajo.

## Editar o añadir niveles

Abre `src/main/java/edu/masanz/da/ut4/configuracion/Constantes.java` y edita
`NIVELES`. Cambia los símbolos para recolocar objetos o el título para renombrar
el nivel. Usa puntos, no espacios, para las casillas vacías. Todas las filas de
un tablero deben tener la misma longitud; el número de filas determina su altura.

Para añadir un nivel, retira el punto y coma de la última línea actual y continúa
la concatenación con un separador, un título y las filas nuevas. Por ejemplo:

```java
            + "---\n"
            + "Mi nuevo nivel\n"
            + "......\n"
            + ".JP.D.\n"
            + "......\n";
```

Conserva `\n` al final de cada línea y deja un único punto y coma al final de toda
la constante. No pongas líneas vacías ni un separador tras el último nivel.
Cada mapa necesita un único personaje (`J` o `+`) y la misma cantidad positiva
de piedras y destinos; `*` cuenta como piedra y destino, `+` como personaje y
destino. Reordenar los bloques cambia el orden de juego.

Guarda y vuelve a ejecutar `MainConsola` o `MainJavaFX`. Una vez implementado el
cargador, no necesitas modificar coordenadas, dimensiones ni contadores de niveles
en otras clases. Comprueba también que el mapa sea resoluble: la validación del
formato no garantiza que se pueda completar.

## Orden recomendado

1. Entidades y sus validaciones.
2. Los tres listados: vacío, inserción, consulta, eliminación y sustitución.
3. Utilidades estáticas y consultas del nivel.
4. Carga y validación de niveles desde el String de constantes.
5. Movimiento libre, después empujes y bloqueos.
6. Reinicio, victoria y progresión en Juego.
7. Comparación de ambas vistas con la misma secuencia de acciones.

## Pruebas

```powershell
.\mvnw.cmd test
```

Los tests JUnit comprueban el contrato final. **Fallarán mientras el código esté
pendiente**; no es un fallo del entorno. No debes modificarlos para aceptar
resultados incorrectos. Añade también pruebas propias y manuales.

Las aserciones están activadas durante `test`; en ejecuciones del IDE añade `-ea`
como opción de la máquina virtual si quieres comprobar tus `assert`.

No uses arrays, matrices, colecciones de Java ni almacenamiento externo.
Solo la interfaz declara el parámetro genérico `T`; listados y nodos son concretos.
La excepción es la firma estándar `main(String[] args)` ya proporcionada.
Los índices del listado comienzan en cero; el número de nivel visible, en uno.
Todos los archivos están en UTF-8.

No se crean excepciones propias: utiliza `IndexOutOfBoundsException` para índices
inexistentes y `IllegalArgumentException` para argumentos no válidos. La base usa
`UnsupportedOperationException` para señalar métodos pendientes; retira ese aviso
cuando los implementes. La consola captura `NumberFormatException` al convertir
texto a número. No provoques errores accediendo a `null` para validar índices.

Documentación de la infraestructura: [OpenJFX con Maven](https://openjfx.io/openjfx-docs/#maven).
