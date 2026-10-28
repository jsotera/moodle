# ArbolGenealogico

Base Maven del ejercicio 3.48 de PROM UT3. No incluye soluciones.

Abre pom.xml con IntelliJ y configura JDK 25 en el proyecto, el importador
y el ejecutor Maven. En edu.masanz.da.ut3.app, ejecuta con el triangulo verde:

- MainRandom: menu para generar y consultar arboles aleatorios.
- MainConcreto: familia definida por ti directamente en su metodo main.

Ambas clases utilizan el mismo modelo y los mismos metodos de dibujo.
No se requieren argumentos de ejecucion ni caracteristicas preview.

## Orden de trabajo

- gui.GUI: TODO 01-02.
- modelo.Persona: TODO 11.
- modelo.ArbolGenealogico: TODO 21-29.
- app.MainRandom: TODO 31-34.
- app.MainConcreto: TODO 41-44.

Cada TODO coincide literalmente con un punto individual del enunciado HTML.
Las explicaciones adicionales estan en ese punto y en los contratos Javadoc.
Completa los cuerpos sin cambiar firmas ni crear otras clases o metodos.
Utiliza referencias, condicionales, bucles, String, Random y Math si lo necesitas.
No uses arrays, colecciones ni recursion.

Los constructores directos, accesores y toString de Persona estan implementados.
Los cuerpos pendientes devuelven 0, false o null segun el tipo; no son soluciones.
El proyecto compila y ambos main terminan sin mostrar nada hasta completarlos.

## MainRandom: menu y estado

1. Elegir profundidad del arbol
2. Mostrar arbol
0. Salir

El arbol empieza vacio. La opcion 1 solicita un entero y genera un nuevo arbol
si esta entre 1 y 5, incluidos. Fuera de ese rango, conserva todo el arbol anterior
y vuelve al menu con un aviso. Una entrada no numerica se solicita de nuevo.
La opcion 2 muestra el mismo arbol sin regenerar nombres ni personas.
Antes de la primera generacion, informa de que no hay arbol.
La opcion 0 muestra la despedida y termina.
Si termina la entrada, pedirEntero devuelve 0: una profundidad rechazada permite
volver al menu y la siguiente lectura de opcion finaliza la aplicacion.

GUI solo tiene metodos estaticos y un Scanner estatico. No conoce los modelos.
Cada main consulta el modelo y pasa a GUI.mostrarMensaje los textos ya preparados.
El modelo no imprime ni lee de la consola.

## MainConcreto: tu propia familia

Escribe las personas y relaciones en el main; no hay menu ni generacion al azar.
Puedes usar nombres reales o inventados, incluidos nombres con espacios.
Los nombres no deben ser nulos, estar en blanco ni contener saltos o tabuladores.

Persona(nombre) deja ambos progenitores a null.
Persona(nombre, padre, madre) conserva las referencias que le pases.
Los dos constructores, getters, setters de padre y madre y toString estan dados.
Puedes usar setPadre y setMadre despues de crear las personas.
No se crean copias: un progenitor es la misma instancia que declaraste.

Prepara el gestor con new ArbolGenealogico(personaPrincipal, profundidad):
la persona principal debe ser no nula y la profundidad debe estar entre 1 y 5.
Este constructor conserva las referencias y no genera nombres ni personas.
No llames a generar en esta ejecucion, porque sustituiria tu familia.
Muestra sus datos y obtenerRepresentacion mediante GUI.mostrarMensaje.
Al terminar el dibujo, finaliza la ejecucion.

Las ramas desconocidas se dejan a null. El dibujo reserva sus huecos sin
inventar etiquetas ni conexiones. No crees ciclos ni compartas ascendientes
entre dos ramas. Solo se cuentan y muestran las personas dentro de la
profundidad elegida; las referencias mas antiguas no se modifican.

## Personas y profundidad

Cada Persona tiene un nombre y referencias padre y madre.
La raiz es la persona principal (generacion 0), que se dibuja abajo.
Profundidad 1: solo la raiz. Profundidad 2: raiz y dos progenitores.
Profundidad 3: raiz, dos progenitores y cuatro abuelos.

En cada generacion el padre va a la izquierda y la madre a la derecha.
Todos los nodos generados al azar son objetos distintos. Nombres coincidentes no
significan referencias iguales. La generacion mas antigua tiene padre y madre
a null en el modo aleatorio. El dibujo es un modelo simplificado, sin antepasados compartidos.
Las referencias permiten continuar la ascendencia sin un numero fijo de campos,
pero esta actividad limita el dibujo a cinco generaciones.

En MainRandom, genera cada letra de forma independiente con Random.nextInt y convierte el
entero a char. A y Z corresponden a 65 y 90; ambos limites estan incluidos.
El nombre tiene 5 caracteres (A.B.C); la etiqueta, 7 ([A.B.C]).
No elijas los nombres aleatorios de un catalogo ni sustituyas el arbol por texto almacenado.
MainConcreto conserva los nombres proporcionados, sin generar iniciales.

## Dibujo

Cada celda tiene una anchura comun impar, como minimo siete y suficiente
para la etiqueta mas larga de las personas visibles. Los corchetes cuentan.
Si la longitud maxima es par, usa una columna mas. Un arbol vacio devuelve cero.
Centra las etiquetas; si sobra un espacio impar de relleno, va a la derecha.
No recortes los nombres. ANCHO_MINIMO_CELDA vale 7.

La fila superior separa las celdas con tres espacios.
Cada celda descendiente queda centrada entre sus dos posiciones de progenitores.
Los huecos se reservan aunque no exista la persona; no compactes las ramas.
Entre filas de personas hay tres filas de conexiones:
barras verticales de los progenitores, guiones que unen cada pareja
y barras verticales de los descendientes.
obtenerLineaVertical(generacion, false) conecta hacia el descendiente.
obtenerLineaVertical(generacion, true) conecta hacia los progenitores visibles.
No dibujes barras en posiciones vacias ni conexiones hacia personas desconocidas.
Si solo hay un progenitor conocido, los guiones unen su centro con el del
descendiente. Si no hay ninguno, no hay union ni barra sobre el descendiente.
El dibujo usa espacios normales, corchetes, los nombres, | y -.
No uses tabuladores. Construye las filas calculando los espacios con bucles.

Cada fila tiene la misma anchura, incluidos los espacios finales.
obtenerRepresentacion separa filas con \n, sin un salto al final.
Con profundidad 1, la representacion tiene una unica etiqueta y ninguna conexion.
Con profundidad 3 y las iniciales aleatorias, las columnas de inicio de las etiquetas son:
generacion 2: 0, 10, 20, 30; generacion 1: 5, 25; generacion 0: 15.
La anchura es 37 caracteres. Las columnas se cuentan desde cero.

Ejemplo aleatorio de profundidad 3 (las iniciales son orientativas):

```text
[J.J.S]   [A.M.P]   [G.G.S]   [U.L.M]
   |         |         |         |
   -----------         -----------
        |                   |
     [A.J.P]             [K.K.P]
        |                   |
        ---------------------
                  |
               [E.L.M]
```

## Comprobaciones

- Mostrar antes de generar: aviso, sin consultar referencias nulas.
- Arbol aleatorio completo, profundidades 1-5: 1, 3, 7, 15 y 31 personas.
- Con iniciales: anchuras 7, 17, 37, 77 y 157 columnas.
- El dibujo tiene 1, 5, 9, 13 o 17 filas respectivamente.
- Profundidades 0, negativas o mayores que 5: rechazo sin cambios.
- Mostrar dos veces no cambia las iniciales ni la identidad de las personas.
- Generar otra vez sustituye todas las referencias; un nombre puede repetirse.
- Indices invalidos y caminos aun no creados devuelven null en obtenerPersona.
- Todas las etiquetas quedan alineadas con sus conexiones, sin tabs.
- Prueba con una consola monoespaciada ancha; empieza por profundidades 1-3.
- Familia incompleta: cuenta solo las referencias visibles no nulas.
- Con profundidad 3 y solo raiz y madre, hay 2 personas y una sola conexion.
- Los nombres largos se ven completos; etiqueta de longitud 8 exige celda de 9.
- Dibujar la familia no genera iniciales ni modifica las personas.

Enunciado completo:
https://jsotera.github.io/moodle/prom/ut03-ejercicios.html
