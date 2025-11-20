package tiposCuentas;

public class CuentaCorriente extends Cuenta {

    // En el orden del enunciado para CUENTA CORRIENTE
    private double porcentajeInteres;    // ej: 1.2 (1.2%)
    private double valorSobregiroPermitido;

    public CuentaCorriente(long documentoIdentidad, String nombre, String correoElectronico,
                           int numeroCelular, String direccion,
                           long numeroCuenta, String fechaApertura,
                           double saldo,
                           double porcentajeInteres,
                           double valorSobregiroPermitido) {

        // Para cuenta corriente no usamos tipoCuenta de la tabla, por eso mando 0
        super(documentoIdentidad, nombre, correoElectronico, numeroCelular,
              direccion, numeroCuenta, fechaApertura, 0, saldo);

        this.porcentajeInteres = porcentajeInteres;
        this.valorSobregiroPermitido = valorSobregiroPermitido;
    }

    public double getPorcentajeInteres() {
        return porcentajeInteres;
    }

    public double getValorSobregiroPermitido() {
        return valorSobregiroPermitido;
    }

    // ---- Polimorfismo: mismo nombre que en Cuenta ----
    @Override
    public double calcular_interes() {
        // porcentajeInteres viene como porcentaje (ej 1.5 => 1.5%)
        return getSaldo() * (porcentajeInteres / 100.0);
    }
}
