
package tiposCuentas;

import java.util.Scanner;

public class tiposCuentas{
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int nCuentas = 1;
        System.out.print("Ingresa la cantidad de cuentas totales: ");
        int total_cuentas = sc.nextInt();
        
        while(nCuentas <= total_cuentas){
        // Leer datos Cliente y Cuenta
            System.out.println("----Ingrese datos del cliente y cuenta de ahorro----");

            System.out.print("Documento de identidad: ");
            long doc = sc.nextLong();
            sc.nextLine();

            System.out.print("Nombre: ");
            String nombre = sc.nextLine();

            System.out.print("Correo electrónico: ");
            String correo = sc.nextLine();

            System.out.print("Número de celular: ");
            int celular = sc.nextInt();
            sc.nextLine();

            System.out.print("Dirección: ");
            String direccion = sc.nextLine();

            System.out.print("Número de cuenta: ");
            long cuentaNum = sc.nextLong();
            sc.nextLine();

            System.out.print("Fecha de apertura (aaaa/mm/dd): ");
            String fecha = sc.nextLine();

            System.out.print("Saldo: ");
            double saldo = sc.nextDouble();
            sc.nextLine();

            System.out.print("Tipo de cuenta (1 Ahorro Diario, 2 Cuenta Joven, 3 Tradicional): ");
            int tipo = sc.nextInt();

            Cuenta cuenta = new Cuenta(doc, nombre, correo, celular, direccion, cuentaNum, fecha, saldo, tipo);
            System.out.println("\nInformación cuenta de ahorro:");
            cuenta.mostrarInformacion();

            // Leer datos Cuenta Corriente
            System.out.println("\nIngrese datos de cuenta corriente:");

            System.out.print("Documento de identidad: ");
            long doc2 = sc.nextLong();
            sc.nextLine();

            System.out.print("Nombre: ");
            String nombre2 = sc.nextLine();

            System.out.print("Correo electrónico: ");
            String correo2 = sc.nextLine();

            System.out.print("Número de celular: ");
            int celular2 = sc.nextInt();
            sc.nextLine();

            System.out.print("Dirección: ");
            String direccion2 = sc.nextLine();

            System.out.print("Número de cuenta corriente: ");
            long cuentaNum2 = sc.nextLong();
            sc.nextLine();

            System.out.print("Fecha de apertura (aaaa/mm/dd): ");
            String fecha2 = sc.nextLine();

            System.out.print("Saldo: ");
            double saldo2 = sc.nextDouble();
            sc.nextLine();

            System.out.print("Porcentaje de interés mensual: ");
            double porcentajeInteres = sc.nextDouble();
            sc.nextLine();

            System.out.print("Valor permitido de sobregiro: ");
            double valorSobregiro = sc.nextDouble();
            sc.nextLine();

            CuentaCorriente cuentaCorriente = new CuentaCorriente(doc2, nombre2, correo2, celular2, direccion2,
                    cuentaNum2, fecha2, saldo2, porcentajeInteres, valorSobregiro);

            System.out.println("\nInformación cuenta corriente:");
            cuentaCorriente.mostrarInformacion();

            nCuentas++;
        }
    }
}
