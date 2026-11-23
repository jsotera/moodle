package edu.masanz.da.ut3.util;

/** Datos del juego y mapas almacenados como cadenas de 112 caracteres. */
public class Conf {
    public static final int FILAS = 8;
    public static final int COLUMNAS = 14;
    public static final int FILA_INICIAL = 1;
    public static final int COLUMNA_INICIAL = 1;
    public static final int VIDA_MAXIMA = 100;
    public static final int DANIO_TRAMPA = 20;
    public static final int CURACION_BOTIQUIN = 30;

    public static final String MURO = "#";
    public static final String BOTIQUIN = "+";
    public static final String TRAMPA = "T";
    public static final String SALIDA = "S";
    public static final String PERSONAJE = "P";
    public static final int NUMERO_MAPAS = 3;

    public static final String MAPA_1 =
            "##############"
          + "#   +        #"
          + "#  ##  ##    #"
          + "# T      +   #"
          + "#    ##      #"
          + "# +    T     #"
          + "#           S#"
          + "##############";

    public static final String MAPA_2 =
            "##############"
          + "#  +#    #   #"
          + "# T #        #"
          + "#   #  + #   #"
          + "#   T   T#   #"
          + "#   #    # T #"
          + "#   # +     S#"
          + "##############";

    public static final String MAPA_3 =
            "##############"
          + "#  T  T + T  #"
          + "############ #"
          + "# + T  T + T #"
          + "# ############"
          + "#  T  T      #"
          + "############S#"
          + "##############";
}
