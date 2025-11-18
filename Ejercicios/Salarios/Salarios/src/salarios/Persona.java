package salarios;

public abstract class Persona {

    protected String nombre;
    protected String cedula;
    protected String fecha;

    public Persona(String nombre, String cedula, String fecha) {
        this.nombre = nombre;
        this.cedula = cedula;
        this.fecha = fecha;
    }

    public abstract void mostrarRol();
    public abstract double calcularSalario();
}
