package edu.masanz.da.ut2.modelo;

public class RedSocial {
    private String nombre;

    /**
     * Crea una red social sin nombre.
     */
    public RedSocial() {
        this.nombre = "";
    }

    /**
     * Crea una red social con nombre.
     *
     * @param nombre nombre de la red social
     */
    public RedSocial(String nombre) {
        this.nombre = nombre;
    }

    /**
     * Devuelve una descripcion breve de la red social.
     *
     * @return texto con el nombre de la red social
     */
    @Override
    public String toString() {
        return "RedSocial{nombre='" + nombre + "'}";
    }

    /**
     * Devuelve el nombre de la red social.
     *
     * @return nombre de la red social
     */
    public String getNombre() {
        return nombre;
    }

    /**
     * Modifica el nombre de la red social.
     *
     * @param nombre nuevo nombre de la red social
     */
    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    /**
     * Publica un mensaje nuevo en el muro del usuario indicado.
     *
     * @param usuario usuario que utiliza la red social
     * @param mensaje mensaje que se aniadira al muro
     */
    public void publicar(Usuario usuario, String mensaje) {
        String nuevaPublicacion = usuario.getNick() + ": " + mensaje;

        if (usuario.getMuro().isEmpty()) {
            usuario.setMuro(nuevaPublicacion);
        } else {
            usuario.setMuro(usuario.getMuro() + System.lineSeparator() + nuevaPublicacion);
        }
    }

    /**
     * Hace que un usuario siga a otro usuario si tiene hueco disponible.
     *
     * @param usuario usuario que utiliza la red social
     * @param usuarioASeguir usuario al que se quiere seguir
     * @return true si se ha podido seguir al usuario, false en caso contrario
     */
    public boolean seguir(Usuario usuario, Usuario usuarioASeguir) {
        if (usuario == usuarioASeguir) {
            System.out.println(usuario.getNick() + " no puede seguirse a si mismo.");
            return false;
        }

        if (yaSigueA(usuario, usuarioASeguir)) {
            System.out.println(usuario.getNick() + " ya sigue a " + usuarioASeguir.getNick() + ".");
            return false;
        }

        if (usuario.getSigoA1() == null) {
            usuario.setSigoA1(usuarioASeguir);
            return true;
        } else if (usuario.getSigoA2() == null) {
            usuario.setSigoA2(usuarioASeguir);
            return true;
        } else if (usuario.getSigoA3() == null) {
            usuario.setSigoA3(usuarioASeguir);
            return true;
        }

        System.out.println(usuario.getNick() + " no puede seguir a mas usuarios.");
        return false;
    }

    /**
     * Hace que un usuario deje de seguir a otro.
     *
     * @param usuario usuario que utiliza la red social
     * @param usuarioADejarDeSeguir usuario al que se quiere dejar de seguir
     * @return true si se ha eliminado la relacion, false si no existia
     */
    public boolean dejarDeSeguir(Usuario usuario, Usuario usuarioADejarDeSeguir) {
        if (usuario.getSigoA1() == usuarioADejarDeSeguir) {
            usuario.setSigoA1(null);
            return true;
        } else if (usuario.getSigoA2() == usuarioADejarDeSeguir) {
            usuario.setSigoA2(null);
            return true;
        } else if (usuario.getSigoA3() == usuarioADejarDeSeguir) {
            usuario.setSigoA3(null);
            return true;
        }

        System.out.println(usuario.getNick() + " no sigue a " + usuarioADejarDeSeguir.getNick() + ".");
        return false;
    }

    /**
     * Consulta el muro propio del usuario indicado.
     *
     * @param usuario usuario que utiliza la red social
     * @return muro propio del usuario
     */
    public String consultarMuroPropio(Usuario usuario) {
        return "Muro de " + usuario.getNick() + System.lineSeparator()
                + obtenerMuroSeguro(usuario);
    }

    /**
     * Consulta los muros de los usuarios a los que sigue el usuario indicado.
     *
     * @param usuario usuario que utiliza la red social
     * @return texto con los muros de hasta tres usuarios seguidos
     */
    public String consultarMuroSeguidos(Usuario usuario) {
        String resultado = "Muro de usuarios seguidos por " + usuario.getNick() + System.lineSeparator();

        resultado = resultado + obtenerBloqueMuro(usuario.getSigoA1());
        resultado = resultado + obtenerBloqueMuro(usuario.getSigoA2());
        resultado = resultado + obtenerBloqueMuro(usuario.getSigoA3());

        if (usuario.getSigoA1() == null && usuario.getSigoA2() == null && usuario.getSigoA3() == null) {
            resultado = resultado + "Todavia no sigue a ningun usuario." + System.lineSeparator();
        }

        return resultado;
    }

    /**
     * Muestra a que usuarios sigue el usuario indicado.
     *
     * @param usuario usuario que utiliza la red social
     * @return texto con los usuarios seguidos
     */
    public String consultarSeguidos(Usuario usuario) {
        String resultado = usuario.getNick() + " sigue a:" + System.lineSeparator();

        resultado = resultado + obtenerLineaSeguido(usuario.getSigoA1());
        resultado = resultado + obtenerLineaSeguido(usuario.getSigoA2());
        resultado = resultado + obtenerLineaSeguido(usuario.getSigoA3());

        if (usuario.getSigoA1() == null && usuario.getSigoA2() == null && usuario.getSigoA3() == null) {
            resultado = resultado + "- Nadie" + System.lineSeparator();
        }

        return resultado;
    }

    /**
     * Comprueba si un usuario ya sigue a otro usuario.
     *
     * @param usuario usuario que utiliza la red social
     * @param posibleSeguido usuario que se quiere comprobar
     * @return true si ya lo sigue, false en caso contrario
     */
    private boolean yaSigueA(Usuario usuario, Usuario posibleSeguido) {
        return usuario.getSigoA1() == posibleSeguido
                || usuario.getSigoA2() == posibleSeguido
                || usuario.getSigoA3() == posibleSeguido;
    }

    /**
     * Obtiene una linea de texto para un usuario seguido.
     *
     * @param usuario usuario seguido
     * @return linea de texto con el usuario seguido
     */
    private String obtenerLineaSeguido(Usuario usuario) {
        if (usuario == null) {
            return "";
        }

        return "- " + usuario.getNick() + System.lineSeparator();
    }

    /**
     * Obtiene un bloque de texto con el muro de un usuario.
     *
     * @param usuario usuario del que se quiere consultar el muro
     * @return bloque de texto con el muro del usuario
     */
    private String obtenerBloqueMuro(Usuario usuario) {
        if (usuario == null) {
            return "";
        }

        return "--- " + usuario.getNick() + " ---" + System.lineSeparator()
                + obtenerMuroSeguro(usuario) + System.lineSeparator();
    }

    /**
     * Devuelve el muro de un usuario o un mensaje si esta vacio.
     *
     * @param usuario usuario del que se quiere consultar el muro
     * @return contenido del muro o mensaje informativo
     */
    private String obtenerMuroSeguro(Usuario usuario) {
        if (usuario.getMuro().isEmpty()) {
            return "Este muro esta vacio." + System.lineSeparator();
        }

        return usuario.getMuro() + System.lineSeparator();
    }
}
