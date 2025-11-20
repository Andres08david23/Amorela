
package ejercicio;

import java.util.Scanner;

public class Ejercicio {

    public static void main(String[] args) {

        Scanner sc = new Scanner(System.in);

        System.out.println("Ingrese documento del vendedor");
        String documento = sc.nextLine();

        System.out.println("Ingrese tipo de vendedor(1=Puerta a puerta,2=Telemercado)");
        int tipo = sc.nextInt();

        System.out.println("Ingrese el valor de las ventas vendidas");
        double ventas = sc.nextDouble();

        vendedor vendedor = new vendedor(documento, tipo, ventas);
        double comision = vendedor.calcularComision();

        System.out.println("\n--- Liquidacion de comision ---");
        System.out.println("Documento: " + vendedor.getDocumento());
        System.out.println("Tipo de vendedor: " + vendedor.getTipoVendedor());
        System.out.println("Valor de ventas:$ " + vendedor.getValorVenta());
        System.out.println("Comision a pagar:$ " + comision);

    }

}
