package tiposCuentas;

import tiposcuentaestructurado.Cuenta;
import java.util.Scanner;

public class LiquidacionIntereses {

    public static void main(String[] args) {

        Scanner sc = new Scanner(System.in);

        System.out.print("Ingrese la cantidad de cuentas: ");
        int n = sc.nextInt();

        double totalIntereses = 0;
        double totalSaldos = 0;

        for (int i = 1; i <= n; i++) {

            System.out.println("---- Datos de la cuenta " + i + " ----");
            
            System.out.print("Número de cuenta: ");
            long numero = sc.nextLong();
            sc.nextLine(); // limpiar buffer

            System.out.print("Fecha apertura (aaaa/mm/dd): ");
            String fecha = sc.nextLine();

            System.out.print("Tipo de cuenta (1:AhorroDiario  2:CuentaJoven  3:Tradicional): ");
            int tipo = sc.nextInt();

            System.out.print("Saldo actual: ");
            double saldo = sc.nextDouble();

            // Crear objeto cuenta
            Cuenta c = new Cuenta(numero, fecha, tipo, saldo);

            // Calcular interés de esa cuenta
            double interes = c.calcular_interes();

            // Nuevo saldo
            double nuevoSaldo = saldo + interes;

            // Acumular totales
            totalIntereses += interes;
            totalSaldos += nuevoSaldo;

            // Salida requerida
            System.out.println("\n*** RESULTADOS DE LA CUENTA ***");
            System.out.println("Número de cuenta: " + c.getNumeroCuenta());
            System.out.println("Interés mensual: " + interes);
            System.out.println("Saldo con interés: " + nuevoSaldo);
            System.out.println("--------------------------------\n");
        }

        // Totales finales
        System.out.println("===== RESULTADOS FINALES =====");
        System.out.println("Total intereses generados: " + totalIntereses);
        System.out.println("Total nuevos saldos: " + totalSaldos);
    }
}

