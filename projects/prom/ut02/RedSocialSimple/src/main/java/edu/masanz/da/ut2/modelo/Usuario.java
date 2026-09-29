package edu.masanz.da.ut2.modelo;

public class Usuario {
    private String nick;
    private String muro;
    private Usuario sigoA1;
    private Usuario sigoA2;
    private Usuario sigoA3;

    /**
     * Crea un usuario sin datos iniciales.
     */
    public Usuario() {
        this.nick = "";
        this.muro = "";
    }

    /**
     * Crea un usuario con nick y un muro vacio.
     *
     * @param nick nick publico del usuario
     */
    public Usuario(String nick) {
        this.nick = nick;
        this.muro = "";
    }

    /**
     * Crea un usuario con nick y contenido inicial en el muro.
     *
     * @param nick nick publico del usuario
     * @param muro contenido inicial del muro
     */
    public Usuario(String nick, String muro) {
        this.nick = nick;
        this.muro = muro;
    }

    /**
     * Devuelve una descripcion breve del usuario.
     *
     * @return texto con el nick del usuario
     */
    @Override
    public String toString() {
        return "Usuario{nick='" + nick + "'}";
    }

    /**
     * Devuelve el nick del usuario.
     *
     * @return nick del usuario
     */
    public String getNick() {
        return nick;
    }

    /**
     * Modifica el nick del usuario.
     *
     * @param nick nuevo nick del usuario
     */
    public void setNick(String nick) {
        this.nick = nick;
    }

    /**
     * Devuelve el contenido del muro del usuario.
     *
     * @return contenido del muro
     */
    public String getMuro() {
        return muro;
    }

    /**
     * Modifica el contenido completo del muro.
     *
     * @param muro nuevo contenido del muro
     */
    public void setMuro(String muro) {
        this.muro = muro;
    }

    /**
     * Devuelve el primer usuario seguido.
     *
     * @return primer usuario seguido o null si no existe
     */
    Usuario getSigoA1() {
        return sigoA1;
    }

    /**
     * Asigna el primer usuario seguido.
     *
     * @param sigoA1 usuario que se guardara en la primera posicion
     */
    void setSigoA1(Usuario sigoA1) {
        this.sigoA1 = sigoA1;
    }

    /**
     * Devuelve el segundo usuario seguido.
     *
     * @return segundo usuario seguido o null si no existe
     */
    Usuario getSigoA2() {
        return sigoA2;
    }

    /**
     * Asigna el segundo usuario seguido.
     *
     * @param sigoA2 usuario que se guardara en la segunda posicion
     */
    void setSigoA2(Usuario sigoA2) {
        this.sigoA2 = sigoA2;
    }

    /**
     * Devuelve el tercer usuario seguido.
     *
     * @return tercer usuario seguido o null si no existe
     */
    Usuario getSigoA3() {
        return sigoA3;
    }

    /**
     * Asigna el tercer usuario seguido.
     *
     * @param sigoA3 usuario que se guardara en la tercera posicion
     */
    void setSigoA3(Usuario sigoA3) {
        this.sigoA3 = sigoA3;
    }
}
