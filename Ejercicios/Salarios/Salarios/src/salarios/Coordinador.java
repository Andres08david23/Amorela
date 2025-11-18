package salarios;

public class Coordinador extends Persona {

    private double valorHora = 18000;

    public Coordinador(String nombre, String cedula, String fecha) {
        super(nombre, cedula, fecha);
    }

    @Override
    public void mostrarRol() {
        System.out.println(nombre + " es Coordinador.");
    }

    @Override
    public double calcularSalario() {
        java.util.Scanner sc = new java.util.Scanner(System.in);
        System.out.print("Ingrese las horas trabajadas del coordinador: ");
        int horas = sc.nextInt();
        return horas * valorHora;
    }
}
