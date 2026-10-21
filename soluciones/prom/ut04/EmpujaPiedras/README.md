# EmpujaPiedras · Solución del profesorado

Proyecto integrador de PROM UT1–UT4. Esta carpeta contiene la implementación
completa de referencia. Se publica en la carpeta `soluciones` del repositorio,
pero no forma parte del ZIP del alumnado.

## Ejecución

Requiere JDK 17 o posterior compatible con JavaFX 17. El proyecto usa UTF-8.
JavaFX y sus bibliotecas nativas se resuelven mediante Maven, sin instalar un SDK
de JavaFX manualmente. La primera ejecución necesita conexión a Internet.

```powershell
.\mvnw.cmd compile javafx:run
.\mvnw.cmd compile exec:java
.\mvnw.cmd test
```

En Linux o macOS: `sh mvnw compile javafx:run`, `sh mvnw compile exec:java`
y `sh mvnw test`. Si ya tienes Maven, puedes sustituir el wrapper por `mvn`.
También puedes abrir `pom.xml` con IntelliJ y ejecutar los objetivos desde Maven.

Desde IntelliJ, abre `edu.masanz.da.ut4.app.MainConsola` para jugar en la consola
del IDE o `edu.masanz.da.ut4.app.MainJavaFX` para abrir la ventana gráfica.
Pulsa el triángulo verde junto a `main`, o clic derecho sobre la clase y **Run**;
utiliza **Debug** para depurar. Ejecuta el lanzador `MainJavaFX`, no
`AplicacionJavaFX` directamente, con las dependencias Maven importadas.

`MainJavaFX` y `MainConsola` son los puntos de entrada. El argumento `--demo`
activa una vista previa estática, que no es una implementación alternativa del juego.
En JavaFX puedes recorrer sus tres ejemplos y cargar el modelo con el botón
«Cargar mi implementación». En consola, la acción M carga una partida nueva.

## Estructura

- `api`: contrato `Partida` utilizado por ambas vistas.
- `modelo`: personaje, piedra, destino, nivel y juego; sin dependencias de las vistas.
- `listados`: un contrato `IListado<T>` y tres implementaciones concretas:
  `ListadoPiedras`, `ListadoDestinos` y `ListadoNiveles`, con `NodoPiedra`,
  `NodoDestino` y `NodoNivel` respectivamente. Solo la interfaz declara `T`.
- `configuracion`: `Constantes.NIVELES`, un String con títulos y mapas de texto.
- `utilidades`: métodos estáticos de carga, azar y porcentaje; clase no final,
  sin constructor privado.
- `vista.consola` y `vista.javafx`: implementaciones suministradas al alumnado.
- `demo`: vista previa estática independiente del modelo pendiente.

No hay clases de excepción propias. Los índices incorrectos provocan
`IndexOutOfBoundsException`; los argumentos inválidos, `IllegalArgumentException`.
Los métodos pendientes de la base usan `UnsupportedOperationException`, que
las vistas detectan para mostrar el aviso o la vista previa.

Los objetos del juego no tienen enlaces de lista. Cada nodo guarda una referencia
al objeto y otra al siguiente nodo. Una misma referencia puede estar en listados
distintos; no se admite dos veces dentro del mismo listado.

## Comprobaciones

Las pruebas JUnit verifican el contrato genérico con piedras, destinos y niveles, identidad de referencias,
excepciones, bloqueos atómicos, destinos bajo objetos, reinicio, independencia
de partidas, contador estático y resolución de los tres niveles. Las aserciones
del modelo están activadas al ejecutar las pruebas.

`Utilidades.cargarNiveles()` delega en `cargarNiveles(String)` con el texto de
constantes. Cada bloque contiene título y filas de igual anchura; `---` separa
bloques. El cargador usa `indexOf`, `substring`, `charAt` y bucles, sin arrays,
`split` ni colecciones. Deduce las dimensiones y las coordenadas, interpreta
`. J P D * +`, valida cada nivel y devuelve objetos nuevos en cada llamada.
Admite LF, CRLF y salto final opcional. Los tests incluyen símbolos superpuestos,
formatos incorrectos y cargas independientes. La vista previa solo dibuja el
texto: no contiene la conversión al modelo ni reglas de juego.

## Editar o ampliar los niveles

Modifica `src/main/java/edu/masanz/da/ut4/configuracion/Constantes.java`.
En `NIVELES`, cada bloque contiene el título y un tablero rectangular. Cambia
los símbolos para recolocar objetos y añade o elimina filas o columnas para
ajustar las dimensiones. Usa `.` para las casillas vacías, sin espacios.

Para añadir otro nivel, retira el punto y coma de la última línea y continúa:

```java
            + "---\n"
            + "Mi nuevo nivel\n"
            + "......\n"
            + ".JP.D.\n"
            + "......\n";
```

Deja `\n` tras cada línea y el punto y coma al final de toda la constante.
No incluyas bloques vacíos ni un separador al final. Cada nivel debe tener un
único personaje (`J` o `+`) y cantidades positivas e iguales de piedras y destinos,
contando las superposiciones `*` y `+`. El orden de los bloques es el de juego.
Guarda y vuelve a ejecutar `MainConsola` o `MainJavaFX`; el cargador deduce las
dimensiones y la cantidad de niveles. Comprueba manualmente que sea resoluble.
Los tests del catálogo original esperan los tres escenarios suministrados:
conserva esos datos para ejecutar esas pruebas o añade pruebas del nuevo catálogo.

Recorridos de referencia (W arriba, A izquierda, S abajo y D derecha):

1. Nivel 1: `DD`.
2. Nivel 2: `DDDASD`.
3. Nivel 3: `DDDDAAASDDDASD`.

Las secuencias sirven para verificar que los niveles se pueden resolver;
no se exige que sean soluciones óptimas. Avanzar entre niveles requiere N.

No incluye obstáculos interiores, historial, deshacer, enlaces anteriores
ni listas circulares.
