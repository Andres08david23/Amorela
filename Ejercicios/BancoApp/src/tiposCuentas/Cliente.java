package tiposCuentas;

public class Cliente {

    // En el orden que lo pide el enunciado
    private long documentoIdentidad;
    private String nombre;
    private String correoElectronico;
    private int numeroCelular;
    private String direccion;

    public Cliente(long documentoIdentidad, String nombre, String correoElectronico,
                   int numeroCelular, String direccion) {
        this.documentoIdentidad = documentoIdentidad;
        this.nombre = nombre;
        this.correoElectronico = correoElectronico;
        this.numeroCelular = numeroCelular;
        this.direccion = direccion;
    }

    public long getDocumentoIdentidad() {
        return documentoIdentidad;
    }

    public String getNombre() {
        return nombre;
    }

    public String getCorreoElectronico() {
        return correoElectronico;
    }

    public int getNumeroCelular() {
        return numeroCelular;
    }

    public String getDireccion() {
        return direccion;
    }
}
