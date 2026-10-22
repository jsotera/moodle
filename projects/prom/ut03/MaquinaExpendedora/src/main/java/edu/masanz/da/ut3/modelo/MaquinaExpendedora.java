package edu.masanz.da.ut3.modelo;

/** Gestiona tres referencias a productos, el saldo y la recaudacion. */
public class MaquinaExpendedora {
    private Producto producto1;
    private Producto producto2;
    private Producto producto3;
    private int saldoCentimos;
    private int recaudacionCentimos;

    /**
     * Conserva las referencias recibidas y comienza con saldo y recaudacion cero.
     * @param producto1 producto de la posicion 1
     * @param producto2 producto de la posicion 2
     * @param producto3 producto de la posicion 3
     * @throws IllegalArgumentException si alguno es null o dos son la misma instancia
     */
    public MaquinaExpendedora(Producto producto1, Producto producto2, Producto producto3) {
        // TODO 21: Inicializa los tres productos y los importes respetando las reglas del constructor.
    }

    /** @return saldo disponible en centimos */
    public int getSaldoCentimos() {
        return saldoCentimos;
    }

    /** @return importe de las compras realizadas, en centimos */
    public int getRecaudacionCentimos() {
        return recaudacionCentimos;
    }

    /**
     * No crea copias ni modifica el producto.
     * @param numero posicion 1, 2 o 3
     * @return referencia del producto; null si la posicion no es valida
     */
    public Producto obtenerProducto(int numero) {
        // TODO 22: Devuelve el producto solicitado, o null si no existe.
        return null;
    }

    /**
     * Acepta cualquier cantidad positiva; no simula monedas fisicas.
     * @param cantidadCentimos dinero que se desea introducir
     * @return true si se anadio al saldo; false si no es positiva, sin cambios
     */
    public boolean introducirDinero(int cantidadCentimos) {
        // TODO 23: Acepta dinero de importe positivo y actualiza el saldo disponible.
        return false;
    }

    /**
     * Compra una unidad y descuenta su precio del saldo; lo suma a la recaudacion.
     * @param numero posicion 1, 2 o 3
     * @return true si hubo compra; false si la posicion es incorrecta, no hay
     * existencias o el saldo no alcanza. Un rechazo no modifica ningun dato.
     */
    public boolean comprar(int numero) {
        // TODO 24: Realiza la compra solicitada solo si se cumplen todos los requisitos, sin alterar datos si se rechaza.
        return false;
    }

    /**
     * Devuelve todo el saldo y lo deja a cero, sin alterar la recaudacion.
     * @return importe devuelto en centimos; cero si no habia saldo
     */
    public int devolverSaldo() {
        // TODO 25: Devuelve todo el saldo pendiente y deja el saldo a cero, sin modificar lo recaudado.
        return 0;
    }

    /**
     * Repone mediante el propio producto, sin modificar los importes.
     * @param numero posicion del producto
     * @param cantidad unidades a anadir
     * @return true si la posicion y cantidad son validas y se repuso; false sin cambios
     */
    public boolean reponerProducto(int numero, int cantidad) {
        // TODO 26: Reabastece el producto solicitado cuando los datos sean correctos, sin modificar los importes.
        return false;
    }

}
