# MaquinaExpendedora

Base Maven del ejercicio 3.46 de PROM UT3. No incluye soluciones.

Abre `pom.xml` en IntelliJ, configura JDK 25 y ejecuta
`edu.masanz.da.ut3.app.Main` con el triangulo verde junto a `main`.
Selecciona tambien JDK 25 para el importador y el ejecutor Maven de IntelliJ.
El proyecto utiliza `maven.compiler.release=25`, sin caracteristicas preview.

## Trabajo pendiente

- `gui.GUI`: TODO 01-02.
- `modelo.Producto`: TODO 11-14.
- `modelo.MaquinaExpendedora`: TODO 21-26.
- `app.Main`: TODO 31-35.

Los getters directos y el toString de Producto ya estan implementados.
Cada metodo tiene su contrato en Javadoc.
Completa solo los TODOs: sus retornos iniciales (0, false y null) son provisionales.
Cada TODO del codigo coincide literalmente con un punto individual del enunciado.
Las aclaraciones adicionales estan en ese punto; el comentario no da pseudocodigo.
La base compila y termina sin hacer nada hasta que completes los TODOs.

No crees otras clases, metodos auxiliares, arrays ni colecciones. Conserva las
firmas. Utiliza condicionales, bucles y los metodos proporcionados. Las unicas
excepciones que se solicitan son `IllegalArgumentException` en constructores
con argumentos incorrectos; no crees excepciones propias.

## Reglas

Todos los importes son enteros en centimos: 100 equivale a un euro.
Los tres productos son referencias distintas, nunca null. Las posiciones son 1-3.
El saldo es dinero pendiente de gastar o devolver; la recaudacion solo aumenta
con compras correctas. Una compra rechazada no modifica ningun dato. Una compra
correcta retira una unidad, descuenta el precio del saldo y lo suma a la recaudacion.
La reposicion no modifica el saldo ni la recaudacion. No hay limite superior de stock
para los valores de las pruebas; trabaja con cantidades pequenas, sin desbordamientos.

Datos iniciales: Agua (100 centimos, 3 unidades), Zumo (150, 2), Barrita (80, 0).
Menu: 1 consultar, 2 introducir dinero, 3 comprar, 4 devolver saldo, 5 reponer,
0 salir. Al salir, devuelve automaticamente el saldo pendiente.

## Interfaz de consola

`edu.masanz.da.ut3.gui.GUI` contiene metodos de impresion ya implementados y dos
tareas de lectura. Todos sus metodos son estaticos: utiliza GUI.mostrarMenu()
y GUI.pedirOpcion(), sin crear instancias. El atributo scanner es estatico
y comparte la entrada de consola.
Main consulta el modelo, decide que texto mostrar y pasa a GUI solo textos,
numeros y otros datos sencillos. GUI no importa ni recibe clases del modelo.
No leas ni imprimas directamente desde Main o desde las clases de modelo.

```text
=== MAQUINA EXPENDEDORA ===
1. Consultar productos, saldo y recaudacion
2. Introducir dinero
3. Comprar un producto
4. Devolver el saldo
5. Reponer un producto
0. Salir
Elige una opcion: 2
Importe en centimos: 200
Operacion realizada.
```

Implementa pedirOpcion (TODO 01) para aceptar solo 0-5 y volver a solicitar valores
no validos. Implementa pedirEntero(mensaje) (TODO 02) para leer cualquier entero,
repetir si el texto no es numerico y devolver 0 si termina la entrada.
Los valores negativos pueden ser enteros correctos: su validez como importe o
cantidad corresponde al modelo. Cada TODO coincide con un punto del enunciado.

mostrarMenu, mostrarMensaje, mostrarProducto(numero, nombre, precioCentimos,
unidades), mostrarImporte(concepto, centimos), mostrarOpcionIncorrecta y
mostrarDespedida estan dados. Solo imprimen los datos recibidos.
Main pasa a mostrarProducto los valores consultados mediante getters, nunca
objetos Producto. Las constantes de opciones estan en GUI y SALIR vale 0.

## Comprobaciones

1. Introducir 200 y comprar Agua: saldo 100, recaudacion 100 y 2 unidades.
2. Intentar comprar Zumo con ese saldo: ningun dato cambia.
3. Intentar comprar Barrita agotada: ningun dato cambia.
4. Reponer 2 Barritas y comprar una: saldo 20, recaudacion 180, queda 1 Barrita.
5. Devolver saldo: devuelve 20 y lo deja a cero. Otra devolucion devuelve cero.
6. Probar posiciones 0 y 4, importes 0 y negativos, y reposiciones no positivas.
7. Comprobar que las referencias originales muestran los cambios de existencias.

El enunciado completo esta en:
https://jsotera.github.io/moodle/prom/ut03-ejercicios.html
