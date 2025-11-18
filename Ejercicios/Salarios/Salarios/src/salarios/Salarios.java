package salarios;

import java.util.Scanner;

public class Salarios {

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);

        System.out.println("=== SISTEMA DE CALCULO DE SALARIOS ===");
        System.out.print("Ingrese el nombre: ");
        String nombre = sc.nextLine();

        System.out.print("Ingrese la cedula: ");
        String cedula = sc.nextLine();

        System.out.print("Ingrese la fecha de ingreso: ");
        String fecha = sc.nextLine();

        System.out.println("\nSeleccione el cargo del empleado:");
        System.out.println("1. Rector");
        System.out.println("2. Secretaria");
        System.out.println("3. Profesor");
        System.out.println("4. Coordinador");
        System.out.print("Opcion: ");
        int opcion = sc.nextInt();

        Persona empleado = null;

        switch (opcion) {
            case 1 -> empleado = new Rector(nombre, cedula, fecha);
            case 2 -> empleado = new Secretaria(nombre, cedula, fecha);
            case 3 -> empleado = new Profesor(nombre, cedula, fecha);
            case 4 -> empleado = new Coordinador(nombre, cedula, fecha);
            default -> {
                System.out.println("Opción no válida.");
                System.exit(0);
            }
        }

        System.out.println();
        empleado.mostrarRol();
        double salario = empleado.calcularSalario();
        System.out.println("El salario de " + empleado.nombre + " es: $" + salario);
    }
}
