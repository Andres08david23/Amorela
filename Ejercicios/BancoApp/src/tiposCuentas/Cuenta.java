package tiposCuentas;

public class Cuenta extends Cliente {

    // En el orden del enunciado
    private long numeroCuenta;
    private String fechaApertura;
    private int tipoCuenta;  // 1:AhorroDiario, 2:CuentaJoven, 3:Tradicional
    private double saldo;

    public Cuenta(long documentoIdentidad, String nombre, String correoElectronico,
                  int numeroCelular, String direccion,
                  long numeroCuenta, String fechaApertura,
                  int tipoCuenta, double saldo) {

        super(documentoIdentidad, nombre, correoElectronico, numeroCelular, direccion);
        this.numeroCuenta = numeroCuenta;
        this.fechaApertura = fechaApertura;
        this.tipoCuenta = tipoCuenta;
        this.saldo = saldo;
    }

    public long getNumeroCuenta() {
        return numeroCuenta;
    }

    public String getFechaApertura() {
        return fechaApertura;
    }

    public int getTipoCuenta() {
        return tipoCuenta;
    }

    public double getSaldo() {
        return saldo;
    }

    public void setSaldo(double saldo) {
        this.saldo = saldo;
    }

    // ---- Polimorfismo: este método se sobreescribirá en CuentaCorriente ----
    public double calcular_interes() {
        double interes = 0;

        switch (tipoCuenta) {
            case 1: // Ahorro Diario 1.5%
                interes = saldo * 0.015;
                break;
            case 2: // Cuenta Joven 1.7%
                interes = saldo * 0.017;
                break;
            case 3: // Tradicional 1.6%
                interes = saldo * 0.016;
                break;
            default:
                System.out.println("Tipo de cuenta de ahorro inválido.");
        }

        return interes;
    }
}
