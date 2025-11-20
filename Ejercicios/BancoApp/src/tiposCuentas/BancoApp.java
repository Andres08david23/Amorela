package tiposCuentas;

import java.util.Scanner;

public class BancoApp {

    public static void main(String[] args) {

        Scanner sc = new Scanner(System.in);

        System.out.print("Ingrese la cantidad de productos (cuentas) a registrar: ");
        int n = sc.nextInt();

        // Array polimórfico: guarda tanto Cuenta como CuentaCorriente
        Cuenta[] productos = new Cuenta[n];

        double totalIntereses = 0;
        double totalSaldos = 0;

        for (int i = 0; i < n; i++) {
            System.out.println("\n=== Registro producto " + (i + 1) + " ===");
            System.out.print("Tipo de producto (1: Cuenta de Ahorro, 2: Cuenta Corriente): ");
            int tipoProducto = sc.nextInt();

            System.out.println("---- Datos del cliente ----");
            System.out.print("Documento de identidad: ");
            long doc = sc.nextLong();
            sc.nextLine(); // limpiar buffer

            System.out.print("Nombre: ");
            String nombre = sc.nextLine();

            System.out.print("Correo electrónico: ");
            String correo = sc.nextLine();

            System.out.print("Número de celular: ");
            int celular = sc.nextInt();
            sc.nextLine();

            System.out.print("Dirección: ");
            String direccion = sc.nextLine();

            System.out.println("---- Datos de la cuenta ----");
            System.out.print("Número de cuenta: ");
            long numeroCuenta = sc.nextLong();
            sc.nextLine();

            System.out.print("Fecha de apertura (aaaa/mm/dd): ");
            String fechaApertura = sc.nextLine();

            System.out.print("Saldo actual: ");
            double saldo = sc.nextDouble();

            if (tipoProducto == 1) {
                // CUENTA DE AHORRO (usa tipoCuenta de la tabla)
                System.out.print("Tipo de cuenta (1:AhorroDiario, 2:CuentaJoven, 3:Tradicional): ");
                int tipoCuenta = sc.nextInt();

                productos[i] = new Cuenta(doc, nombre, correo, celular,
                        direccion, numeroCuenta, fechaApertura, tipoCuenta, saldo);

            } else if (tipoProducto == 2) {
                // CUENTA CORRIENTE
                System.out.print("Porcentaje de interés mensual (ejemplo 1.5 para 1.5%): ");
                double porcentajeInt = sc.nextDouble();

                System.out.print("Valor permitido de sobregiro: ");
                double sobregiro = sc.nextDouble();

                productos[i] = new CuentaCorriente(doc, nombre, correo, celular,
                        direccion, numeroCuenta, fechaApertura, saldo,
                        porcentajeInt, sobregiro);
            } else {
                System.out.println("Tipo de producto inválido, se creará una cuenta de ahorro básica.");
                productos[i] = new Cuenta(doc, nombre, correo, celular,
                        direccion, numeroCuenta, fechaApertura, 1, saldo);
            }
        }

        // ---- CÁLCULO E IMPRESIÓN USANDO POLIMORFISMO ----
        System.out.println("\n========= LIQUIDACIÓN DE INTERESES =========");

        for (Cuenta c : productos) {
            double interes = c.calcular_interes();  // POLIMÓRFICO
            double nuevoSaldo = c.getSaldo() + interes;

            totalIntereses += interes;
            totalSaldos += nuevoSaldo;

            System.out.println("\nCliente: " + c.getNombre());
            System.out.println("Documento: " + c.getDocumentoIdentidad());
            System.out.println("Número de cuenta: " + c.getNumeroCuenta());
            System.out.println("Interés mensual: " + interes);
            System.out.println("Saldo con interés: " + nuevoSaldo);
        }

        System.out.println("\n=========== TOTALES GENERALES ===========");
        System.out.println("Total intereses generados: " + totalIntereses);
        System.out.println("Total nuevos saldos: " + totalSaldos);
    }
}

