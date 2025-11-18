package salarios;

public class Profesor extends Persona {

    private double valorHora = 15000;

    public Profesor(String nombre, String cedula, String fecha) {
        super(nombre, cedula, fecha);
    }

    @Override
    public void mostrarRol() {
        System.out.println(nombre + " es Profesor.");
    }

    @Override
    public double calcularSalario() {
        java.util.Scanner sc = new java.util.Scanner(System.in);
        System.out.print("Ingrese las horas trabajadas del profesor: ");
        int horas = sc.nextInt();
        return horas * valorHora;
    }
}
