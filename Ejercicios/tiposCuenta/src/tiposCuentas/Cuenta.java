
package tiposCuentas;


class Cuenta extends Cliente { //
    protected long numeroCuenta;
    protected String fechaApertura; 
    protected double saldo;
    protected int tipoCuenta; // osea 1,2,3 para tipos diferentes

    // el constructor de la clase cuenta
    public Cuenta(long documentoIdentidad, String nombre, String correoElectronico, int numeroCelular, String direccion,
                  long numeroCuenta, String fechaApertura, double saldo, int tipoCuenta) {
        super(documentoIdentidad, nombre, correoElectronico, numeroCelular, direccion);
        this.numeroCuenta = numeroCuenta;
        this.fechaApertura = fechaApertura;
        this.saldo = saldo;
        this.tipoCuenta = tipoCuenta;
    }

    // este es el Método para calcular interés según tipo de cuenta
    public double calcularInteres() {
        double tasaInteres = 0;
        switch(tipoCuenta) {
            case 1: tasaInteres = 1.5; break; //break para que no siga evaluando
            case 2: tasaInteres = 1.7; break;
            case 3: tasaInteres = 1.6; break;
            default: tasaInteres = 0; break;
        }
        return saldo * tasaInteres / 100;
    }

    // Método para mostrar información de la cuenta la obtiene y la muestra 
    public void mostrarInformacion() {
        System.out.println("Cliente: " + getNombre() + ", Documento: " + getDocumentoIdentidad());
        System.out.println("Cuenta: " + numeroCuenta + ", Fecha apertura: " + fechaApertura);
        System.out.println("Saldo: " + saldo);
        System.out.println("Interes mensual: " + calcularInteres());
        System.out.println("Saldo con interes: " + (saldo + calcularInteres()));
    }
}
