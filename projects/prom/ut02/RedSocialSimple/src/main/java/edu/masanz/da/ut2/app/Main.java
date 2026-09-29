package edu.masanz.da.ut2.app;

import edu.masanz.da.ut2.modelo.RedSocial;
import edu.masanz.da.ut2.modelo.Usuario;

public class Main {
    public static void main(String[] args) {
        // TODO Crea una red social.
        RedSocial redSocial = new RedSocial("MiniSocial");

        // TODO Crea varios usuarios.
        Usuario usuario1 = new Usuario("ane");

        // TODO Publica mensajes en los muros de varios usuarios.

        // TODO Haz que algunos usuarios sigan a otros usuarios.

        // TODO Consulta los usuarios seguidos y los muros visibles.

        // TODO Prueba tambien los casos limite:
        //  - intentar seguir a mas de 3 usuarios
        //  - intentar seguirse a uno mismo
        //  - dejar de seguir a alguien
    }
}
