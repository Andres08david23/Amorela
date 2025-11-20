/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package tiposCuentas;

/**
 *
 * @author USUARIO
 */
// Clase CuentaCorriente que hereda Cliente
class CuentaCorriente extends Cliente {
    private long numeroCuenta;
    private String fechaApertura;
    private double saldo;
    private double porcentajeInteres;
    private double valorSobregiro;

    //su constructor
    public CuentaCorriente(long documentoIdentidad, String nombre, String correoElectronico, int numeroCelular, String direccion,
                           long numeroCuenta, String fechaApertura, double saldo, double porcentajeInteres, double valorSobregiro) {
        super(documentoIdentidad, nombre, correoElectronico, numeroCelular, direccion);
        this.numeroCuenta = numeroCuenta;
        this.fechaApertura = fechaApertura;
        this.saldo = saldo;
        this.porcentajeInteres = porcentajeInteres;
        this.valorSobregiro = valorSobregiro;
    }

    // Sobrescribir método para calcular interés
    public double calcularInteres() {
        return saldo * porcentajeInteres / 100;
    }

    // Método para mostrar información de la cuenta corriente
    public void mostrarInformacion() {
        System.out.println("Cliente: " + getNombre() + ", Documento: " + getDocumentoIdentidad());
        System.out.println("Cuenta Corriente: " + numeroCuenta + ", Fecha apertura: " + fechaApertura);
        System.out.println("Saldo: " + saldo + ", Sobregiro permitido: " + valorSobregiro);
        System.out.println("Interes mensual: " + calcularInteres());
        System.out.println("Saldo con interes: " + (saldo + calcularInteres()));
    }
}