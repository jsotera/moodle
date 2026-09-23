window.COURSE_UNITS = [
  {
    "id": "ut01",
    "number": "01",
    "title": "Introducción a la programación y Java",
    "theoryId": "ut01-teoria",
    "practiceId": "ut01-ejercicios",
    "theoryUrl": "ut01-teoria.html",
    "practiceUrl": "ut01-ejercicios.html"
  },
  {
    "id": "ut02",
    "number": "02",
    "title": "Variables, tipos de datos y constantes",
    "theoryId": "ut02-teoria",
    "practiceId": "ut02-ejercicios",
    "theoryUrl": "ut02-teoria.html",
    "practiceUrl": "ut02-ejercicios.html"
  },
  {
    "id": "ut03",
    "number": "03",
    "title": "Operadores y expresiones",
    "theoryId": "ut03-teoria",
    "practiceId": "ut03-ejercicios",
    "theoryUrl": "ut03-teoria.html",
    "practiceUrl": "ut03-ejercicios.html"
  },
  {
    "id": "ut04",
    "number": "04",
    "title": "Entrada y salida de datos",
    "theoryId": "ut04-teoria",
    "practiceId": "ut04-ejercicios",
    "theoryUrl": "ut04-teoria.html",
    "practiceUrl": "ut04-ejercicios.html"
  },
  {
    "id": "ut05",
    "number": "05",
    "title": "Estructuras condicionales",
    "theoryId": "ut05-teoria",
    "practiceId": "ut05-ejercicios",
    "theoryUrl": "ut05-teoria.html",
    "practiceUrl": "ut05-ejercicios.html"
  },
  {
    "id": "ut06",
    "number": "06",
    "title": "Bucles",
    "theoryId": "ut06-teoria",
    "practiceId": "ut06-ejercicios",
    "theoryUrl": "ut06-teoria.html",
    "practiceUrl": "ut06-ejercicios.html"
  },
  {
    "id": "ut07",
    "number": "07",
    "title": "Métodos y modularidad",
    "theoryId": "ut07-teoria",
    "practiceId": "ut07-ejercicios",
    "theoryUrl": "ut07-teoria.html",
    "practiceUrl": "ut07-ejercicios.html"
  },
  {
    "id": "ut08",
    "number": "08",
    "title": "Arrays y colecciones básicas",
    "theoryId": "ut08-teoria",
    "practiceId": "ut08-ejercicios",
    "theoryUrl": "ut08-teoria.html",
    "practiceUrl": "ut08-ejercicios.html"
  },
  {
    "id": "ut09",
    "number": "09",
    "title": "Programación orientada a objetos",
    "theoryId": "ut09-teoria",
    "practiceId": "ut09-ejercicios",
    "theoryUrl": "ut09-teoria.html",
    "practiceUrl": "ut09-ejercicios.html"
  },
  {
    "id": "ut10",
    "number": "10",
    "title": "Herencia, excepciones y ficheros",
    "theoryId": "ut10-teoria",
    "practiceId": "ut10-ejercicios",
    "theoryUrl": "ut10-teoria.html",
    "practiceUrl": "ut10-ejercicios.html"
  }
];

window.COURSE_PAGES = [
  {
    "id": "home",
    "title": "Inicio",
    "url": "index.html",
    "type": "Portada",
    "text": "Programación. Materiales de Programación para DAM y DAW."
  },
  {
    "id": "ut01-teoria",
    "unitId": "ut01",
    "section": "Teoría",
    "title": "UT 01. Teoría: Introducción a la programación y Java",
    "url": "ut01-teoria.html",
    "type": "Teoría",
    "text": "Introducción a la Programación y al Entorno Java Programar consiste en dar instrucciones a un ordenador para resolver un problema . Para hacerlo necesitamos pensar primero una solución paso a paso y, después, expresarla utilizando un lenguaje que el ordenador pueda procesar. ¿Qué es un algoritmo? Un algoritmo es una secuencia ordenada, clara y finita de pasos que permite resolver un problema o realizar una tarea. Utilizamos algoritmos continuamente, incluso fuera de la informática. Por ejemplo, una receta de cocina puede verse como un algoritmo: Preparar los ingredientes. Mezclarlos siguiendo un orden. Cocinar durante un tiempo determinado. Obtener el resultado final. En programación ocurre algo parecido. Antes de escribir código debemos pensar qué pasos debe seguir el ordenador para conseguir el resultado que buscamos. Idea importante: un algoritmo no depende necesariamente de un lenguaje de programación. Primero pensamos la solución; después decidimos cómo escribirla. ¿Qué es un lenguaje de programación? Un lenguaje de programación es un conjunto de reglas, símbolos y palabras que nos permite escribir instrucciones para un ordenador. Igual que los idiomas humanos tienen vocabulario y reglas gramaticales, los lenguajes de programación tienen: Sintaxis: indica cómo debemos escribir correctamente las instrucciones. Semántica: indica qué significa cada instrucción y qué efecto produce. Por ejemplo, un mismo algoritmo puede expresarse de formas diferentes dependiendo del lenguaje utilizado. En lenguaje natural podríamos decir: Mostrar el mensaje \"Hola mundo\" Mientras que en Java escribiríamos: System.out.println(\"Hola mundo\"); Niveles de los lenguajes de programación Los ordenadores trabajan internamente utilizando instrucciones muy simples. Según lo cerca que esté un lenguaje del hardware o de la forma de pensar de las personas, podemos hablar de diferentes niveles: Lenguaje máquina: utiliza instrucciones binarias formadas por 0 y 1 que el procesador puede ejecutar directamente. Lenguaje ensamblador: utiliza abreviaturas o mnemónicos que representan instrucciones concretas del procesador. Lenguajes de alto nivel: utilizan instrucciones mucho más fáciles de leer y escribir para una persona. Java, Python o C# son ejemplos de lenguajes de alto nivel. Nosotros trabajaremos principalmente con Java , un lenguaje de alto nivel diseñado para permitir el desarrollo de aplicaciones de una forma estructurada y portable. Del código Java al programa en ejecución Cuando escribimos un programa en Java, el ordenador no ejecuta directamente el texto que hemos escrito. Existe un proceso intermedio. El flujo simplificado es el siguiente: Escribimos el código fuente en un archivo con extensión .java . El compilador de Java, javac , comprueba el código y lo transforma en un formato intermedio llamado bytecode . El bytecode se almacena normalmente en archivos con extensión .class . La Máquina Virtual de Java (JVM) ejecuta ese bytecode. De forma resumida: Código fuente (.java) ↓ Compilador javac ↓ Bytecode (.class) ↓ Máquina Virtual de Java (JVM) ↓ Programa en ejecución ¿Por qué utilizar una máquina virtual? El bytecode puede ejecutarse en diferentes sistemas siempre que exista una JVM compatible. Esta idea está relacionada con una de las características más conocidas de Java: \"Write once, run anywhere\" . JVM, JRE y JDK En el ecosistema Java aparecen varios términos que conviene diferenciar: JVM (Java Virtual Machine): es la máquina virtual encargada de ejecutar el bytecode de Java. JRE (Java Runtime Environment): contiene los elementos necesarios para ejecutar aplicaciones Java, incluyendo la JVM y las librerías necesarias. JDK (Java Development Kit): incluye las herramientas necesarias para desarrollar aplicaciones Java , como el compilador javac y otras utilidades. De forma simplificada podemos imaginarlo así: JDK ├── Herramientas de desarrollo │ ├── javac │ ├── jar │ └── javadoc │ └── Entorno necesario para ejecutar Java └── JVM Nuestro primer programa en Java Veamos ahora la estructura básica de un programa Java muy sencillo. Crearemos una clase llamada Main que mostrará un mensaje por pantalla. public class Main { public static void main(String[] args) { System.out.println(\"¡Hola, mundo desde Java!\"); } } De momento no es necesario comprender todos los elementos que aparecen en este código. Los iremos estudiando poco a poco. Por ahora nos interesa identificar tres elementos: class Main : define una clase llamada Main . main : es el punto desde el que comenzará la ejecución del programa. System.out.println(...) : permite mostrar información por pantalla. No intentes memorizar todavía esta estructura. Durante las próximas actividades iremos entendiendo qué significa cada una de sus partes. De un problema a un programa A lo largo del curso seguiremos normalmente este proceso: Analizar el problema. Pensar un algoritmo para resolverlo. Escribir el algoritmo en Java. Compilar el programa. Ejecutarlo y comprobar el resultado. Corregir los errores si el programa no funciona como esperábamos. Programar, por tanto, no consiste únicamente en escribir código: consiste principalmente en aprender a resolver problemas de forma lógica y ordenada . Variables, Tipos de Datos y Constantes Los programas necesitan guardar información mientras se están ejecutando . Para hacerlo utilizamos variables, que nos permiten almacenar datos como números, textos o valores lógicos y utilizarlos posteriormente en nuestro programa. ¿Qué es una variable? Una variable puede imaginarse como una pequeña caja con nombre en la que guardamos un dato. Cada variable tiene principalmente tres elementos: Un nombre , que utilizaremos para identificarla. Un tipo de dato , que indica qué clase de información puede guardar. Un valor , que es la información almacenada en ese momento. Por ejemplo: int edad = 20; En esta instrucción: int es el tipo de dato . edad es el nombre de la variable . 20 es el valor almacenado . Idea importante: el valor de una variable puede cambiar durante la ejecución del programa. Precisamente por eso se llama variable . Declarar, inicializar y modificar una variable Cuando trabajamos con variables aparecen varias operaciones diferentes. Declarar una variable significa indicar su tipo y su nombre: int edad; Asignar un valor significa guardar un dato en ella: edad = 20; También podemos declarar e inicializar una variable al mismo tiempo: int edad = 20; Y posteriormente podemos modificar su valor: edad = 21; Atención: en programación, el símbolo = se utiliza para asignar un valor . No significa exactamente lo mismo que el signo igual utilizado en matemáticas. Tipos de datos primitivos Java necesita conocer qué tipo de información almacenará cada variable. Entre los tipos primitivos que utilizaremos con mayor frecuencia al principio encontramos: int : números enteros, por ejemplo 25 , 0 o -10 . double : números con decimales, por ejemplo 19.99 o 3.14 . boolean : valores lógicos que únicamente pueden ser true o false . char : almacena un único carácter y se escribe entre comillas simples, por ejemplo 'A' . Existen otros tipos primitivos en Java, como byte , short , long y float , que iremos utilizando cuando sean necesarios. Trabajando con texto: String Para almacenar texto utilizaremos normalmente String . String nombre = \"María\"; A diferencia de los tipos anteriores, String no es un tipo primitivo , sino una clase de Java. De momento podemos utilizarla simplemente como el tipo que nos permite trabajar con cadenas de texto. Debemos recordar la diferencia entre: 'A' : un único carácter de tipo char . \"A\" : una cadena de texto de tipo String . Ejemplo utilizando diferentes variables Veamos un programa sencillo que almacena varios datos de una persona: public class Main { public static void main(String[] args) { String nombre = \"María\"; int edad = 20; double altura = 1.68; boolean esEstudiante = true; char inicial = 'M'; System.out.println(\"Nombre: \" + nombre); System.out.println(\"Edad: \" + edad); System.out.println(\"Altura: \" + altura); System.out.println(\"¿Es estudiante?: \" + esEstudiante); System.out.println(\"Inicial: \" + inicial); } } En este ejemplo cada variable almacena un tipo diferente de información. Cuando mostramos los datos por pantalla utilizamos el operador + para unir texto con el contenido de las variables. Literales Un literal es un valor que escribimos directamente dentro del código. Por ejemplo: int edad = 20; double precio = 49.95; char letra = 'A'; boolean activo = true; String saludo = \"Hola\"; En estas instrucciones, 20 , 49.95 , 'A' , true y \"Hola\" son literales. Constantes En ocasiones necesitamos almacenar un dato que no debe cambiar durante la ejecución del programa . Para ello podemos utilizar una constante. En Java se utiliza la palabra reservada final : final double PI = 3.14159; final int MAX_INTENTOS = 3; Una vez asignado el valor, no podremos modificarlo: final int MAX_INTENTOS = 3; // Esto produciría un error: MAX_INTENTOS = 5; Por convención, los nombres de las constantes se suelen escribir en mayúsculas , separando las palabras mediante guiones bajos: final double IVA = 0.21; final int EDAD_MINIMA = 18; final int NUMERO_MAXIMO_INTENTOS = 3; Reglas básicas para nombrar variables Elegir nombres adecuados hace que nuestros programas sean mucho más fáciles de entender. Algunas recomendaciones básicas son: Utilizar nombres que describan el contenido de la variable: edad , precioProducto o nombreAlumno . No utilizar espacios: nombre alumno sería incorrecto. No comenzar el nombre por un número: 1alumno sería incorrecto. No utilizar palabras reservadas de Java como class , int o public . Utilizar normalmente camelCase cuando el nombre contiene varias palabras: precioFinal , numeroIntentos o nombreCompleto . Buena práctica: un nombre como edadAlumno nos aporta mucha más información que nombres genéricos como x o a . Primer ejercicio Crea un programa que almacene los siguientes datos de un alumno: Nombre. Edad. Altura en metros. Inicial del apellido. Si tiene o no conocimientos previos de programación. Después, muestra toda la información por pantalla utilizando System.out.println() . Por ejemplo, la salida podría ser: Nombre: Laura Edad: 18 Altura: 1.72 Inicial del apellido: G ¿Tiene conocimientos previos?: false Operadores y Expresiones Una vez que sabemos almacenar información en variables, necesitamos poder trabajar con esos datos . Para ello utilizamos operadores, que nos permiten realizar cálculos, comparar valores y combinar condiciones. ¿Qué es una expresión? Una expresión es una combinación de valores, variables y operadores que produce un resultado. Por ejemplo: edad + 1 precio * cantidad nota >= 5 edad >= 18 && tieneCarnet Cada una de estas expresiones produce un resultado diferente: edad + 1 produce un número. precio * cantidad produce un número. nota >= 5 produce un valor boolean . edad >= 18 && tieneCarnet también produce un valor boolean . Idea importante: una expresión siempre se evalúa y produce algún resultado. Operadores aritméticos Los operadores aritméticos permiten realizar operaciones matemáticas sobre valores numéricos. + : suma. - : resta. * : multiplicación. / : división. % : resto de una división entera. Por ejemplo: int a = 10; int b = 3; int suma = a + b; int resta = a - b; int multiplicacion = a * b; int division = a / b; int resto = a % b; En este caso: suma vale 13 . resta vale 7 . multiplicacion vale 30 . division vale 3 . resto vale 1 . Atención con la división: si dividimos dos valores de tipo int , Java realiza una división entera . Por ejemplo, 10 / 3 produce 3 , no 3.333... . Si queremos obtener un resultado decimal, al menos uno de los valores deberá ser decimal: double resultado = 10.0 / 3; El operador módulo El operador % devuelve el resto de una división . int resto = 10 % 3; Como 10 / 3 deja un resto de 1 , la variable resto tendrá el valor 1 . Este operador resulta muy útil en programación. Por ejemplo, podemos utilizarlo para comprobar si un número es par: int numero = 8; boolean esPar = numero % 2 == 0; Si el resto de dividir un número entre 2 es 0 , entonces sabemos que es par. Operadores relacionales Los operadores relacionales permiten comparar dos valores . El resultado de una comparación siempre es un valor de tipo boolean : true o false . == : igual que. != : distinto de. &gt; : mayor que. &lt; : menor que. &gt;= : mayor o igual que. &lt;= : menor o igual que. Por ejemplo: int edad = 20; boolean esMayorDeEdad = edad >= 18; boolean tieneVeinte = edad == 20; boolean esMenorDeEdad = edad En este caso: esMayorDeEdad será true . tieneVeinte será true . esMenorDeEdad será false . No confundas = con == . = sirve para asignar un valor. == sirve para comparar dos valores. int edad = 20; // Asignación boolean resultado = edad == 20; // Comparación Operadores lógicos Los operadores lógicos permiten combinar varias condiciones . Trabajan con valores de tipo boolean . &amp;&amp; — AND : el resultado es verdadero solamente si ambas condiciones son verdaderas. || — OR : el resultado es verdadero si al menos una de las condiciones es verdadera. ! — NOT : invierte un valor lógico. Una forma muy visual de entender estos operadores es utilizar una tabla de verdad . En ella vemos qué resultado produce cada operador según los valores de entrada: Booleano A Booleano B Operador Resultado true true &amp;&amp; true true false &amp;&amp; false false true &amp;&amp; false false false &amp;&amp; false true true || true true false || true false true || true false false || false true No se usa ! false false No se usa ! true Truco: con &amp;&amp; todo debe ser verdadero; con || basta con que una condición sea verdadera. Por ejemplo: int edad = 20; boolean tieneCarnet = true; boolean puedeConducir = edad >= 18 && tieneCarnet; Para que puedeConducir sea true , deben cumplirse las dos condiciones: edad >= 18 tieneCarnet == true También podemos comprobar alternativas utilizando || : boolean esFinDeSemana = esSabado || esDomingo; Y podemos invertir una condición utilizando ! : boolean estaApagado = !estaEncendido; Operadores de asignación Ya conocemos el operador = , que permite asignar un valor a una variable: int puntos = 10; Java también dispone de operadores que permiten modificar una variable utilizando su valor actual. puntos += 5; puntos -= 2; puntos *= 2; puntos /= 2; Por ejemplo: puntos += 5; es una forma abreviada de escribir: puntos = puntos + 5; Prioridad de los operadores Cuando una expresión contiene varios operadores, Java sigue unas reglas de prioridad similares a las que utilizamos en matemáticas. La siguiente tabla resume el orden más habitual de evaluación en los operadores que estamos utilizando en esta unidad: Prioridad Operadores Tipo Ejemplo 1 ( ) Paréntesis (2 + 3) * 4 2 ! Negación lógica !tienePermiso 3 * , / , % Multiplicación, división y módulo 2 + 3 * 4 4 + , - Suma y resta precio + iva 5 &lt; , &lt;= , &gt; , &gt;= Comparaciones de orden edad &gt;= 18 6 == , != Igualdad y desigualdad nota == 10 7 &amp;&amp; AND lógico edad &gt;= 18 &amp;&amp; tieneCarnet 8 || OR lógico esSabado || esDomingo 9 = , += , -= , *= , /= Asignación puntos += 5 Idea clave: cuanto menor es el número de la tabla, antes se evalúa ese operador. Si hay duda, usa paréntesis para hacer explícito el orden. int resultado = 2 + 3 * 4; Primero se realiza la multiplicación: 2 + 12 = 14 Si queremos modificar el orden de evaluación podemos utilizar paréntesis: int resultado = (2 + 3) * 4; En este caso: 5 * 4 = 20 Buena práctica: aunque conozcamos las reglas de prioridad, utilizar paréntesis puede hacer que una expresión sea mucho más fácil de leer. Ejemplo completo Veamos un programa que combina distintos operadores: public class Main { public static void main(String[] args) { int a = 10; int b = 3; int suma = a + b; int resto = a % b; boolean esMayor = a > b; boolean estaEnRango = a > 5 && a Ejercicio Crea un programa que almacene las notas de tres exámenes: double nota1 = 7.5; double nota2 = 6.0; double nota3 = 8.5; El programa deberá: Calcular la nota media. Mostrar la media por pantalla. Comprobar si la media es mayor o igual que 5 . Guardar el resultado de esa comparación en una variable de tipo boolean . Mostrar si el alumno ha aprobado. La salida podría ser similar a: Nota media: 7.333333333333333 ¿Ha aprobado?: true Desafío extra: crea una variable notaMinima con valor 5 y utilízala en la comparación en lugar de escribir directamente el número 5 . Conversiones de Tipo y Documentación A veces necesitaremos transformar un dato de un tipo a otro para poder utilizarlo correctamente. Además, aprenderemos a escribir comentarios que hagan nuestro código más claro, comprensible y fácil de mantener. ¿Por qué necesitamos convertir tipos? En Java, cada variable tiene un tipo concreto. Sin embargo, en determinadas operaciones podemos necesitar utilizar un valor como si perteneciera a otro tipo. Por ejemplo, podemos tener un número entero y querer utilizarlo como decimal: int edad = 20; double edadDecimal = edad; O podemos tener un número decimal y querer quedarnos únicamente con su parte entera: double precio = 19.95; int precioEntero = (int) precio; Estas transformaciones se conocen como conversiones de tipo . Conversión implícita Una conversión implícita ocurre cuando Java puede realizar la transformación automáticamente sin que tengamos que indicarlo. Por ejemplo: int numero = 50; double decimal = numero; La variable numero contiene el valor entero 50 . Al almacenarlo en una variable double , Java lo convierte automáticamente en 50.0 . int numero = 50; double decimal = numero; System.out.println(decimal); // 50.0 Idea importante: Java realiza automáticamente determinadas conversiones cuando considera que el valor puede representarse correctamente en el nuevo tipo. Conversión explícita: casting En otras ocasiones Java no realiza la conversión automáticamente porque podría producirse una pérdida de información . En esos casos debemos indicar expresamente el tipo al que queremos convertir el valor utilizando: (tipo) Por ejemplo: double precio = 99.99; int precioEntero = (int) precio; El valor almacenado en precioEntero será: 99 La parte decimal se pierde durante la conversión. Importante: convertir un double a int no redondea el número. Simplemente elimina la parte decimal. Por ejemplo: double numero = 8.99; int resultado = (int) numero; System.out.println(resultado); // 8 Casting y división Las conversiones también son importantes cuando realizamos operaciones entre números enteros. Observa este ejemplo: int a = 10; int b = 4; double resultado = a / b; System.out.println(resultado); Aunque resultado sea de tipo double , la división se realiza primero entre dos valores int . Por tanto: 10 / 4 = 2 y después ese resultado se convierte en: 2.0 Si queremos obtener el resultado decimal real, podemos convertir uno de los operandos antes de realizar la división: double resultado = (double) a / b; Ahora el resultado será: 2.5 Fíjate en el orden: no es lo mismo convertir el resultado después de dividir que convertir uno de los valores antes de realizar la operación. Ejemplo completo de conversiones public class Main { public static void main(String[] args) { int unidades = 5; double unidadesDecimal = unidades; double precio = 19.95; int precioSinDecimales = (int) precio; int puntos = 7; int partidas = 2; double media = (double) puntos / partidas; System.out.println(\"Conversión automática: \" + unidadesDecimal); System.out.println(\"Conversión explícita: \" + precioSinDecimales); System.out.println(\"Media: \" + media); } } Comentarios en Java Los comentarios son textos que escribimos dentro del código para explicar su funcionamiento . El compilador ignora los comentarios, por lo que no afectan a la ejecución del programa. Java dispone de varios tipos de comentarios. Comentarios de una línea Se escriben utilizando // . // Calculamos el precio final double precioFinal = precio * cantidad; Todo lo que aparezca después de // en esa línea será ignorado por el compilador. Comentarios de varias líneas Cuando necesitamos escribir una explicación más extensa podemos utilizar: /* Este programa calcula la nota media de un alumno utilizando las notas de tres exámenes. */ El comentario comienza con /* y termina con */ . Comentarios de documentación: Javadoc Java también dispone de un formato especial de comentarios pensado para documentar clases y métodos . /** puntos = puntos + 1; En cambio, este comentario explica la intención del código: // Añadimos un punto porque el jugador ha capturado la manzana puntos = puntos + 1; Buena práctica: intenta que el propio código sea fácil de entender mediante nombres claros y utiliza comentarios para explicar el por qué cuando sea necesario. La legibilidad también forma parte de programar Un programa no debe limitarse a funcionar. También debe ser fácil de leer y comprender . Algunas buenas prácticas que iremos utilizando son: Utilizar nombres descriptivos para variables y constantes. Mantener una indentación correcta. Separar visualmente diferentes partes del programa. Evitar código innecesariamente complicado. Utilizar comentarios cuando aporten información útil. // Poco descriptivo double x = 100; double y = x * 0.21; // Más fácil de comprender double precioProducto = 100; double iva = precioProducto * 0.21; Ambos fragmentos realizan exactamente la misma operación, pero el segundo resulta mucho más fácil de entender. Ejercicio Crea un programa que almacene: El número total de puntos obtenidos por un jugador. El número de partidas jugadas. Calcula la media de puntos por partida y muestra el resultado con decimales. Por ejemplo: int puntos = 17; int partidas = 4; El resultado correcto debería ser: Media de puntos: 4.25 Pista: recuerda que si divides dos valores int , Java realizará una división entera. Añade además comentarios que expliquen las partes principales del programa, procurando no comentar instrucciones que sean evidentes."
  },
  {
    "id": "ut01-teoria-01-introduccion-entorno-java",
    "unitId": "ut01",
    "section": "Teoría",
    "title": "UT 01. Teoría: Introducción a la Programación y al Entorno Java",
    "url": "ut01-teoria.html#ut01-teoria-01-introduccion-entorno-java",
    "type": "Teoría · Sección",
    "text": "Introducción a la Programación y al Entorno Java Programar consiste en dar instrucciones a un ordenador para resolver un problema . Para hacerlo necesitamos pensar primero una solución paso a paso y, después, expresarla utilizando un lenguaje que el ordenador pueda procesar. ¿Qué es un algoritmo? Un algoritmo es una secuencia ordenada, clara y finita de pasos que permite resolver un problema o realizar una tarea. Utilizamos algoritmos continuamente, incluso fuera de la informática. Por ejemplo, una receta de cocina puede verse como un algoritmo: Preparar los ingredientes. Mezclarlos siguiendo un orden. Cocinar durante un tiempo determinado. Obtener el resultado final. En programación ocurre algo parecido. Antes de escribir código debemos pensar qué pasos debe seguir el ordenador para conseguir el resultado que buscamos. Idea importante: un algoritmo no depende necesariamente de un lenguaje de programación. Primero pensamos la solución; después decidimos cómo escribirla. ¿Qué es un lenguaje de programación? Un lenguaje de programación es un conjunto de reglas, símbolos y palabras que nos permite escribir instrucciones para un ordenador. Igual que los idiomas humanos tienen vocabulario y reglas gramaticales, los lenguajes de programación tienen: Sintaxis: indica cómo debemos escribir correctamente las instrucciones. Semántica: indica qué significa cada instrucción y qué efecto produce. Por ejemplo, un mismo algoritmo puede expresarse de formas diferentes dependiendo del lenguaje utilizado. En lenguaje natural podríamos decir: Mostrar el mensaje \"Hola mundo\" Mientras que en Java escribiríamos: System.out.println(\"Hola mundo\"); Niveles de los lenguajes de programación Los ordenadores trabajan internamente utilizando instrucciones muy simples. Según lo cerca que esté un lenguaje del hardware o de la forma de pensar de las personas, podemos hablar de diferentes niveles: Lenguaje máquina: utiliza instrucciones binarias formadas por 0 y 1 que el procesador puede ejecutar directamente. Lenguaje ensamblador: utiliza abreviaturas o mnemónicos que representan instrucciones concretas del procesador. Lenguajes de alto nivel: utilizan instrucciones mucho más fáciles de leer y escribir para una persona. Java, Python o C# son ejemplos de lenguajes de alto nivel. Nosotros trabajaremos principalmente con Java , un lenguaje de alto nivel diseñado para permitir el desarrollo de aplicaciones de una forma estructurada y portable. Del código Java al programa en ejecución Cuando escribimos un programa en Java, el ordenador no ejecuta directamente el texto que hemos escrito. Existe un proceso intermedio. El flujo simplificado es el siguiente: Escribimos el código fuente en un archivo con extensión .java . El compilador de Java, javac , comprueba el código y lo transforma en un formato intermedio llamado bytecode . El bytecode se almacena normalmente en archivos con extensión .class . La Máquina Virtual de Java (JVM) ejecuta ese bytecode. De forma resumida: Código fuente (.java) ↓ Compilador javac ↓ Bytecode (.class) ↓ Máquina Virtual de Java (JVM) ↓ Programa en ejecución ¿Por qué utilizar una máquina virtual? El bytecode puede ejecutarse en diferentes sistemas siempre que exista una JVM compatible. Esta idea está relacionada con una de las características más conocidas de Java: \"Write once, run anywhere\" . JVM, JRE y JDK En el ecosistema Java aparecen varios términos que conviene diferenciar: JVM (Java Virtual Machine): es la máquina virtual encargada de ejecutar el bytecode de Java. JRE (Java Runtime Environment): contiene los elementos necesarios para ejecutar aplicaciones Java, incluyendo la JVM y las librerías necesarias. JDK (Java Development Kit): incluye las herramientas necesarias para desarrollar aplicaciones Java , como el compilador javac y otras utilidades. De forma simplificada podemos imaginarlo así: JDK ├── Herramientas de desarrollo │ ├── javac │ ├── jar │ └── javadoc │ └── Entorno necesario para ejecutar Java └── JVM Nuestro primer programa en Java Veamos ahora la estructura básica de un programa Java muy sencillo. Crearemos una clase llamada Main que mostrará un mensaje por pantalla. public class Main { public static void main(String[] args) { System.out.println(\"¡Hola, mundo desde Java!\"); } } De momento no es necesario comprender todos los elementos que aparecen en este código. Los iremos estudiando poco a poco. Por ahora nos interesa identificar tres elementos: class Main : define una clase llamada Main . main : es el punto desde el que comenzará la ejecución del programa. System.out.println(...) : permite mostrar información por pantalla. No intentes memorizar todavía esta estructura. Durante las próximas actividades iremos entendiendo qué significa cada una de sus partes. De un problema a un programa A lo largo del curso seguiremos normalmente este proceso: Analizar el problema. Pensar un algoritmo para resolverlo. Escribir el algoritmo en Java. Compilar el programa. Ejecutarlo y comprobar el resultado. Corregir los errores si el programa no funciona como esperábamos. Programar, por tanto, no consiste únicamente en escribir código: consiste principalmente en aprender a resolver problemas de forma lógica y ordenada ."
  },
  {
    "id": "ut01-teoria-02-variables-tipos-constantes",
    "unitId": "ut01",
    "section": "Teoría",
    "title": "UT 01. Teoría: Variables, Tipos de Datos y Constantes",
    "url": "ut01-teoria.html#ut01-teoria-02-variables-tipos-constantes",
    "type": "Teoría · Sección",
    "text": "Variables, Tipos de Datos y Constantes Los programas necesitan guardar información mientras se están ejecutando . Para hacerlo utilizamos variables, que nos permiten almacenar datos como números, textos o valores lógicos y utilizarlos posteriormente en nuestro programa. ¿Qué es una variable? Una variable puede imaginarse como una pequeña caja con nombre en la que guardamos un dato. Cada variable tiene principalmente tres elementos: Un nombre , que utilizaremos para identificarla. Un tipo de dato , que indica qué clase de información puede guardar. Un valor , que es la información almacenada en ese momento. Por ejemplo: int edad = 20; En esta instrucción: int es el tipo de dato . edad es el nombre de la variable . 20 es el valor almacenado . Idea importante: el valor de una variable puede cambiar durante la ejecución del programa. Precisamente por eso se llama variable . Declarar, inicializar y modificar una variable Cuando trabajamos con variables aparecen varias operaciones diferentes. Declarar una variable significa indicar su tipo y su nombre: int edad; Asignar un valor significa guardar un dato en ella: edad = 20; También podemos declarar e inicializar una variable al mismo tiempo: int edad = 20; Y posteriormente podemos modificar su valor: edad = 21; Atención: en programación, el símbolo = se utiliza para asignar un valor . No significa exactamente lo mismo que el signo igual utilizado en matemáticas. Tipos de datos primitivos Java necesita conocer qué tipo de información almacenará cada variable. Entre los tipos primitivos que utilizaremos con mayor frecuencia al principio encontramos: int : números enteros, por ejemplo 25 , 0 o -10 . double : números con decimales, por ejemplo 19.99 o 3.14 . boolean : valores lógicos que únicamente pueden ser true o false . char : almacena un único carácter y se escribe entre comillas simples, por ejemplo 'A' . Existen otros tipos primitivos en Java, como byte , short , long y float , que iremos utilizando cuando sean necesarios. Trabajando con texto: String Para almacenar texto utilizaremos normalmente String . String nombre = \"María\"; A diferencia de los tipos anteriores, String no es un tipo primitivo , sino una clase de Java. De momento podemos utilizarla simplemente como el tipo que nos permite trabajar con cadenas de texto. Debemos recordar la diferencia entre: 'A' : un único carácter de tipo char . \"A\" : una cadena de texto de tipo String . Ejemplo utilizando diferentes variables Veamos un programa sencillo que almacena varios datos de una persona: public class Main { public static void main(String[] args) { String nombre = \"María\"; int edad = 20; double altura = 1.68; boolean esEstudiante = true; char inicial = 'M'; System.out.println(\"Nombre: \" + nombre); System.out.println(\"Edad: \" + edad); System.out.println(\"Altura: \" + altura); System.out.println(\"¿Es estudiante?: \" + esEstudiante); System.out.println(\"Inicial: \" + inicial); } } En este ejemplo cada variable almacena un tipo diferente de información. Cuando mostramos los datos por pantalla utilizamos el operador + para unir texto con el contenido de las variables. Literales Un literal es un valor que escribimos directamente dentro del código. Por ejemplo: int edad = 20; double precio = 49.95; char letra = 'A'; boolean activo = true; String saludo = \"Hola\"; En estas instrucciones, 20 , 49.95 , 'A' , true y \"Hola\" son literales. Constantes En ocasiones necesitamos almacenar un dato que no debe cambiar durante la ejecución del programa . Para ello podemos utilizar una constante. En Java se utiliza la palabra reservada final : final double PI = 3.14159; final int MAX_INTENTOS = 3; Una vez asignado el valor, no podremos modificarlo: final int MAX_INTENTOS = 3; // Esto produciría un error: MAX_INTENTOS = 5; Por convención, los nombres de las constantes se suelen escribir en mayúsculas , separando las palabras mediante guiones bajos: final double IVA = 0.21; final int EDAD_MINIMA = 18; final int NUMERO_MAXIMO_INTENTOS = 3; Reglas básicas para nombrar variables Elegir nombres adecuados hace que nuestros programas sean mucho más fáciles de entender. Algunas recomendaciones básicas son: Utilizar nombres que describan el contenido de la variable: edad , precioProducto o nombreAlumno . No utilizar espacios: nombre alumno sería incorrecto. No comenzar el nombre por un número: 1alumno sería incorrecto. No utilizar palabras reservadas de Java como class , int o public . Utilizar normalmente camelCase cuando el nombre contiene varias palabras: precioFinal , numeroIntentos o nombreCompleto . Buena práctica: un nombre como edadAlumno nos aporta mucha más información que nombres genéricos como x o a . Primer ejercicio Crea un programa que almacene los siguientes datos de un alumno: Nombre. Edad. Altura en metros. Inicial del apellido. Si tiene o no conocimientos previos de programación. Después, muestra toda la información por pantalla utilizando System.out.println() . Por ejemplo, la salida podría ser: Nombre: Laura Edad: 18 Altura: 1.72 Inicial del apellido: G ¿Tiene conocimientos previos?: false"
  },
  {
    "id": "ut01-teoria-03-operadores-expresiones",
    "unitId": "ut01",
    "section": "Teoría",
    "title": "UT 01. Teoría: Operadores y Expresiones",
    "url": "ut01-teoria.html#ut01-teoria-03-operadores-expresiones",
    "type": "Teoría · Sección",
    "text": "Operadores y Expresiones Una vez que sabemos almacenar información en variables, necesitamos poder trabajar con esos datos . Para ello utilizamos operadores, que nos permiten realizar cálculos, comparar valores y combinar condiciones. ¿Qué es una expresión? Una expresión es una combinación de valores, variables y operadores que produce un resultado. Por ejemplo: edad + 1 precio * cantidad nota >= 5 edad >= 18 && tieneCarnet Cada una de estas expresiones produce un resultado diferente: edad + 1 produce un número. precio * cantidad produce un número. nota >= 5 produce un valor boolean . edad >= 18 && tieneCarnet también produce un valor boolean . Idea importante: una expresión siempre se evalúa y produce algún resultado. Operadores aritméticos Los operadores aritméticos permiten realizar operaciones matemáticas sobre valores numéricos. + : suma. - : resta. * : multiplicación. / : división. % : resto de una división entera. Por ejemplo: int a = 10; int b = 3; int suma = a + b; int resta = a - b; int multiplicacion = a * b; int division = a / b; int resto = a % b; En este caso: suma vale 13 . resta vale 7 . multiplicacion vale 30 . division vale 3 . resto vale 1 . Atención con la división: si dividimos dos valores de tipo int , Java realiza una división entera . Por ejemplo, 10 / 3 produce 3 , no 3.333... . Si queremos obtener un resultado decimal, al menos uno de los valores deberá ser decimal: double resultado = 10.0 / 3; El operador módulo El operador % devuelve el resto de una división . int resto = 10 % 3; Como 10 / 3 deja un resto de 1 , la variable resto tendrá el valor 1 . Este operador resulta muy útil en programación. Por ejemplo, podemos utilizarlo para comprobar si un número es par: int numero = 8; boolean esPar = numero % 2 == 0; Si el resto de dividir un número entre 2 es 0 , entonces sabemos que es par. Operadores relacionales Los operadores relacionales permiten comparar dos valores . El resultado de una comparación siempre es un valor de tipo boolean : true o false . == : igual que. != : distinto de. &gt; : mayor que. &lt; : menor que. &gt;= : mayor o igual que. &lt;= : menor o igual que. Por ejemplo: int edad = 20; boolean esMayorDeEdad = edad >= 18; boolean tieneVeinte = edad == 20; boolean esMenorDeEdad = edad En este caso: esMayorDeEdad será true . tieneVeinte será true . esMenorDeEdad será false . No confundas = con == . = sirve para asignar un valor. == sirve para comparar dos valores. int edad = 20; // Asignación boolean resultado = edad == 20; // Comparación Operadores lógicos Los operadores lógicos permiten combinar varias condiciones . Trabajan con valores de tipo boolean . &amp;&amp; — AND : el resultado es verdadero solamente si ambas condiciones son verdaderas. || — OR : el resultado es verdadero si al menos una de las condiciones es verdadera. ! — NOT : invierte un valor lógico. Una forma muy visual de entender estos operadores es utilizar una tabla de verdad . En ella vemos qué resultado produce cada operador según los valores de entrada: Booleano A Booleano B Operador Resultado true true &amp;&amp; true true false &amp;&amp; false false true &amp;&amp; false false false &amp;&amp; false true true || true true false || true false true || true false false || false true No se usa ! false false No se usa ! true Truco: con &amp;&amp; todo debe ser verdadero; con || basta con que una condición sea verdadera. Por ejemplo: int edad = 20; boolean tieneCarnet = true; boolean puedeConducir = edad >= 18 && tieneCarnet; Para que puedeConducir sea true , deben cumplirse las dos condiciones: edad >= 18 tieneCarnet == true También podemos comprobar alternativas utilizando || : boolean esFinDeSemana = esSabado || esDomingo; Y podemos invertir una condición utilizando ! : boolean estaApagado = !estaEncendido; Operadores de asignación Ya conocemos el operador = , que permite asignar un valor a una variable: int puntos = 10; Java también dispone de operadores que permiten modificar una variable utilizando su valor actual. puntos += 5; puntos -= 2; puntos *= 2; puntos /= 2; Por ejemplo: puntos += 5; es una forma abreviada de escribir: puntos = puntos + 5; Prioridad de los operadores Cuando una expresión contiene varios operadores, Java sigue unas reglas de prioridad similares a las que utilizamos en matemáticas. La siguiente tabla resume el orden más habitual de evaluación en los operadores que estamos utilizando en esta unidad: Prioridad Operadores Tipo Ejemplo 1 ( ) Paréntesis (2 + 3) * 4 2 ! Negación lógica !tienePermiso 3 * , / , % Multiplicación, división y módulo 2 + 3 * 4 4 + , - Suma y resta precio + iva 5 &lt; , &lt;= , &gt; , &gt;= Comparaciones de orden edad &gt;= 18 6 == , != Igualdad y desigualdad nota == 10 7 &amp;&amp; AND lógico edad &gt;= 18 &amp;&amp; tieneCarnet 8 || OR lógico esSabado || esDomingo 9 = , += , -= , *= , /= Asignación puntos += 5 Idea clave: cuanto menor es el número de la tabla, antes se evalúa ese operador. Si hay duda, usa paréntesis para hacer explícito el orden. int resultado = 2 + 3 * 4; Primero se realiza la multiplicación: 2 + 12 = 14 Si queremos modificar el orden de evaluación podemos utilizar paréntesis: int resultado = (2 + 3) * 4; En este caso: 5 * 4 = 20 Buena práctica: aunque conozcamos las reglas de prioridad, utilizar paréntesis puede hacer que una expresión sea mucho más fácil de leer. Ejemplo completo Veamos un programa que combina distintos operadores: public class Main { public static void main(String[] args) { int a = 10; int b = 3; int suma = a + b; int resto = a % b; boolean esMayor = a > b; boolean estaEnRango = a > 5 && a Ejercicio Crea un programa que almacene las notas de tres exámenes: double nota1 = 7.5; double nota2 = 6.0; double nota3 = 8.5; El programa deberá: Calcular la nota media. Mostrar la media por pantalla. Comprobar si la media es mayor o igual que 5 . Guardar el resultado de esa comparación en una variable de tipo boolean . Mostrar si el alumno ha aprobado. La salida podría ser similar a: Nota media: 7.333333333333333 ¿Ha aprobado?: true Desafío extra: crea una variable notaMinima con valor 5 y utilízala en la comparación en lugar de escribir directamente el número 5 ."
  },
  {
    "id": "ut01-teoria-04-conversiones-documentacion",
    "unitId": "ut01",
    "section": "Teoría",
    "title": "UT 01. Teoría: Conversiones de Tipo y Documentación",
    "url": "ut01-teoria.html#ut01-teoria-04-conversiones-documentacion",
    "type": "Teoría · Sección",
    "text": "Conversiones de Tipo y Documentación A veces necesitaremos transformar un dato de un tipo a otro para poder utilizarlo correctamente. Además, aprenderemos a escribir comentarios que hagan nuestro código más claro, comprensible y fácil de mantener. ¿Por qué necesitamos convertir tipos? En Java, cada variable tiene un tipo concreto. Sin embargo, en determinadas operaciones podemos necesitar utilizar un valor como si perteneciera a otro tipo. Por ejemplo, podemos tener un número entero y querer utilizarlo como decimal: int edad = 20; double edadDecimal = edad; O podemos tener un número decimal y querer quedarnos únicamente con su parte entera: double precio = 19.95; int precioEntero = (int) precio; Estas transformaciones se conocen como conversiones de tipo . Conversión implícita Una conversión implícita ocurre cuando Java puede realizar la transformación automáticamente sin que tengamos que indicarlo. Por ejemplo: int numero = 50; double decimal = numero; La variable numero contiene el valor entero 50 . Al almacenarlo en una variable double , Java lo convierte automáticamente en 50.0 . int numero = 50; double decimal = numero; System.out.println(decimal); // 50.0 Idea importante: Java realiza automáticamente determinadas conversiones cuando considera que el valor puede representarse correctamente en el nuevo tipo. Conversión explícita: casting En otras ocasiones Java no realiza la conversión automáticamente porque podría producirse una pérdida de información . En esos casos debemos indicar expresamente el tipo al que queremos convertir el valor utilizando: (tipo) Por ejemplo: double precio = 99.99; int precioEntero = (int) precio; El valor almacenado en precioEntero será: 99 La parte decimal se pierde durante la conversión. Importante: convertir un double a int no redondea el número. Simplemente elimina la parte decimal. Por ejemplo: double numero = 8.99; int resultado = (int) numero; System.out.println(resultado); // 8 Casting y división Las conversiones también son importantes cuando realizamos operaciones entre números enteros. Observa este ejemplo: int a = 10; int b = 4; double resultado = a / b; System.out.println(resultado); Aunque resultado sea de tipo double , la división se realiza primero entre dos valores int . Por tanto: 10 / 4 = 2 y después ese resultado se convierte en: 2.0 Si queremos obtener el resultado decimal real, podemos convertir uno de los operandos antes de realizar la división: double resultado = (double) a / b; Ahora el resultado será: 2.5 Fíjate en el orden: no es lo mismo convertir el resultado después de dividir que convertir uno de los valores antes de realizar la operación. Ejemplo completo de conversiones public class Main { public static void main(String[] args) { int unidades = 5; double unidadesDecimal = unidades; double precio = 19.95; int precioSinDecimales = (int) precio; int puntos = 7; int partidas = 2; double media = (double) puntos / partidas; System.out.println(\"Conversión automática: \" + unidadesDecimal); System.out.println(\"Conversión explícita: \" + precioSinDecimales); System.out.println(\"Media: \" + media); } } Comentarios en Java Los comentarios son textos que escribimos dentro del código para explicar su funcionamiento . El compilador ignora los comentarios, por lo que no afectan a la ejecución del programa. Java dispone de varios tipos de comentarios. Comentarios de una línea Se escriben utilizando // . // Calculamos el precio final double precioFinal = precio * cantidad; Todo lo que aparezca después de // en esa línea será ignorado por el compilador. Comentarios de varias líneas Cuando necesitamos escribir una explicación más extensa podemos utilizar: /* Este programa calcula la nota media de un alumno utilizando las notas de tres exámenes. */ El comentario comienza con /* y termina con */ . Comentarios de documentación: Javadoc Java también dispone de un formato especial de comentarios pensado para documentar clases y métodos . /** puntos = puntos + 1; En cambio, este comentario explica la intención del código: // Añadimos un punto porque el jugador ha capturado la manzana puntos = puntos + 1; Buena práctica: intenta que el propio código sea fácil de entender mediante nombres claros y utiliza comentarios para explicar el por qué cuando sea necesario. La legibilidad también forma parte de programar Un programa no debe limitarse a funcionar. También debe ser fácil de leer y comprender . Algunas buenas prácticas que iremos utilizando son: Utilizar nombres descriptivos para variables y constantes. Mantener una indentación correcta. Separar visualmente diferentes partes del programa. Evitar código innecesariamente complicado. Utilizar comentarios cuando aporten información útil. // Poco descriptivo double x = 100; double y = x * 0.21; // Más fácil de comprender double precioProducto = 100; double iva = precioProducto * 0.21; Ambos fragmentos realizan exactamente la misma operación, pero el segundo resulta mucho más fácil de entender. Ejercicio Crea un programa que almacene: El número total de puntos obtenidos por un jugador. El número de partidas jugadas. Calcula la media de puntos por partida y muestra el resultado con decimales. Por ejemplo: int puntos = 17; int partidas = 4; El resultado correcto debería ser: Media de puntos: 4.25 Pista: recuerda que si divides dos valores int , Java realizará una división entera. Añade además comentarios que expliquen las partes principales del programa, procurando no comentar instrucciones que sean evidentes."
  },
  {
    "id": "ut01-ejercicios",
    "unitId": "ut01",
    "section": "Ejercicios",
    "title": "UT 01. Ejercicios: Introducción a la programación y Java",
    "url": "ut01-ejercicios.html",
    "type": "Ejercicios",
    "text": "Ejercicio 1. Primer programa Crea un programa básico en Java que muestre varios mensajes por consola. Nombre del proyecto del ejercicio: HolaMundo Ejercicio 2. Variables y tipos Declara variables de distintos tipos, asígnales valores y muestra su contenido por pantalla. Nombre del proyecto del ejercicio: VariablesBasicas Ejercicio 3. Operadores Realiza cálculos sencillos usando operadores aritméticos, relacionales y lógicos. Nombre del proyecto del ejercicio: OperadoresExpresiones Ejercicio 4. Conversiones y documentación Practica conversiones de tipo, comentarios y documentación básica del código. Nombre del proyecto del ejercicio: ConversionesDocumentacion"
  },
  {
    "id": "ut01-ejercicios-01-primer-programa",
    "unitId": "ut01",
    "section": "Ejercicios",
    "title": "UT 01. Ejercicios: Ejercicio 1. Primer programa",
    "url": "ut01-ejercicios.html#ut01-ejercicios-01-primer-programa",
    "type": "Ejercicios · Sección",
    "text": "Ejercicio 1. Primer programa Crea un programa básico en Java que muestre varios mensajes por consola. Nombre del proyecto del ejercicio: HolaMundo"
  },
  {
    "id": "ut01-ejercicios-02-variables-tipos",
    "unitId": "ut01",
    "section": "Ejercicios",
    "title": "UT 01. Ejercicios: Ejercicio 2. Variables y tipos",
    "url": "ut01-ejercicios.html#ut01-ejercicios-02-variables-tipos",
    "type": "Ejercicios · Sección",
    "text": "Ejercicio 2. Variables y tipos Declara variables de distintos tipos, asígnales valores y muestra su contenido por pantalla. Nombre del proyecto del ejercicio: VariablesBasicas"
  },
  {
    "id": "ut01-ejercicios-03-operadores",
    "unitId": "ut01",
    "section": "Ejercicios",
    "title": "UT 01. Ejercicios: Ejercicio 3. Operadores",
    "url": "ut01-ejercicios.html#ut01-ejercicios-03-operadores",
    "type": "Ejercicios · Sección",
    "text": "Ejercicio 3. Operadores Realiza cálculos sencillos usando operadores aritméticos, relacionales y lógicos. Nombre del proyecto del ejercicio: OperadoresExpresiones"
  },
  {
    "id": "ut01-ejercicios-04-conversiones-documentacion",
    "unitId": "ut01",
    "section": "Ejercicios",
    "title": "UT 01. Ejercicios: Ejercicio 4. Conversiones y documentación",
    "url": "ut01-ejercicios.html#ut01-ejercicios-04-conversiones-documentacion",
    "type": "Ejercicios · Sección",
    "text": "Ejercicio 4. Conversiones y documentación Practica conversiones de tipo, comentarios y documentación básica del código. Nombre del proyecto del ejercicio: ConversionesDocumentacion"
  },
  {
    "id": "ut02-teoria",
    "unitId": "ut02",
    "section": "Teoría",
    "title": "UT 02. Teoría: Variables, tipos de datos y constantes",
    "url": "ut02-teoria.html",
    "type": "Teoría",
    "text": "UT 02. Teoría Variables, tipos de datos y constantes Contenidos Uso de variables para almacenar información y trabajo con tipos primitivos, String, literales y constantes. Pendiente: aquí se volcará la teoría completa cuando esté disponible."
  },
  {
    "id": "ut02-ejercicios",
    "unitId": "ut02",
    "section": "Ejercicios",
    "title": "UT 02. Ejercicios: Variables, tipos de datos y constantes",
    "url": "ut02-ejercicios.html",
    "type": "Ejercicios",
    "text": "UT 02. Ejercicios Variables, tipos de datos y constantes Práctica propuesta Declara variables para representar datos personales y muéstralas por pantalla con etiquetas claras. Nombre del proyecto del ejercicio: VariablesBasicas"
  },
  {
    "id": "ut03-teoria",
    "unitId": "ut03",
    "section": "Teoría",
    "title": "UT 03. Teoría: Operadores y expresiones",
    "url": "ut03-teoria.html",
    "type": "Teoría",
    "text": "UT 03. Teoría Operadores y expresiones Contenidos Construcción de expresiones aritméticas, relacionales y lógicas, incluyendo prioridad de operadores. Pendiente: aquí se volcará la teoría completa cuando esté disponible."
  },
  {
    "id": "ut03-ejercicios",
    "unitId": "ut03",
    "section": "Ejercicios",
    "title": "UT 03. Ejercicios: Operadores y expresiones",
    "url": "ut03-ejercicios.html",
    "type": "Ejercicios",
    "text": "UT 03. Ejercicios Operadores y expresiones Práctica propuesta Calcula el área y perímetro de varias figuras utilizando operadores aritméticos. Nombre del proyecto del ejercicio: OperadoresFiguras"
  },
  {
    "id": "ut04-teoria",
    "unitId": "ut04",
    "section": "Teoría",
    "title": "UT 04. Teoría: Entrada y salida de datos",
    "url": "ut04-teoria.html",
    "type": "Teoría",
    "text": "UT 04. Teoría Entrada y salida de datos Contenidos Lectura de información desde teclado con Scanner y presentación de resultados por consola. Pendiente: aquí se volcará la teoría completa cuando esté disponible."
  },
  {
    "id": "ut04-ejercicios",
    "unitId": "ut04",
    "section": "Ejercicios",
    "title": "UT 04. Ejercicios: Entrada y salida de datos",
    "url": "ut04-ejercicios.html",
    "type": "Ejercicios",
    "text": "UT 04. Ejercicios Entrada y salida de datos Práctica propuesta Pide datos al usuario y genera una ficha básica con los valores introducidos. Nombre del proyecto del ejercicio: FichaUsuario"
  },
  {
    "id": "ut05-teoria",
    "unitId": "ut05",
    "section": "Teoría",
    "title": "UT 05. Teoría: Estructuras condicionales",
    "url": "ut05-teoria.html",
    "type": "Teoría",
    "text": "UT 05. Teoría Estructuras condicionales Contenidos Toma de decisiones con if, else, else if, switch y condiciones compuestas. Pendiente: aquí se volcará la teoría completa cuando esté disponible."
  },
  {
    "id": "ut05-ejercicios",
    "unitId": "ut05",
    "section": "Ejercicios",
    "title": "UT 05. Ejercicios: Estructuras condicionales",
    "url": "ut05-ejercicios.html",
    "type": "Ejercicios",
    "text": "UT 05. Ejercicios Estructuras condicionales Práctica propuesta Clasifica una nota numérica en insuficiente, suficiente, bien, notable o sobresaliente. Nombre del proyecto del ejercicio: ClasificadorNotas"
  },
  {
    "id": "ut06-teoria",
    "unitId": "ut06",
    "section": "Teoría",
    "title": "UT 06. Teoría: Bucles",
    "url": "ut06-teoria.html",
    "type": "Teoría",
    "text": "UT 06. Teoría Bucles Contenidos Repetición controlada de instrucciones con while, do while y for. Pendiente: aquí se volcará la teoría completa cuando esté disponible."
  },
  {
    "id": "ut06-ejercicios",
    "unitId": "ut06",
    "section": "Ejercicios",
    "title": "UT 06. Ejercicios: Bucles",
    "url": "ut06-ejercicios.html",
    "type": "Ejercicios",
    "text": "UT 06. Ejercicios Bucles Práctica propuesta Genera una tabla de multiplicar y calcula la suma de los números de un intervalo. Nombre del proyecto del ejercicio: BuclesBasicos"
  },
  {
    "id": "ut07-teoria",
    "unitId": "ut07",
    "section": "Teoría",
    "title": "UT 07. Teoría: Métodos y modularidad",
    "url": "ut07-teoria.html",
    "type": "Teoría",
    "text": "UT 07. Teoría Métodos y modularidad Contenidos División de programas en métodos con parámetros, argumentos, retorno y ámbito de variables. Pendiente: aquí se volcará la teoría completa cuando esté disponible."
  },
  {
    "id": "ut07-ejercicios",
    "unitId": "ut07",
    "section": "Ejercicios",
    "title": "UT 07. Ejercicios: Métodos y modularidad",
    "url": "ut07-ejercicios.html",
    "type": "Ejercicios",
    "text": "UT 07. Ejercicios Métodos y modularidad Práctica propuesta Refactoriza un programa con cálculos repetidos creando métodos reutilizables. Nombre del proyecto del ejercicio: MetodosCalculadora"
  },
  {
    "id": "ut08-teoria",
    "unitId": "ut08",
    "section": "Teoría",
    "title": "UT 08. Teoría: Arrays y colecciones básicas",
    "url": "ut08-teoria.html",
    "type": "Teoría",
    "text": "UT 08. Teoría Arrays y colecciones básicas Contenidos Almacenamiento de varios valores relacionados mediante arrays y primeras colecciones. Pendiente: aquí se volcará la teoría completa cuando esté disponible."
  },
  {
    "id": "ut08-ejercicios",
    "unitId": "ut08",
    "section": "Ejercicios",
    "title": "UT 08. Ejercicios: Arrays y colecciones básicas",
    "url": "ut08-ejercicios.html",
    "type": "Ejercicios",
    "text": "UT 08. Ejercicios Arrays y colecciones básicas Práctica propuesta Calcula la media, la nota máxima y la nota mínima de un conjunto de calificaciones. Nombre del proyecto del ejercicio: NotasArray"
  },
  {
    "id": "ut09-teoria",
    "unitId": "ut09",
    "section": "Teoría",
    "title": "UT 09. Teoría: Programación orientada a objetos",
    "url": "ut09-teoria.html",
    "type": "Teoría",
    "text": "UT 09. Teoría Programación orientada a objetos Contenidos Modelado de problemas mediante clases, objetos, atributos, métodos y constructores. Pendiente: aquí se volcará la teoría completa cuando esté disponible."
  },
  {
    "id": "ut09-ejercicios",
    "unitId": "ut09",
    "section": "Ejercicios",
    "title": "UT 09. Ejercicios: Programación orientada a objetos",
    "url": "ut09-ejercicios.html",
    "type": "Ejercicios",
    "text": "UT 09. Ejercicios Programación orientada a objetos Práctica propuesta Crea una clase para representar un producto con nombre, precio y unidades disponibles. Nombre del proyecto del ejercicio: ProductosPOO"
  },
  {
    "id": "ut10-teoria",
    "unitId": "ut10",
    "section": "Teoría",
    "title": "UT 10. Teoría: Herencia, excepciones y ficheros",
    "url": "ut10-teoria.html",
    "type": "Teoría",
    "text": "UT 10. Teoría Herencia, excepciones y ficheros Contenidos Ampliación de POO, gestión de errores con excepciones y persistencia en ficheros. Pendiente: aquí se volcará la teoría completa cuando esté disponible."
  },
  {
    "id": "ut10-ejercicios",
    "unitId": "ut10",
    "section": "Ejercicios",
    "title": "UT 10. Ejercicios: Herencia, excepciones y ficheros",
    "url": "ut10-ejercicios.html",
    "type": "Ejercicios",
    "text": "UT 10. Ejercicios Herencia, excepciones y ficheros Práctica propuesta Diseña un pequeño proyecto final que use clases, herencia, control de errores y almacenamiento. Nombre del proyecto del ejercicio: ProyectoFinalJava"
  }
];
