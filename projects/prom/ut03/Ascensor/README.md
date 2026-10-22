# Ascensor

Base Maven del ejercicio 3.42 de PROM UT3. No incluye soluciones.
Abre `pom.xml` con IntelliJ, configura JDK 25 y ejecuta
`edu.masanz.da.ut3.app.Main` con el triangulo verde junto a `main`.
Selecciona tambien JDK 25 para el importador y el ejecutor Maven de IntelliJ.
El proyecto utiliza `maven.compiler.release=25`, sin caracteristicas preview.

## Trabajo pendiente

- `gui.GUI`: TODO 01.
- `modelo.Persona`: TODO 11.
- `modelo.Ascensor`: TODO 21-27.
- `app.Main`: TODO 31-36.

Los getters directos, el toString de Persona y el constructor directo de Ascensor
ya estan implementados.
Completa solo los TODOs respetando las firmas y sus contratos Javadoc.
Los valores 0, false y null de esos cuerpos son retornos provisionales.
Cada TODO del codigo coincide literalmente con un punto individual del enunciado;
las aclaraciones adicionales estan alli, sin pseudocodigo en el comentario.
La base compila y termina sin hacer nada hasta implementar los TODOs de main.
No crees mas clases ni metodos auxiliares; no uses arrays ni colecciones.
Para errores de construccion se solicita `IllegalArgumentException`, nunca
excepciones propias. Las operaciones ordinarias rechazadas devuelven false.

## Simulacion

Edificio con plantas 0-5, tres plazas y peso maximo de 200 kg, incluido el limite.
El ascensor empieza vacio en la planta 0. Incorpora Ana (60 kg, destino 2),
Luis (70 kg, destino 4) y Eva (50 kg, destino 5).

## Interfaz de consola

`edu.masanz.da.ut3.gui.GUI` proporciona metodos de impresion y contiene el
TODO 01, pedirOpcion. Todos sus metodos son estaticos: utiliza GUI.mostrarMenu()
y GUI.pedirOpcion(), sin crear instancias. El atributo scanner es estatico
y comparte la entrada de consola. Main consulta los objetos y decide que mensajes mostrar.
GUI solo recibe textos o numeros; no importa ni recibe Persona o Ascensor,
no recorre plazas ni comprueba pesos. No imprimas ni leas directamente en
Main o en el modelo.

```text
=== ASCENSOR ===
1. Iniciar simulacion
0. Salir
Elige una opcion: 1
Inicio del servicio.
Planta: 0
Personas: 3 | peso: 180/200 kg
Ana | 60 kg | destino: 2
Luis | 70 kg | destino: 4
Eva | 50 kg | destino: 5
```

Utiliza mostrarMenu e implementa pedirOpcion para aceptar solo 1 o 0 y volver a
solicitar la opcion si el texto o el valor no son validos. Si termina la entrada,
devuelve 0. GUI.INICIAR vale 1; GUI.SALIR vale 0.
Una opcion incorrecta usa mostrarOpcionIncorrecta. Cada inicio crea un servicio
nuevo con los datos iniciales y contadores a cero. El servicio es automatico:
no se solicitan opciones entre plantas. Tras finalizar vuelve al menu, donde 0
termina la aplicacion con mostrarDespedida.

mostrarMensaje(texto), mostrarPlanta(planta), mostrarPersona(nombre, pesoKg,
destino), mostrarAlguienEntra(nombre) y mostrarAlguienSale(nombre) estan dados.
Cada uno solo imprime sus datos. Main elige cuando se llama a cada metodo y
consulta los getters para obtener los valores que se muestran.
Los totales finales se imprimen mediante mostrarMensaje, sin un metodo complejo
que reciba el conjunto de contadores. Los textos de los ejemplos son orientativos.

## Reglas del servicio

1. Mientras haya personas, elige el destino mas cercano a la planta actual;
   si hay empate, elige el menor. Recalcula el destino despues de cada parada.
2. Mueve el ascensor una planta por llamada y muestra todos los pasos.
   El destino indica hacia donde avanzar, no la planta final de esa llamada:
   desde la planta 1, moverUnaPlantaHacia(5) lo deja en la 2. Para llegar a la 5
   se necesitan cuatro llamadas, que lo dejan en 2, 3, 4 y 5.
   Desde la planta 5, moverUnaPlantaHacia(1) lo deja en la 4.
3. Al llegar, recorre las plazas 1-3. Si alguien tiene ese destino, solicita su
   baja y muestra el resultado. No se compactan los huecos.
4. Tras cada baja correcta, realiza exactamente un sorteo: una probabilidad del
   30 % permite que aparezca otra persona. En los demas casos no aparece nadie.
5. Cada visitante tiene nombre correlativo, peso entero aleatorio de 40 a 120 kg
   y destino entre 0 y 5, ambos incluidos, distinto de la planta actual.
6. Intenta incorporarlo una sola vez mediante subirPersona. Si no cabe por peso
   o plazas, se marcha; no reintentes ni guardes una cola.
7. Esto tambien sucede tras bajar la ultima persona. Solo termina si, despues
   de todas las bajas y sus sorteos, el ascensor sigue vacio.

PROBABILIDAD_LLEGADA es un porcentaje entero en Main. Puedes cambiarlo entre
0 y 99; no uses 100, pues en esta simulacion cada baja quedaria reemplazada
por una llegada si todas fueran admitidas. Con 30 no hay un numero fijo de
viajes ni una cota determinista: la duracion depende del azar.
En una tirada entera de 0 a 99 deben existir exactamente tantos resultados
de llegada como indique el porcentaje. Prueba con 0 para una ejecucion finita
sin nuevas incorporaciones.

Muestra planta inicial y cada paso, direccion, ocupantes, peso, bajas, llegadas
y rechazos con su motivo. Al terminar, indica la planta final, viajes completados,
plantas recorridas y cantidades de bajas, nuevas altas aceptadas y rechazadas.
Un viaje es el desplazamiento a un destino elegido, no cada paso entre plantas.
Las tres altas iniciales no cuentan como nuevas altas aleatorias.

## Comprobaciones

- Sin llegadas (probabilidad 0): paradas 2, 4 y 5, 3 viajes, 5 plantas recorridas,
  3 bajas, ninguna alta aleatoria y ascensor vacio en la planta 5.
- Peso total 200: admite. Peso 201 o mas: rechaza sin modificar plazas.
- La misma referencia no entra dos veces. Null y destino igual al origen no entran.
- Una baja deja su plaza a null y no mueve otras referencias.
- Una persona que no ha llegado a su destino no puede bajar.
- Con destinos equidistantes, el siguiente es el de menor numero de planta.
- Una baja genera un unico sorteo, incluso cuando deja el ascensor temporalmente vacio.
- Mover un ascensor vacio, fuera de limites o hacia su planta actual devuelve false.

El enunciado completo esta en:
https://jsotera.github.io/moodle/prom/ut03-ejercicios.html
