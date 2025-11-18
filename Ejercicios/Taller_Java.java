/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Main.java to edit this template
 */
package taller_java;

import java.util.Scanner;

public class Taller_Java {


    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);

        System.out.print("Ingrese el numero de cuentas: ");
        int n = sc.nextInt();

        double totalIntereses = 0;
        double totalSaldos = 0;

        for (int i = 1; i <= n; i++) {
            System.out.println("\n--- Cuenta " + i + " ---");
            System.out.print("Numero de cuenta: ");
            long numeroCuenta = sc.nextLong();
            sc.nextLine(); // limpiar buffer

            System.out.print("Fecha de apertura (aaaa/mm/dd): ");
            String fecha = sc.nextLine();

            System.out.print("Tipo de cuenta (1=Ahorro Diario, 2=Cuenta Joven, 3=Tradicional): ");
            int tipo = sc.nextInt();

            System.out.print("Saldo actual: ");
            double saldo = sc.nextDouble();

            // Calcular interés según tipo
            double interesMensual = 0;
            switch (tipo) {
                case 1: interesMensual = 0.015; break;
                case 2: interesMensual = 0.017; break;
                case 3: interesMensual = 0.016; break;
                default:
                    System.out.println("Tipo invalido, se asigna interes 0%");
                    interesMensual = 0;
            }

            double valorInteres = saldo * interesMensual;
            double saldoNuevo = saldo + valorInteres;

            totalIntereses += valorInteres;
            totalSaldos += saldoNuevo;

            System.out.println("Cuenta: " + numeroCuenta);
            System.out.println("Fecha: " + fecha);
            System.out.println("Interes mensual: " + (interesMensual * 100) + "%");
            System.out.println("Valor del interes: $" + valorInteres);
            System.out.println("Saldo nuevo: $" + saldoNuevo);
        }

        System.out.println("\n=== RESULTADOS TOTALES ===");
        System.out.println("Total intereses: $" + totalIntereses);
        System.out.println("Total saldos nuevos: $" + totalSaldos);
    }
}
    

