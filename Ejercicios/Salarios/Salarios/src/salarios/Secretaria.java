package salarios;

public class Secretaria extends Persona {

    private double salarioFijo = 1200000;

    public Secretaria(String nombre, String cedula, String fecha) {
        super(nombre, cedula, fecha);
    }

    @Override
    public void mostrarRol() {
        System.out.println(nombre + " es Secretaria.");
    }

    @Override
    public double calcularSalario() {
        return salarioFijo;
    }
}
