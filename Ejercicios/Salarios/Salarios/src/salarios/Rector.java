package salarios;

public class Rector extends Persona {

    private double salarioFijo = 2500000;

    public Rector(String nombre, String cedula, String fecha) {
        super(nombre, cedula, fecha);
    }

    @Override
    public void mostrarRol() {
        System.out.println(nombre + " es Rector.");
    }

    @Override
    public double calcularSalario() {
        return salarioFijo;
    }
}
